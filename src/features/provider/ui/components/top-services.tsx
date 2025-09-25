import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { topService } from "../../data";
import { TopServiceCard } from "./top-service-card";

export const TopServices = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {topService.map((b, i) => (
            <TopServiceCard key={i} {...b} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
