import { loadBookingSearchParams } from "@/features/provider/params";
import {
  BookingsView,
  BookingsViewError,
  BookingsViewSkeleton,
} from "@/features/provider/ui/views/bookings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: Promise<SearchParams>;
}

const BookingsPage = async ({ searchParams }: Props) => {
  const filters = await loadBookingSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.provider.getAllbookings.queryOptions({ ...filters })
  );

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BookingsViewSkeleton />}>
          <ErrorBoundary fallback={<BookingsViewError />}>
            <BookingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default BookingsPage;
