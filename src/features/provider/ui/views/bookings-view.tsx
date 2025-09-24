"use client";
import { reservedbookings } from "../../data";
import { BookingDataTable } from "../components";
import { Bookingcolumns } from "../components/booking-colums";

export const BookingsView = () => {
  return (
    <div className="pt-10 pb-20">
      <BookingDataTable
        getRowLink={(row) => `/dashboard/bookings/${row.id}`}
        columns={Bookingcolumns}
        data={reservedbookings}
      />
    </div>
  );
};
