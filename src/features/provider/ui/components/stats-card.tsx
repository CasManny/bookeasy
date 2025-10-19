"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  Icon: LucideIcon;
  isRevenue: boolean;
  value: number;
  color: string;
  className?: string;
}

export const StatsCard: React.FC<Props> = ({
  title,
  Icon,
  isRevenue,
  value,
  color,
  className
}) => {
  const formattedValue = isRevenue
    ? `$${value.toLocaleString()}`
    : value.toLocaleString();

  return (
    <Card className={cn("p-8 shadow-sm rounded-2xl", className)}>
      <div className="flex items-center justify-between space-y-0">
        <div className="space-y-0.5">
          <h1 className="text-lg font-medium">{title}</h1>
          <div className="text-2xl font-bold">{formattedValue}</div>
        </div>
        <div
          className="w-10 h-10 flex-center rounded-full"
          style={{ backgroundColor: `${color}` }}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </Card>
  );
};
