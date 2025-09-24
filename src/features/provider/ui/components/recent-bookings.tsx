import React from "react";
import { BookCard } from "./book-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const RecentBookings = () => {
  const bookings = [
    {
      title: "Hair Fixing",
      time: "10:00 AM",
      date: "September 25, 2025",
      price: 50,
    },
    {
      title: "SPA",
      time: "2:00 PM",
      date: "September 26, 2025",
      price: 75,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {bookings.map((b, i) => (
            <BookCard key={i} {...b} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
