import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schema-helpers";
import { user } from "./user";
import { categories } from "./categories";
import { relations } from "drizzle-orm";
import { bookings } from "./bookings";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

export const services = pgTable("services", {
  id,
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "set null" }),
  price: integer("price").notNull(),
  createdAt,
  updatedAt,
});

export const createServiceSchema = createInsertSchema(services);
export const updateServiceSchema = createUpdateSchema(services);

export const servicesRelations = relations(services, ({ one, many }) => ({
  user: one(user, {
    fields: [services.userId],
    references: [user.id],
  }),
  category: one(categories, {
    fields: [services.categoryId],
    references: [categories.id],
  }),
  bookings: many(bookings),
}));
