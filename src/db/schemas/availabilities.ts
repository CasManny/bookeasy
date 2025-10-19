import { relations } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id } from "../schema-helpers";
import { slots } from "./slots";
import { user } from "./user";

export const dayOfWeek = pgEnum("day_of_week", ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun'])
export const availabilities = pgTable('availabilities', {
    id,
    userId: text("user_id").notNull().references(() => user.id, {onDelete: 'cascade'}),
    dayOfWeek: dayOfWeek("day_of_week").notNull(),
    isAvailable: boolean('is_available').default(true).notNull(),
    createdAt,
    
})

export const availabilitiesRelations = relations(availabilities, ({one, many}) => ({
    user: one(user, {
        fields: [availabilities.userId],
        references: [user.id]
    }),
    slots: many(slots)
}))

