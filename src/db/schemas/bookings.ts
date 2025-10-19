import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { slots } from "./slots";
import { createdAt, id } from "../schema-helpers";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { services } from "./services";
import { notifications } from "./notifications";
import { createSelectSchema } from "drizzle-zod";

export const bookingStatus = pgEnum("status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const bookings = pgTable("bookings", {
  id,
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  fullName: text("full_name"),
  bookingDate: timestamp("booking_date"),
  isDeleted: boolean("is_deleted").notNull().default(false),
  email: text("email"),
  slotId: uuid("slot_id")
    .references(() => slots.id, { onDelete: "set null" })
    .notNull(),
  status: bookingStatus("status").default("pending"),
  createdAt,
});

export const bookingSelectSchema = createSelectSchema(bookings);

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  user: one(user, {
    fields: [bookings.userId],
    references: [user.id],
  }),

  service: one(services, {
    fields: [bookings.serviceId],
    references: [services.id],
  }),
  slot: one(slots, {
    fields: [bookings.slotId],
    references: [slots.id],
  }),
  notifications: many(notifications),
}));
