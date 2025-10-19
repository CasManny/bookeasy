"use client";

import { cn } from "@/lib/utils";
import { CalendarX2, Inbox, Search } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: "inbox" | "calendar" | "search";
  action?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  title,
  description,
  icon = "inbox",
  action,
  className,
}: EmptyStateProps) => {
  const IconComponent =
    icon === "calendar" ? CalendarX2 : icon === "search" ? Search : Inbox;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-20 px-4 space-y-4",
        className
      )}
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-600 shadow-sm">
        <IconComponent className="w-10 h-10" strokeWidth={1.5} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1 max-w-md mx-auto">{description}</p>
      </div>
      {action && <div className="pt-4">{action}</div>}
    </div>
  );
};
