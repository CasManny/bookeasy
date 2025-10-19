import {
  BookDetailsSkeleton,
  BookingDetailsError,
  BookingDetailsView,
} from "@/features/provider/ui/views/booking-details-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ bookingId: string }>;
}

const BookingDetailsPage = async ({ params }: Props) => {
  const { bookingId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.provider.getBookingById.queryOptions({ id: bookingId })
  );
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BookDetailsSkeleton />}>
          <ErrorBoundary fallback={<BookingDetailsError />}>
            <BookingDetailsView id={bookingId} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default BookingDetailsPage;
