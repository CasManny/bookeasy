import { Header } from "@/features/user/ui/components";
import {
  BookingsView,
  BookingsViewError,
  BookingsViewSkeleton,
} from "@/features/user/ui/views/bookings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MybookingsPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.user.getMybookings.queryOptions());

  return (
    <div className="w-full">
      <Header
        title="Welcome Back"
        description="Manage your bookings and past appointments"
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BookingsViewSkeleton />}>
          <ErrorBoundary fallback={<BookingsViewError />}>
            <BookingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default MybookingsPage;
