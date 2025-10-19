import { boolean, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from "../schema-helpers";
import { user } from "./user";
import { bookings } from "./bookings";
import { relations } from "drizzle-orm";

export const notificationType = pgEnum("notification_type", [
  "request",
  "cancel",
  "accepted",
]);

export const notifications = pgTable("notifications", {
  id,
  recipientId: text("recipient_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  bookingId: uuid("booking_id").references(() => bookings.id, {
    onDelete: "cascade",
  }),
  type: notificationType("type").notNull(),
  reason: text("reason"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt,
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  recipient: one(user, {
    fields: [notifications.recipientId],
    references: [user.id],
  }),
  booking: one(bookings, {
    fields: [notifications.bookingId],
    references: [bookings.id],
  }),
  sender: one(user, {
    fields: [notifications.senderId],
    references: [user.id],
  }),
}));
