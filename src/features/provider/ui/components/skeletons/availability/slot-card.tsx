"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const SlotCardSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="border rounded-2xl shadow-sm p-5 bg-white space-y-4"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-32 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>

          {/* Slots */}
          <div className="space-y-3">
            {[...Array(3)].map((_, j) => (
              <div
                key={j}
                className="flex justify-between items-center border rounded-xl p-4"
              >
                <Skeleton className="h-6 w-20 rounded" />
                <Skeleton className="h-6 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
