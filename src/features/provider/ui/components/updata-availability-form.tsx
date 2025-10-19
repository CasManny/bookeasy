"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getFullDayName } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { WeekDay } from "../../types";

interface Props {
  onClose: () => void;
}

interface AvailabilityResponse {
  day: "mon" | "tue" | "wed" | "thurs" | "fri" | "sat" | "sun";
  isAvailable: boolean;
}

export const UpdateAvailabilityForm = ({ onClose }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.provider.getAvailabilities.queryOptions()
  );

  const updateAvailability = useMutation(
    trpc.provider.updateAvailability.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAvailabilities.queryOptions()
        );
        await queryClient.invalidateQueries(
          trpc.provider.getAvailabilitiesSlots.queryOptions()
        );
        onClose();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [availability, setAvailability] = useState<AvailabilityResponse[]>(
    data ?? []
  );

  const toggleDay = (day: AvailabilityResponse["day"]) => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.day === day ? { ...d, isAvailable: !d.isAvailable } : d
      )
    );
  };

  const isPending = updateAvailability.isPending;
  const handleSave = () => {
    updateAvailability.mutate(availability);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Set Weekly Availability</h3>
      <div className="grid grid-cols-1 gap-3">
        {availability.map(({ day, isAvailable }) => (
          <div
            key={day}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <span className="text-lg">{getFullDayName(day as WeekDay)}</span>
            <Switch
              checked={isAvailable}
              onCheckedChange={() => toggleDay(day)}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <Button disabled={isPending} variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={isPending}
          className="bg-brand-blue"
          onClick={handleSave}
        >
          {isPending ? "Updating..." : "Save"}
        </Button>
      </div>
    </div>
  );
};
