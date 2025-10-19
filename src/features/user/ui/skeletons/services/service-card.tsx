"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white w-full p-10 shadow-2xl rounded-2xl animate-pulse">
      {/* Tag & Price */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-10 rounded-md" />
      </div>

      {/* Service title */}
      <Skeleton className="h-6 w-40 mt-4 rounded-md" />

      {/* Description */}
      <div className="space-y-2 mt-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>

      {/* Duration */}
      <div className="mt-4 flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded-md" />
        <Skeleton className="h-4 w-24 rounded-md" />
      </div>

      {/* Book Now button */}
      <Skeleton className="h-10 w-full mt-6 rounded-xl" />
    </div>
  );
};
