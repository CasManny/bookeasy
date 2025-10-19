"use client";
import { useTRPC } from "@/trpc/client";
import { useBookingsFilters } from "../../hooks/use-booking-filters";
import { BookingDataTable } from "../components";
import {
  Bookingcolumns,
  BookingColumnsProps,
} from "../components/booking-colums";
import { useSuspenseQuery } from "@tanstack/react-query";
import Loaders from "@/components/loader";
import { ErrorState } from "@/components/error-state";

export const BookingsView = () => {
  const [filters] = useBookingsFilters();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.provider.getAllbookings.queryOptions({ ...filters })
  );

  const bookingsData = data.items;
  return (
    <div className="pt-10 pb-20">
      <BookingDataTable
        getRowLink={(row) => `/dashboard/bookings/${row.id}`}
        columns={Bookingcolumns}
        data={bookingsData as BookingColumnsProps[]}
      />
    </div>
  );
};

export const BookingsViewSkeleton = () => {
  return <Loaders size={100} />;
};


export const BookingsViewError = () => {
  return (
    <ErrorState
      title="Failed to Load Bookings"
      description="Something went wrong while fetching bookings. Please try again later."
    />
  );
}