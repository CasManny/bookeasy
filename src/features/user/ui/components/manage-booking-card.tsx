"use client";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { formatBookingDate } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { MyBookingsType } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  data: MyBookingsType;
}

export const ManageBookingCard: React.FC<Props> = ({ data }) => {
  const {
    bookingId,
    createdAt,
    serviceId,
    price,
    serviceName,
    slotTime,
    status,
  } = data;
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const cancelBooking = useMutation(
    trpc.user.cancelBooking.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.user.getMybookings.queryOptions()
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
  const [CancelBookingModal, confirmCancel] = useConfirm({
    title: status === "confirmed" ? "Delete Booking" : "Cancel Booking",
    description:
      status === "confirmed"
        ? "Are you sure you want to delete this booking record? This action cannot be undone."
        : "Are you sure you want to cancel this booking?",
  });

  const isPending = cancelBooking.isPending;

  const handlecancelBooking = async () => {
    const success = await confirmCancel();
    if (!success) return;
    cancelBooking.mutate({ bookingId });
  };

  return (
    <>
      <div className="bg-white border border-brand-accent rounded-2xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow">
        <CancelBookingModal />
        <div className="flex justify-between items-center">
          <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">
            {serviceName}
          </h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              status === "confirmed"
                ? "bg-green-100 text-green-600"
                : status === "pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-lg text-gray-600">
          <Clock size={16} />
          <span>{`${formatBookingDate(createdAt)} ${slotTime}`}</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
          <span>${price}</span>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          {status === "confirmed" && (
            <Button
              disabled={isPending}
              onClick={() => router.push(`/services/${serviceId}`)}
              className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Reschedule
            </Button>
          )}
          <Button
            disabled={isPending}
            onClick={handlecancelBooking}
            className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            {isPending
              ? "Cancelling..."
              : status === "confirmed" || status === "cancelled"
              ? "Delete Record"
              : "Cancel"}
          </Button>
        </div>
        {/* <ResponsiveDialog
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={`Reschedule service`}
          requireConfirmation
          description={`Select a date and time`}
        >
          <RescheduleDialog
            closeModal={handleCloseDialog}
            bookingId={bookingId}
          />
        </ResponsiveDialog> */}
      </div>
    </>
  );
};
