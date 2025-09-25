import React from "react";
import {
  DashboardStats,
  QuickActions,
  RecentBookings,
  TopServices,
} from "../components";

export const DashboardView = () => {
  return (
    <div className="pb-10">
      <DashboardStats />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-10">
        <div className="space-y-2">
          <RecentBookings />
          <TopServices />
        </div>
        <QuickActions />
      </div>
    </div>
  );
};
