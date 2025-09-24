import React from "react";
import { DashboardStats, QuickActions, RecentBookings } from "../components";

export const DashboardView = () => {
  return (
    <div className="">
      <DashboardStats />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-10">
        <RecentBookings />
        <QuickActions />
      </div>
    </div>
  );
};
