import { boolean, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { createdAt, id } from "../schema-helpers";
import { availabilities } from "./availabilities";
import { relations } from "drizzle-orm";

export const slots = pgTable("slots", {
    id,
    availabilityId: uuid("availability_id").notNull().references(() => availabilities.id, { onDelete: "cascade"}),
    startTime: text("start_time").notNull(),
    booked: boolean("booked").default(false),
    createdAt,
}, (t) => [unique("unique_slot_per_availability").on(t.availabilityId, t.startTime)])

export const slotsRelations = relations(slots, ({one}) => ({
    availability: one(availabilities, {
        fields: [slots.availabilityId],
        references: [availabilities.id]
    })
}))