"use client";
import React from "react";
import { BookDetailsCard } from "../components";
import { BookDetailsCardSkeleton } from "../components/skeletons/bookings/booking-card";
import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id: string;
}

export const BookingDetailsView = ({ id }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.provider.getBookingById.queryOptions({ id })
  );

  if (!data) {
    return (
      <EmptyState
        title="Booking Not Found"
        description="The booking you are looking for might have been canceled or does not exist."
        icon="calendar"
        action={
          <Button asChild className="bg-brand-blue text-white">
            <Link href="/dashboard/bookings">View All Bookings</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className="mt-10">
      <BookDetailsCard data={data} />
    </div>
  );
};

export const BookDetailsSkeleton = () => {
  return <BookDetailsCardSkeleton />;
};

export const BookingDetailsError = () => {
  return (
    <ErrorState
      title="Unable to Retrieve Booking Details"
      description="Something went wrong while loading your booking information. Please check your connection or try again later."
    />
  );
};
