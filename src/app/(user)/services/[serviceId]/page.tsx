import { ServiceCardWithSlotsSkeleton } from "@/features/user/ui/skeletons/services/service-card-slots";
import { ServiceDetailError, ServiceDetailsView } from "@/features/user/ui/views/service-detail-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ serviceId: string }>;
}

const ServiceDetailPage = async ({ params }: Props) => {
  const { serviceId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.user.getServiceById.queryOptions({ serviceId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ServiceCardWithSlotsSkeleton />}>
        <ErrorBoundary fallback={<ServiceDetailError />}>
          <ServiceDetailsView id={serviceId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default ServiceDetailPage;
