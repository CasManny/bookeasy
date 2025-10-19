"use client";
import { ErrorState } from "@/components/error-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ServiceCardWithSlots } from "../components/service-cards-slot";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  id: string;
}

export const ServiceDetailsView = ({ id }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.user.getServiceById.queryOptions({ serviceId: id })
  );

  if (!data) {
    return (
      <EmptyState
        title="Service Not Found"
        description="The service you're looking for might have been removed or doesn't exist."
        icon="search"
        action={
          <Button asChild className="bg-brand-blue text-white">
            <Link href="/services">Browse Services</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="pb-10">
      <ServiceCardWithSlots data={data} />
    </div>
  );
};

export const ServiceDetailError = () => {
  return (
    <ErrorState
      title="Failed to Load Service Details"
      description="We encountered an issue while fetching the service details. Please try refreshing the page or check back later."
    />
  );
};
