"use client";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useConfirm } from "@/hooks/use-confirm";
import { Clock } from "lucide-react";
import React, { useState } from "react";
import { RescheduleDialog } from "./reschedule-dialog";

interface Props {
  title: string;
  status: string;
  time: string;
  price: number;
  bookingId: string;
}

export const ManageBookingCard: React.FC<Props> = ({
  title,
  status,
  time,
  price,
  bookingId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CancelBookingModal, confirmCancel] = useConfirm({
    title: "Cancel Booking",
    description: "Are you sure you want to cancel this booking?",
  });

  const cancelBooking = async () => {
    const success = await confirmCancel();
    if (!success) return;
    // continue proces
  };

  const handleCloseDialog = () => {
    setIsModalOpen(false);
  };

  const handleOpenDialog = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white border border-brand-accent rounded-2xl shadow-md p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow">
        <CancelBookingModal />
        <div className="flex justify-between items-center">
          <h3 className="text-lg sm:text-2xl font-semibold text-gray-900">
            {title}
          </h3>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              status === "Confirmed"
                ? "bg-green-100 text-green-600"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="flex items-center gap-2 text-lg text-gray-600">
          <Clock size={16} />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium text-gray-800">
          <span>${price}</span>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <Button
            onClick={handleOpenDialog}
            className="flex-1 px-3 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Reschedule
          </Button>
          <Button
            onClick={cancelBooking}
            className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            Cancel
          </Button>
        </div>
        <ResponsiveDialog
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
        </ResponsiveDialog>
      </div>
    </>
  );
};
