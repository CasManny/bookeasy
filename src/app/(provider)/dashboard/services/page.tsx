import { DEFAULT_LIMIT } from "@/constants";
import { ManageHeader } from "@/features/provider/ui/components/manage-header";
import {
  ManageServiceError,
  ManageServiceSkeleton,
  ManageServiceView,
} from "@/features/provider/ui/views/manage-service-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ServicesPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.provider.getAllServices.infiniteQueryOptions({ limit: DEFAULT_LIMIT })
  );
  return ( 
    <>
      <ManageHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ManageServiceSkeleton />}>
          <ErrorBoundary fallback={<ManageServiceError />}>
            <ManageServiceView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default ServicesPage;
