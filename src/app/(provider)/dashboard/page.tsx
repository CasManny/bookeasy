import {
  DashboardView,
  DashboardViewError,
  DashboardViewSkeleton,
} from "@/features/provider/ui/views/dashboard-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ErrorBoundary } from "react-error-boundary";

import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

const DashboardPage = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });
  if (!session) redirect("/login");

  const isProvider = session.user.role === "provider";
  if (!isProvider) {
    redirect("/services");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.provider.getStats.queryOptions());
  void queryClient.prefetchQuery(
    trpc.provider.getRecentBookings.queryOptions()
  );
  void queryClient.prefetchQuery(trpc.provider.getTopServices.queryOptions());
  void queryClient.prefetchQuery(trpc.provider.getAllCategories.queryOptions());
  void queryClient.prefetchQuery(
    trpc.provider.getAvailabilities.queryOptions()
  );

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<DashboardViewSkeleton />}>
          <ErrorBoundary fallback={<DashboardViewError />}>
            <DashboardView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default DashboardPage;
