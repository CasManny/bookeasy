"use client";
import { StatsCard } from "./stats-card";
import { DollarSign, Settings, Users } from "lucide-react";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <StatsCard
        title="Total Revenue"
        Icon={DollarSign}
        isRevenue={true}
        value={12500}
        color="#FF6B6B"
      />
      <StatsCard
        title="Total Bookings"
        Icon={Users}
        isRevenue={false}
        value={87}
        color="#D7BCE8"
      />
      <StatsCard
        title="Total Services"
        Icon={Settings}
        isRevenue={false}
        value={87}
        color="#8884FF"
      />
    </div>
  );
};
