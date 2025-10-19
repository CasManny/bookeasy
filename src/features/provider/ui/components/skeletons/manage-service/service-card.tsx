import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-2xl py-10 px-4 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-2/3 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Description */}
      <Skeleton className="h-4 w-full mb-2 rounded-md" />
      <Skeleton className="h-4 w-5/6 mb-4 rounded-md" />

      {/* Price & Duration */}
      <div className="flex justify-between items-center mt-4">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-4 w-12 rounded-md" />
      </div>

      <Skeleton className="h-6 w-24 mt-6 rounded-full" />
    </div>
  );
};
