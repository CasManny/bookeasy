"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const StatsCardSkeleton = () => {
  return (
    <Card className="p-8 shadow-sm rounded-2xl">
      <div className="flex items-center justify-between space-y-0">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </Card>
  );
};
