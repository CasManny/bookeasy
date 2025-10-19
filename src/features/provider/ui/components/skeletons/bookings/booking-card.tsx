"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const BookDetailsCardSkeleton = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg mt-10 rounded-2xl border bg-white">
      {/* Header */}
      <CardHeader className="flex justify-between items-start border-b pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Booker */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};
