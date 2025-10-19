"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TopServicesSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-32" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 border-b last:border-0"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" /> {/* Service name */}
                <Skeleton className="h-3 w-16" /> {/* Bookings */}
              </div>

              <div className="text-right space-y-2">
                <Skeleton className="h-4 w-10 ml-auto" /> {/* Price */}
                <Skeleton className="h-3 w-12 ml-auto" /> {/* Duration */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
