"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const ServiceCardWithSlotsSkeleton = () => {
  return (
    <div className="bg-white w-full p-6 sm:p-10 max-w-xl mx-auto mt-10 shadow-2xl rounded-2xl animate-pulse">
      {/* Category and Price */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>

      {/* Title */}
      <div className="mt-4">
        <Skeleton className="h-8 w-3/4 rounded-md" />
      </div>

      {/* Description */}
      <div className="mt-2">
        <Skeleton className="h-4 w-full rounded-md mb-2" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>

      {/* Provider */}
      <div className="flex flex-col space-x-2 mt-5">
        <Skeleton className="h-6 w-32 rounded-md mb-1" />
        <Skeleton className="h-5 w-48 rounded-md" />
      </div>

      {/* Duration */}
      <div className="mt-4 flex gap-2 items-center">
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>

      {/* Select Day */}
      <div className="mt-6 space-y-4">
        <Skeleton className="h-6 w-32 rounded-md mb-2" />
        <Skeleton className="h-14 w-full sm:w-64 rounded-md" />

        {/* Select Slot */}
        <Skeleton className="h-6 w-32 rounded-md mt-4 mb-2" />
        <Skeleton className="h-14 w-full sm:w-64 rounded-md" />
      </div>

      {/* Button */}
      <div className="mt-6">
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
};
