"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SlotCard } from "../components/slot-card";
import { UpdateAvailability } from "../components/update-availability";
import { SlotCardSkeleton } from "../components/skeletons/availability/slot-card";
import { ErrorState } from "@/components/error-state";
import { UpdateAvailabilityButtonSkeleton } from "../components/skeletons/availability/update-availability";

export const AvailabilityView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.provider.getAvailabilitiesSlots.queryOptions()
  );
  return (
    <div className="p-6">
      <UpdateAvailability className="w-fit mb-5" />
      <SlotCard data={data} />
    </div>
  );
};

export const AvailabilityViewSkeleton = () => {
  return (
    <div className="space-y-5">
      <UpdateAvailabilityButtonSkeleton />
      <SlotCardSkeleton />
    </div>
  );
};

export const AvailabilityViewError = () => {
  return (
    <ErrorState
      title="Couldn’t Load Your Availability"
      description="Something went wrong while loading your schedule. Please refresh the page or try again later."
    />
  );
};
