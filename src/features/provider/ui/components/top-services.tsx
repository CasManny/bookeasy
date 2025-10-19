import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TopServiceCard } from "./top-service-card";
import { topServicesType } from "../../types";
import { Package } from "lucide-react"; // or any icon you prefer
import React from "react";

interface Props {
  servicesStats: topServicesType;
}

export const TopServices = ({ servicesStats }: Props) => {
  const hasServices = servicesStats && servicesStats.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Services</CardTitle>
      </CardHeader>
      <CardContent>
        {hasServices ? (
          <div className="flex flex-col space-y-2">
            {servicesStats.map((service, i) => (
              <TopServiceCard key={i} {...service} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <Package className="h-10 w-10 mb-3 text-muted-foreground/70" />
            <p className="text-sm font-medium">No services found</p>
            <p className="text-xs text-muted-foreground">
              Your top services will appear here once you get bookings.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
