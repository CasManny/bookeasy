import React from "react";
import { bookings } from "../../data";
import { ManageBookingCard } from "../components/manage-booking-card";

export const BookingsView = () => {
  return (
    <div className="p-6 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking, idx) => (
        <ManageBookingCard key={idx} {...booking} />
      ))}
    </div>
  );
};
