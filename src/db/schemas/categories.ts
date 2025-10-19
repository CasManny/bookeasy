import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id } from "../schema-helpers";
import { services } from "./services";
import { user } from "./user";

export const categories = pgTable("categories", {
    id,
    name: text("name").notNull().unique(),
    createdAt,
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade"})
})

export const categoriesRelations = relations(categories, ({one, many}) => ({
    services: many(services),
    user: one(user, {
        fields: [categories.userId],
        references: [user.id]
    })
}))