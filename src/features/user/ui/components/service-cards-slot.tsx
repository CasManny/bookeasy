"use client";

import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useMemo } from "react";
import { cn, getFullDayName } from "@/lib/utils";
import { ServiceDetailType } from "../../types";
import { WeekDay } from "@/features/provider/types";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { services } from "@/db/schema";

interface Props {
  data: ServiceDetailType;
  showButton?: boolean;
}

export const ServiceCardWithSlots = ({ data, showButton = true }: Props) => {
  const {
    service: { description, category, duration, id, price, provider, title },
    availabilities,
  } = data;

  const trpc = useTRPC();
  const router = useRouter();

  // Selected day and slot
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Filter slots based on selected day
  const availableSlots = useMemo(() => {
    if (!selectedDay) return [];
    const availability = availabilities.find(
      (a) => a.availabilityId === selectedDay
    );
    return availability?.slots ?? [];
  }, [selectedDay, availabilities]);

  const bookService = useMutation(
    trpc.user.bookService.mutationOptions({
      onSuccess: async () => {
        // Todo: refresh user bookings
        router.push("/services/success");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const isPending = bookService.isPending;

  const handleBooking = () => {
    if (!selectedSlot) return;
    bookService.mutate({
      serviceId: id,
      slotId: selectedSlot,
    });
  };

  return (
    <div
      className={cn(
        "bg-white w-full p-6 sm:p-10 max-w-xl mx-auto mt-10",
        showButton &&
          "shadow-2xl rounded-2xl hover:shadow-xl transition-shadow duration-300"
      )}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-white bg-brand-accent px-3 py-1 rounded-full">
          {category}
        </span>
        <span className="text-brand-blue font-bold">${price}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-brand-black">{title}</h3>
      <p className="mt-2 text-gray-700 text-sm sm:text-lg">{description}</p>

      <div className="flex flex-col space-x-2 mt-5">
        <p className="text-xl font-bold">Service Provider</p>
        <p className="font-semibold text-lg">{provider}</p>
      </div>

      <div className="mt-4 flex gap-2 items-center">
        <Clock />
        <span className="text-gray-700 font-medium">{duration}</span>
      </div>

      {/* Availability and Slot Select */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xl font-medium mb-1">Select Day</p>
          <Select
            onValueChange={(value) => {
              setSelectedDay(value);
              setSelectedSlot(null);
            }}
            value={selectedDay ?? undefined}
          >
            <SelectTrigger className="!h-14 w-full sm:w-64 text-base">
              <SelectValue className="text-lg" placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {availabilities.map((a) => (
                <SelectItem
                  key={a.availabilityId}
                  value={a.availabilityId}
                  disabled={!a.isAvailable}
                  className="text-lg"
                >
                  {getFullDayName(a.day as WeekDay)}{" "}
                  {a.isAvailable ? "" : "(Unavailable)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedDay && (
          <div>
            <p className="text-xl font-medium mb-1">Select Slot</p>
            <Select
              onValueChange={setSelectedSlot}
              value={selectedSlot ?? undefined}
            >
              <SelectTrigger className="!h-14 w-full sm:w-64 text-base">
                <SelectValue className="!text-lg" placeholder="Select a slot" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <SelectItem
                      className="text-lg"
                      key={slot.slotId}
                      value={slot.slotId}
                    >
                      {slot.time}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    No slots available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <Button
        disabled={!selectedDay || !selectedSlot || isPending}
        onClick={handleBooking}
        className="mt-6 w-full bg-brand-blue text-white font-semibold py-2 rounded-xl hover:bg-brand-blue/80 transition-colors"
      >
        {isPending ? "Booking..." : "Place Booking"}
      </Button>
    </div>
  );
};
