import {
  availabilities,
  bookings,
  bookingSelectSchema,
  categories,
  services,
  slots,
  user,
} from "@/db/schema";
import { AvailabilityWithSlots } from "@/features/provider/types";
import { db } from "@/index";
import { inngest } from "@/inngest/client";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, lt, or } from "drizzle-orm";
import z from "zod";

export const userRouter = createTRPCRouter({
  getServices: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(50).default(5),
      })
    )
    .query(async ({ input }) => {
      const { cursor, limit } = input;

      const data = await db
        .select({
          id: services.id,
          title: services.title,
          description: services.description,
          provider: user.name,
          price: services.price,
          duration: services.duration,
          category: categories.name,
          updatedAt: services.updatedAt,
        })
        .from(services)
        .leftJoin(categories, eq(categories.id, services.categoryId))
        .leftJoin(user, eq(services.userId, user.id))
        .where(
          cursor
            ? or(
                lt(services.updatedAt, cursor.updatedAt),
                and(
                  eq(services.updatedAt, cursor.updatedAt),
                  lt(services.id, cursor.id)
                )
              )
            : undefined
        )
        .orderBy(desc(services.updatedAt), desc(services.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItem = items[items.length - 1];
      const nextCursor = hasMore
        ? { id: lastItem.id, updatedAt: lastItem.updatedAt }
        : null;

      return {
        items,
        nextCursor,
      };
    }),
  getServiceById: protectedProcedure
    .input(
      z.object({
        serviceId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { serviceId } = input;
      try {
        const [service] = await db
          .select({
            id: services.id,
            userId: services.userId,
            title: services.title,
            duration: services.duration,
            provider: user.name,
            price: services.price,
            description: services.description,
            category: categories.name,
          })
          .from(services)
          .leftJoin(user, eq(user.id, services.userId))
          .leftJoin(categories, eq(services.categoryId, categories.id))
          .where(eq(services.id, serviceId));

        if (!service) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Service not found",
          });
        }

        // Fetch availabilities and slots for the provider
        const rows = await db
          .select({
            availabilityId: availabilities.id,
            slotId: slots.id,
            time: slots.startTime,
            booked: slots.booked,
            day: availabilities.dayOfWeek,
            isAvailable: availabilities.isAvailable,
          })
          .from(availabilities)
          .leftJoin(slots, eq(slots.availabilityId, availabilities.id))
          .where(
            and(
              eq(availabilities.userId, service.userId),
              eq(availabilities.isAvailable, true)
            )
          );

        // Group slots by availability
        const grouped: Record<string, AvailabilityWithSlots> = {};

        rows.forEach((row) => {
          const availabilityId = row.availabilityId.toString();

          if (!grouped[availabilityId]) {
            grouped[availabilityId] = {
              availabilityId,
              day: row.day,
              isAvailable: row.isAvailable,
              slots: [],
            };
          }

          if (row.slotId && row.time) {
            grouped[availabilityId].slots.push({
              slotId: row.slotId.toString(),
              time: row.time,
            });
          }
        });

        return {
          availabilities: Object.values(grouped),
          service,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not fetch availabilities and slots",
        });
      }
    }),
  bookService: protectedProcedure
    .input(
      z.object({
        serviceId: z.string(),
        slotId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { serviceId, slotId } = input;
      const userId = ctx.userId;

      try {
        const [service] = await db
          .select({
            providerId: services.userId,
            providerName: user.name,
            serviceName: services.title,
            providerEmail: user.email,
          })
          .from(services)
          .leftJoin(user, eq(user.id, services.userId))
          .where(eq(services.id, serviceId));

        if (!service) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Service unavailable at the moment",
          });
        }

        const [booking] = await db
          .insert(bookings)
          .values({
            serviceId,
            userId,
            slotId,
          })
          .returning({ bookingId: bookings.id });

        await inngest.send({
          name: "user/notification",
          data: {
            providerId: service.providerId,
            bookingId: booking.bookingId,
            type: "request",
            userId: userId,
            providerName: service.providerName,
            providerEmail: service.providerEmail,
          },
        });

        return booking;
      } catch (error) {
        console.error("Failed to book service:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create booking",
        });
      }
    }),
  getMybookings: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    // Fetch bookings with service info
    const data = await db
      .select({
        bookingId: bookings.id,
        serviceId: bookings.serviceId,
        serviceName: services.title,
        slotTime: slots.startTime,
        price: services.price,
        status: bookings.status,
        createdAt: bookings.createdAt,
      })
      .from(bookings)
      .leftJoin(services, eq(services.id, bookings.serviceId))
      .leftJoin(slots, eq(slots.id, bookings.slotId))
      .where(
        and(
          eq(bookings.userId, userId),
          eq(bookings.isDeleted, false),
          // or(eq(bookings.status, "pending"), eq(bookings.status, "confirmed"))
        )
      )
      .orderBy(desc(bookings.createdAt));

    return data;
  }),

  cancelBooking: protectedProcedure
    .input(
      z.object({
        bookingId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { bookingId } = input;
      const userId = ctx.userId;

      try {
        const [existingBooking] = await db
          .select()
          .from(bookings)
          .where(and(eq(bookings.id, bookingId), eq(bookings.userId, userId)));

        if (!existingBooking) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message:
              "Booking not found or you do not have permission to cancel it.",
          });
        }

        await db
          .update(bookings)
          .set({ status: "cancelled", isDeleted: true })
          .where(and(eq(bookings.id, bookingId), eq(bookings.userId, userId)));

        return { success: true, message: "Booking has been cancelled." };
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not cancel booking.",
        });
      }
    }),
});
