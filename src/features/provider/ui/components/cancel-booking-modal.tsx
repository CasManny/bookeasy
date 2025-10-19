"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  bookingId: string;
}

export function CancelBookingModal({ bookingId }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const cancelBooking = useMutation(
    trpc.provider.cancelBooking.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getBookingById.queryOptions({ id: bookingId })
        );
        await queryClient.invalidateQueries(
          trpc.provider.getAllbookings.queryOptions({})
        );
        handleOpen(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleOpen = (value: boolean) => {
    setOpen(value);
    if (!value) {
      setReason("");
      setError("");
    }
  };

  const isPending = cancelBooking.isPending;

  const handleConfirm = () => {
    if (reason.trim() === "") {
      setError("Please provide a reason for canceling this booking.");
      return;
    }
    cancelBooking.mutate({ bookingId, reason });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex-1">
          Reject Booking
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="!max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">
            Cancel Booking
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            By rejecting, the customer will be informed immediately. Please
            provide a reason for canceling this booking.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 flex flex-col gap-2">
          <Input
            placeholder="Enter reason..."
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error) setError("");
            }}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="pt-6 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-center lg:justify-end">
          <Button
            disabled={isPending}
            onClick={() => handleOpen(false)}
            variant="outline"
            className="lg:w-auto w-full"
          >
            Cancel
          </Button>
          <Button disabled={isPending} onClick={handleConfirm} className="w-full lg:w-auto">
            {isPending ? "cancelling..." : "Confirm"}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
