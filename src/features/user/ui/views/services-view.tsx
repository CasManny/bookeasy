"use client";
import { Container } from "@/components/container";
// import { services } from "../../data";
import { DEFAULT_USER_LIMIT } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ServiceCard } from "../components";
import { ServiceCardSkeleton } from "../skeletons/services/service-card";
import { UserInfiniteScroll } from "../components/user-infinite-scroll";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const ServiceViews = () => {
  const trpc = useTRPC();
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useSuspenseInfiniteQuery(
      trpc.user.getServices.infiniteQueryOptions(
        { limit: DEFAULT_USER_LIMIT },
        {
          getNextPageParam: (lastpage) => lastpage.nextCursor,
        }
      )
    );

  const services = data?.pages.flatMap((page) => page.items) ?? [];

  if (!services.length) {
    return (
      <EmptyState
        title="No Services Available"
        description="It looks like there are no services available at the moment. Check back later or explore other categories."
        icon="search"
        action={
          <Button asChild className="bg-brand-blue text-white">
            <Link href="/">Go Home</Link>
          </Button>
        }
      />
    );
  }

  return (
    <Container>
      <div className="grid grid-cols-1 mb-15 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {services.map((service, index) => (
          <ServiceCard key={index} data={service} />
        ))}
      </div>
      <UserInfiniteScroll
        isEmpty={!!services}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

export const ServicesGridSkeleton = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    </Container>
  );
};

export const ServiceViewError = () => {
  return (
    <ErrorState
      title="Failed to Load Services"
      description="We encountered an issue while fetching available services. This could be due to a temporary network error or ongoing maintenance. Please refresh the page or try again later."
    />
  );
};
