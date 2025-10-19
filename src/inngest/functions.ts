import { notifications } from "@/db/schema";
import { db } from "..";
import { inngest } from "./client";

export const sendUserBookingNotification = inngest.createFunction(
  { id: "user-send-notification" },
  { event: "user/notification" },
  async ({ event, step }) => {
    const { providerId, bookingId, type, userId } = event.data;
    await step.run("send-notification", async () => {
      await db.insert(notifications).values({
        recipientId: providerId,
        bookingId,
        type,
        senderId: userId,
      });
    });
  }
);

export const sendProviderBookingNotification = inngest.createFunction(
  { id: "provider-send-notification" },
  { event: "provider/notification" },
  async ({ event, step }) => {
    const { recipientId, bookingId, type, reason, senderId } = event.data;

    await step.run("send-notification", async () => {
      await db.insert(notifications).values({
        recipientId,
        bookingId,
        type,
        senderId,
        reason,
      });
    });
  }
);
