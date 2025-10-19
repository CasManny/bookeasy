import { DEFAULT_USER_LIMIT } from "@/constants";
import { Header } from "@/features/user/ui/components";
import {
  ServicesGridSkeleton,
  ServiceViewError,
  ServiceViews,
} from "@/features/user/ui/views/services-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const ServicesPage = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/login");

  const isProvider = session.user.role === "provider";
  if (isProvider) {
    redirect("/dashboard");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.user.getServices.infiniteQueryOptions({ limit: DEFAULT_USER_LIMIT })
  );

  return (
    <div className="">
      <Header
        title="Professional Services"
        description="Book appointments with trusted professionals. choose from our wide range
        of services and find the perfect time that works for you"
      />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ServicesGridSkeleton />}>
          <ErrorBoundary fallback={<ServiceViewError />}>
            <ServiceViews />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default ServicesPage;
