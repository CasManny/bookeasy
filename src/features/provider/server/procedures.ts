/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  availabilities,
  bookings,
  bookingSelectSchema,
  categories,
  createServiceSchema,
  services,
  slots,
  updateServiceSchema,
  user,
} from "@/db/schema";
import { db } from "@/index";
import { createTRPCRouter, providerProcedure } from "@/trpc/init";
import { APIError } from "better-auth/api";
import { and, count, desc, eq, lt, or } from "drizzle-orm";

import { inngest } from "@/inngest/client";
import { ErrorCode } from "@/lib/auth";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { AvailabilityWithSlots } from "../types";

const bookingStatusSchema = bookingSelectSchema.shape.status;

export const providerRouter = createTRPCRouter({
  getStats: providerProcedure.query(async ({ ctx }) => {
    const providerId = ctx.providerId;

    const [data] = await db
      .select({
        totalServices: count(services.id).as("total_services"),
        bookingsCount: count(bookings.id).as("bookings_count"),
      })
      .from(services)
      .leftJoin(
        bookings,
        and(
          eq(bookings.serviceId, services.id),
          eq(bookings.status, "confirmed")
        )
      )
      .where(eq(services.userId, providerId));

    return data;
  }),

  getRecentBookings: providerProcedure.query(async ({ ctx }) => {
    const providerId = ctx.providerId;
    const data = await db
      .select({
        title: services.title,
        bookingId: bookings.id,
        time: slots.startTime,
        date: bookings.createdAt,
        price: services.price,
      })
      .from(bookings)
      .leftJoin(services, eq(bookings.serviceId, services.id))
      .leftJoin(slots, eq(bookings.slotId, slots.id))
      .where(
        and(eq(services.userId, providerId), eq(bookings.status, "confirmed"))
      )
      .orderBy(desc(bookings.createdAt))
      .limit(3);
    return data;
  }),

  getTopServices: providerProcedure.query(async ({ ctx }) => {
    const providerId = ctx.providerId;
    const data = await db
      .select({
        id: services.id,
        name: services.title,
        bookingsCount: count(bookings.id).as("bookingsCount"),
        price: services.price,
        duration: services.duration,
      })
      .from(bookings)
      .innerJoin(
        services,
        and(
          eq(bookings.serviceId, services.id),
          eq(services.userId, providerId)
        )
      )
      .where(eq(bookings.status, "confirmed"))
      .groupBy(services.id, services.title, services.price, services.duration)
      .orderBy(desc(count(bookings.id)))
      .limit(3);

    return data;
  }),

  createCategory: providerProcedure
    .input(
      z.object({
        name: z.string().min(3, "name must be at least 3 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const providerId = ctx.providerId;

      try {
        await db.insert(categories).values({
          name,
          userId: providerId,
        });

        return {
          success: true,
          message: "Category created successfully!",
        };
      } catch (error: any) {
        if (error instanceof APIError) {
          const errCode = error?.body
            ? (error.body.code as ErrorCode)
            : "UNKNOWN";

          console.log(errCode);
          switch (errCode) {
            case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
              throw new TRPCError({
                code: "BAD_REQUEST",
                message: "An account with this email already exists.",
              });
          }
        }
        if (error?.cause?.code === "23505") {
          console.log(error?.code);
          throw new TRPCError({
            code: "CONFLICT",
            message: `Category "${name}" already exists.`,
          });
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        });
      }
    }),

  getAllCategories: providerProcedure.query(async ({ ctx }) => {
    const providerId = ctx.providerId;
    const data = await db
      .select({
        value: categories.id,
        label: categories.name,
      })
      .from(categories)
      .where(eq(categories.userId, providerId));

    return data;
  }),

  createService: providerProcedure
    .input(createServiceSchema)
    .mutation(async ({ ctx, input }) => {
      const providerId = ctx.providerId;
      const { categoryId, description, duration, price, title } = input;

      await db.insert(services).values({
        title,
        price,
        duration,
        categoryId,
        userId: providerId,
        description,
      });

      return { success: true, message: "Service created successfully" };
    }),

  getAllServices: providerProcedure
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
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const providerId = ctx.providerId;

      const data = await db
        .select({
          id: services.id,
          title: services.title,
          description: services.description,
          price: services.price,
          duration: services.duration,
          category: {
            value: categories.id,
            label: categories.name,
          },
          updatedAt: services.updatedAt,
        })
        .from(services)
        .where(
          and(
            eq(services.userId, providerId),
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
        )
        .leftJoin(categories, eq(categories.id, services.categoryId))
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

  deleteService: providerProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const providerId = ctx.providerId;
      const deleted = await db
        .delete(services)
        .where(and(eq(services.userId, providerId), eq(services.id, input.id)))
        .returning({ id: services.id });

      if (deleted.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Service not found or not authorized to delete.",
        });
      }

      return { success: true, message: "Service deleted" };
    }),

  editService: providerProcedure
    .input(updateServiceSchema)
    .mutation(async ({ ctx, input }) => {
      const providerId = ctx.providerId;

      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Service ID is required to update a service.",
        });
      }

      const updated = await db
        .update(services)
        .set({
          title: input.title,
          description: input.description,
          duration: input.duration,
          categoryId: input.categoryId,
          price: input.price,
        })
        .where(and(eq(services.userId, providerId), eq(services.id, input.id)))
        .returning();

      if (updated.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Service not found or not authorized to update.",
        });
      }

      return { success: true, message: "Service updated" };
    }),
  getAvailabilities: providerProcedure.query(async ({ ctx }) => {
    const providerId = ctx.providerId;

    const data = await db
      .select({
        day: availabilities.dayOfWeek,
        isAvailable: availabilities.isAvailable,
      })
      .from(availabilities)
      .where(eq(availabilities.userId, providerId));

    return data;
  }),

  updateAvailability: providerProcedure
    .input(
      z.array(
        z.object({
          day: z.enum(["mon", "tue", "wed", "thurs", "fri", "sat", "sun"]),
          isAvailable: z.boolean(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const providerId = ctx.providerId;

      try {
        await db.transaction(async (tx) => {
          for (const { day, isAvailable } of input) {
            await tx
              .update(availabilities)
              .set({ isAvailable })
              .where(
                and(
                  eq(availabilities.userId, providerId),
                  eq(availabilities.dayOfWeek, day)
                )
              );
          }
        });

        return { success: true, message: "Updated successfully" };
      } catch (error) {
        console.error("Failed to update availability:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update availability. Please try again.",
        });
      }
    }),
  getAvailabilitiesSlots: providerProcedure.query(async ({ ctx }) => {
    const providerId = ctx.providerId;

    try {
      const rows = await db
        .select({
          availabilityId: availabilities.id,
          slotId: slots.id,
          time: slots.startTime,
          day: availabilities.dayOfWeek,
          isAvailable: availabilities.isAvailable,
        })
        .from(availabilities)
        .leftJoin(slots, eq(slots.availabilityId, availabilities.id))
        .where(eq(availabilities.userId, providerId));

      // Group slots by availability
      const grouped = rows.reduce<Record<string, AvailabilityWithSlots>>(
        (availabilityMap, row) => {
          const availabilityId = row.availabilityId.toString();

          if (!availabilityMap[availabilityId]) {
            availabilityMap[availabilityId] = {
              availabilityId,
              day: row.day,
              isAvailable: row.isAvailable,
              slots: [],
            };
          }

          if (row.slotId && row.time) {
            availabilityMap[availabilityId].slots.push({
              slotId: row.slotId.toString(),
              time: row.time,
            });
          }

          return availabilityMap;
        },
        {}
      );

      return Object.values(grouped);
    } catch (error) {
      console.error("Failed to fetch availability slots:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Could not fetch availability slots",
      });
    }
  }),

  addSlot: providerProcedure
    .input(
      z.object({
        time: z.string().min(2, "Time must be provider"),
        availabilityId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const providerId = ctx.providerId;
      const { time, availabilityId } = input;

      try {
        const [availabilityExist] = await db
          .select({
            id: availabilities.id,
          })
          .from(availabilities)
          .where(
            and(
              eq(availabilities.id, availabilityId),
              eq(availabilities.userId, providerId)
            )
          );

        if (!availabilityExist) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "The selected Day record could not be found",
          });
        }

        await db.insert(slots).values({
          startTime: time,
          availabilityId: availabilityExist.id,
        });

        return {
          success: true,
          message: `Slot at ${time} has been successfully added to your availability.`,
        };
      } catch (error: any) {
        if (error?.cause?.code === "23505") {
          throw new TRPCError({
            code: "CONFLICT",
            message: `A slot for ${time} already exists for this Day.`,
          });
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while creating the slot.",
        });
      }
    }),
  deleteSlot: providerProcedure
    .input(
      z.object({
        slotId: z.string(),
        availabilityId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const providerId = ctx.providerId;
      const { availabilityId, slotId } = input;

      try {
        const [availabilityExist] = await db
          .select({ id: availabilities.id })
          .from(availabilities)
          .where(
            and(
              eq(availabilities.id, availabilityId),
              eq(availabilities.userId, providerId)
            )
          );

        if (!availabilityExist) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Failed to fetch Day data",
          });
        }

        await db
          .delete(slots)
          .where(
            and(
              eq(slots.availabilityId, availabilityExist.id),
              eq(slots.id, slotId)
            )
          );

        return { success: true, message: "Slot deleted Successfully" };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to Delete slot. Please try again.",
        });
      }
    }),

  getAllbookings: providerProcedure
    .input(
      z.object({
        status: bookingStatusSchema.nullish(),
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const providerId = ctx.providerId;
      const { status, page, pageSize } = input;

      const data = await db
        .select({
          id: bookings.id,
          status: bookings.status,
          createdAt: bookings.createdAt,
          serviceName: services.title,
          description: services.description,
          slotTime: slots.startTime,
        })
        .from(bookings)
        .innerJoin(services, eq(services.id, bookings.serviceId))
        .leftJoin(slots, eq(slots.id, bookings.slotId))
        .where(
          and(
            eq(services.userId, providerId),
            status ? eq(bookings.status, status) : undefined
          )
        )
        .orderBy(desc(bookings.createdAt), desc(bookings.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(bookings)
        .innerJoin(services, eq(services.id, bookings.serviceId))
        .where(eq(services.userId, providerId));

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
        currentPage: page,
      };
    }),
  getBookingById: providerProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const providerId = ctx.providerId;
      const { id } = input;

      try {
        const [booking] = await db
          .select({
            id: bookings.id,
            category: categories.name,
            status: bookings.status,
            price: services.price,
            duration: services.duration,
            bookedBy: user.name,
            createdAt: bookings.createdAt,
            slotTime: slots.startTime,
            serviceName: services.title,
            serviceDescription: services.description,
          })
          .from(bookings)
          .innerJoin(services, eq(services.id, bookings.serviceId))
          .leftJoin(categories, eq(services.categoryId, categories.id))
          .leftJoin(user, eq(bookings.userId, user.id))
          .leftJoin(slots, eq(slots.id, bookings.slotId))
          .where(and(eq(bookings.id, id), eq(services.userId, providerId)))
          .limit(1);

        // Handle not found case
        if (!booking) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Booking not found or does not belong to this provider.",
          });
        }

        return booking;
      } catch (error) {
        console.error("❌ Error fetching booking:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to fetch booking details. Please try again later.",
        });
      }
    }),

  acceptBooking: providerProcedure
    .input(
      z.object({
        bookingId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { bookingId } = input;
      const providerId = ctx.providerId;

      try {
        const [existingBooking] = await db
          .select({
            bookingId: bookings.id,
            serviceId: bookings.serviceId,
            status: bookings.status,
            userId: bookings.userId,
          })
          .from(bookings)
          .leftJoin(services, eq(services.id, bookings.serviceId))
          .where(
            and(eq(services.userId, providerId), eq(bookings.id, bookingId))
          );

        if (!existingBooking) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message:
              "Booking not found or you do not have permission to accept it.",
          });
        }

        // Only allow accepting pending bookings
        if (existingBooking.status === "confirmed") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Booking is already confirmed.",
          });
        }

        // Update booking status to confirmed
        await db
          .update(bookings)
          .set({ status: "confirmed" })
          .where(eq(bookings.id, bookingId));

        return { success: true, message: "Booking has been accepted." };
      } catch (error) {
        console.error("Failed to accept booking:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not accept booking.",
        });
      }
    }),
  cancelBooking: providerProcedure
    .input(
      z.object({
        reason: z.string(),
        bookingId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { bookingId, reason } = input;
      const providerId = ctx.providerId;

      const [booking] = await db
        .select({
          id: bookings.id,
          creatorId: services.userId,
          bookerId: bookings.userId,
        })
        .from(bookings)
        .leftJoin(services, eq(services.id, bookings.serviceId))
        .where(eq(bookings.id, bookingId));

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found or might have been deleted",
        });
      }

      // ✅ Check if provider owns this booking
      if (booking.creatorId !== providerId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to cancel this booking",
        });
      }

      await db
        .update(bookings)
        .set({ status: "cancelled" })
        .where(eq(bookings.id, bookingId));

      await inngest.send({
        name: "provider/notification",
        data: {
          recipientId: booking.bookerId,
          bookingId,
          type: "cancel",
          senderId: providerId,
          reason,
        },
      });

      return { message: "Booking cancelled successfully" };
    }),
});
