"use client";
import React from "react";
import { ServiceCard } from "../components";
import { ServiceCardSkeleton } from "../components/skeletons/manage-service/service-card";
import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { DEFAULT_LIMIT } from "@/constants";
import { InfiniteScroll } from "@/components/infinit-scroll";
import { PlusCircle } from "lucide-react";

export const ManageServiceView = () => {
  const trpc = useTRPC();

  const query = useSuspenseInfiniteQuery(
    trpc.provider.getAllServices.infiniteQueryOptions(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastpage) => lastpage.nextCursor,
      }
    )
  );

  const services = query.data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {services.length === 0 ? (
          <div className="col-span-full">
            <EmptyServiceState />
          </div>
        ) : (
          services.map((service, index) => (
            <ServiceCard key={index} data={service} />
          ))
        )}
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
        isEmpty={!!services}
      />
    </>
  );
};

export const ManageServiceSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <ServiceCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const ManageServiceError = () => {
  return (
    <ErrorState
      title="Failure to Load Services"
      description="We couldn't load your services at the moment. Please try again shortly or refresh the page."
    />
  );
};

export const EmptyServiceState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
      <PlusCircle className="w-10 h-10 text-gray-400 mb-3" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No services found
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm">
        You haven&apos;t created any services yet.
      </p>
    </div>
  );
};
