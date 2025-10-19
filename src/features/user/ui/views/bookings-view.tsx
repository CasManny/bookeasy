"use client";
import React from "react";
import { ManageBookingCard } from "../components/manage-booking-card";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ManageBookingCardSkeleton } from "../skeletons/bookings/manage-booking-card";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const BookingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.user.getMybookings.queryOptions());

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No Bookings Yet"
        description="You don’t have any bookings at the moment. Start exploring services and schedule one today."
        icon="calendar"
        action={
          <Button asChild className="bg-brand-blue text-white">
            <Link href="/services">Browse Services</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="p-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((booking, idx) => (
        <ManageBookingCard key={idx} data={booking} />
      ))}
    </div>
  );
};

export const BookingsViewSkeleton = () => {
  return (
    <div className="p-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ManageBookingCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export const BookingsViewError = () => {
  return (
    <ErrorState
      title="Unable to Load Bookings"
      description="Something went wrong while fetching your bookings. Please try again."
    />
  );
};
