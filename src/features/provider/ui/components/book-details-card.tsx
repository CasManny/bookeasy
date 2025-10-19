"use client";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfirm } from "@/hooks/use-confirm";
import { Calendar, Clock, DollarSign, Info, Tag, User } from "lucide-react";
import React from "react";
import { CancelBookingModal } from "./cancel-booking-modal";
import { BookingDetailsType } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  data: BookingDetailsType;
}

export const BookDetailsCard: React.FC<Props> = ({ data }) => {
  const {
    category,
    createdAt,
    duration,
    id,
    bookedBy,
    price,
    serviceDescription,
    serviceName,
    slotTime,
    status,
  } = data;
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const acceptBooking = useMutation(
    trpc.provider.acceptBooking.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAllbookings.queryOptions({})
        );
        await queryClient.invalidateQueries(
          trpc.provider.getBookingById.queryOptions({ id })
        );
      },
    })
  );
  const [AcceptBookingModal, confirmAccept] = useConfirm({
    title: "Accept Booking",
    description:
      "By accepting, the customer will be notified and this booking will be added to your schedule. Do you want to continue?",
  });

  const handleAcceptBooking = async () => {
    const success = await confirmAccept();
    if (!success) return;
    acceptBooking.mutate({ bookingId: id });
  };
  return (
    <>
      <AcceptBookingModal />
      <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-2xl border bg-white">
        {/* Header */}
        <CardHeader className="flex justify-between items-start border-b pb-4">
          <div>
            <CardTitle className="text-2xl font-semibold">
              {serviceName}
            </CardTitle>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-400" />
              {serviceDescription}
            </p>
          </div>
          <Badge
            className={`${
              status === "pending"
                ? "bg-yellow-500"
                : status === "confirmed"
                ? "bg-green-600"
                : "bg-red-600"
            } text-white px-3 py-1 text-sm rounded-full`}
          >
            {status}
          </Badge>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Booker */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Booked by
                </p>
                <p className="text-gray-800 font-medium">{bookedBy}</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Date & Time
                </p>
                <p className="text-gray-800 font-medium">
                  {format(createdAt, "PPP p")}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Duration
                </p>
                <p className="text-gray-800 font-medium">{duration}</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-start gap-3">
              <Tag className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Category
                </p>
                <p className="text-gray-800 font-medium">{category}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Price
                </p>
                <p className="text-gray-800 font-semibold">${price}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          {status === "pending" && (
            <div className="flex gap-4 pt-4 border-t">
              <Button
                onClick={handleAcceptBooking}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Accept Booking
              </Button>
              <CancelBookingModal bookingId={id} />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
