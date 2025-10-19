import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentBookingsType } from "../../types";
import { CalendarX } from "lucide-react"; // for an empty icon
import { BookCard } from "./book-card";

interface Props {
  bookingStats: recentBookingsType;
}

export const RecentBookings = ({ bookingStats }: Props) => {
  const hasBookings = bookingStats && bookingStats.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>

      <CardContent>
        {hasBookings ? (
          <div className="flex flex-col space-y-2">
            {bookingStats.map((b, i) => (
              <BookCard key={i} data={b} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <CalendarX className="h-10 w-10 mb-2 text-gray-400" />
            <p className="text-sm font-medium">No recent bookings yet</p>
            <p className="text-xs text-gray-500">
              Your recent bookings will appear here once clients book your
              services.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
