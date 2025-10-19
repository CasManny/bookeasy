"use client"
import React from "react";
import {
  DashboardStats,
  QuickActions,
  RecentBookings,
  TopServices,
} from "../components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { StatsCardSkeleton } from "../components/skeletons/dashboard-view/stats-card";
import { RecentBookingsSkeleton } from "../components/skeletons/dashboard-view/recent-bookings";
import { TopServicesSkeleton } from "../components/skeletons/dashboard-view/top-section";
import { QuickActionsSkeleton } from "../components/skeletons/dashboard-view/quick-actions";
import { ErrorState } from "@/components/error-state";

export const DashboardView = () => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.provider.getStats.queryOptions())
  const { data: bookingStats } = useSuspenseQuery(trpc.provider.getRecentBookings.queryOptions())
  const { data: topServiceStats } = useSuspenseQuery(trpc.provider.getTopServices.queryOptions())
  
  return (
    <div className="pb-10">
      <DashboardStats statsData={data}  />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-10">
        <div className="space-y-2">
          <RecentBookings bookingStats={bookingStats} />
          <TopServices  servicesStats={topServiceStats} />
        </div>
        <QuickActions />
      </div>
    </div>
  );
};

export const DashboardViewSkeleton = () => {
  return (
    <div className="pb-10">
      <StatsCardSkeleton />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-10">
        <div className="space-y-2">
          <RecentBookingsSkeleton />
          <TopServicesSkeleton />
        </div>
        <QuickActionsSkeleton />
      </div>
    </div>
  );
}


export const DashboardViewError = () => {
  return (
    <ErrorState title="Failure to Load Info" description="Service Time out. Maintenance in progress" />
  )
}