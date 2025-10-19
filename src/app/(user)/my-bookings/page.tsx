import { Header } from "@/features/user/ui/components";
import {
  BookingsView,
  BookingsViewError,
  BookingsViewSkeleton,
} from "@/features/user/ui/views/bookings-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MybookingsPage = async () => {
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
