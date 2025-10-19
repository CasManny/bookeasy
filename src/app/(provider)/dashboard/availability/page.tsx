import {
  AvailabilityView,
  AvailabilityViewError,
  AvailabilityViewSkeleton,
} from "@/features/provider/ui/views/availability-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const AvailabilityPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.provider.getAvailabilitiesSlots.queryOptions()
  );
  void queryClient.prefetchQuery(
    trpc.provider.getAvailabilities.queryOptions()
  );
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AvailabilityViewSkeleton />}>
          <ErrorBoundary fallback={<AvailabilityViewError />}>
            <AvailabilityView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default AvailabilityPage;
