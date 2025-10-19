"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { AvailabilitySlotsType, WeekDay } from "../../types";
import { cn, generateTimeSlots, getFullDayName } from "@/lib/utils";
import { TooltipButton } from "@/components/tool-tip-button";
import { CirclePlus } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TIME_GAP_SLOT } from "@/constants";
import { useConfirm } from "@/hooks/use-confirm";

type SlotCardProps = {
  data: AvailabilitySlotsType;
};

export const SlotCard: React.FC<SlotCardProps> = ({ data }) => {
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [timeGap, setTimeGap] = useState<number>(30);
  const [SlotDeleteModal, confirmSlotDelete] = useConfirm({
    title: "Delete Slot",
    description:
      "Are you sure you want to delete this slot? This action can’t be undone",
  });
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const timeSlots = useMemo(() => generateTimeSlots(timeGap, "12h"), [timeGap]);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const addSlot = useMutation(
    trpc.provider.addSlot.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAvailabilitiesSlots.queryOptions()
        );
        setOpenDialogId(null);
        setSelectedTime("");
      },
      onError: (error) => {
        toast.error(error.message);
        setOpenDialogId("open");
      },
    })
  );

  const deleteSlot = useMutation(
    trpc.provider.deleteSlot.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAvailabilitiesSlots.queryOptions()
        );
      },
    })
  );
  const isConfirmDisabled = addSlot.isPending || !selectedTime;

  const confirmButtonLabel = addSlot.isPending
    ? "Adding..."
    : !selectedTime
    ? "Select a Time"
    : "Add slot";

  const handleAddSlot = (id: string) => {
    if (!selectedTime) {
      toast.error("Please select a time slot.");
      return;
    }
    addSlot.mutate({
      availabilityId: id,
      time: selectedTime,
    });
  };

  const handleSlotDelete = async (slotId: string, availabilityId: string) => {
    const success = await confirmSlotDelete();
    if (!success) return;
    deleteSlot.mutate({
      slotId,
      availabilityId,
    });
  };

  return (
    <>
      <SlotDeleteModal />
      <div className="grid gap-6 sm:grid-cols-2">
        {data.map((item) => {
          const isDialogOpen = openDialogId === item.day;

          return (
            <div
              key={item.day}
              className={cn(
                "border rounded-2xl h-fit shadow-sm p-5 bg-white transition-opacity duration-300",
                !item.isAvailable && "opacity-40 pointer-events-none"
              )}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold mb-3">
                  {getFullDayName(item.day as WeekDay)}
                </h2>

                {/* Tooltip + Dialog Trigger */}
                <AlertDialog
                  open={isDialogOpen}
                  onOpenChange={(open) =>
                    setOpenDialogId(open ? item.day : null)
                  }
                >
                  <TooltipButton label="Add a slot">
                    <AlertDialogTrigger asChild>
                      <Button size={"icon"} variant={"ghost"}>
                        <CirclePlus />
                      </Button>
                    </AlertDialogTrigger>
                  </TooltipButton>

                  <AlertDialogContent className="!max-w-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Add New Slot</AlertDialogTitle>
                      <AlertDialogDescription>
                        You&apos;re about to add a new slot for{" "}
                        <strong>{getFullDayName(item.day as WeekDay)}</strong>.
                        Confirm to proceed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="py-4 space-y-5">
                      <div>
                        <label className="text-sm font-medium">
                          Time Gap (minutes)
                        </label>
                        <Select
                          defaultValue="30"
                          onValueChange={(val) => setTimeGap(Number(val))}
                        >
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue placeholder="Select time gap" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_GAP_SLOT.map((gap) => (
                              <SelectItem key={gap} value={gap.toString()}>
                                {gap} minutes
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Select onValueChange={(val) => setSelectedTime(val)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 overflow-y-auto">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <AlertDialogFooter>
                      <AlertDialogCancel
                        disabled={addSlot.isPending}
                        onClick={() => setOpenDialogId(null)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isConfirmDisabled}
                        onClick={() => handleAddSlot(item.availabilityId)}
                      >
                        {confirmButtonLabel}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Slots */}
              <div className="flex flex-col gap-4">
                {item.slots.length > 0 ? (
                  item.slots.map((slot, i) => (
                    <div
                      key={i}
                      className="relative text-brand-black border rounded-xl group flex justify-between items-center"
                    >
                      <span className="block p-5 text-xl font-bold">
                        {slot.time}
                      </span>

                      <Button
                        className="px-3 !h-8 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-2"
                        onClick={() =>
                          handleSlotDelete(slot.slotId, item.availabilityId)
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No slots</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
