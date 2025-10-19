"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const ManageBookingCardSkeleton = () => {
  return (
    <div className="bg-white border border-brand-accent rounded-2xl shadow-md p-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-48" />
      </div>

      <Skeleton className="h-5 w-16" />

      <div className="flex flex-col gap-3 mt-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
};
