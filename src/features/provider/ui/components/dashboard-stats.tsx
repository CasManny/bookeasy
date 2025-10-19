"use client";
import { stats } from "../../types";
import { StatsCard } from "./stats-card";
import { DollarSign, Settings, Users } from "lucide-react";

interface Props {
  statsData: stats
}

export const DashboardStats = ({ statsData }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 ">
      <StatsCard
        title="Total Revenue"
        Icon={DollarSign}
        isRevenue={true}
        value={12500}
        color="#FF6B6B"
        className="hidden"
      />
      <StatsCard
        title="Total Bookings"
        Icon={Users}
        isRevenue={false}
        value={statsData.bookingsCount}
        color="#D7BCE8"
      />
      <StatsCard
        title="Total Services"
        Icon={Settings}
        isRevenue={false}
        value={statsData.totalServices}
        color="#8884FF"
      />
    </div>
  );
};
