"use client";
import React from "react";
import { BookDetailsCard } from "../components";

export const BookingDetailsView = () => {
  return (
    <div className="mt-10">
      <BookDetailsCard
        title="Premium Haircut"
        description="A detailed grooming session that includes precision cutting, styling, and finishing to give a polished look."
        duration="45 minutes"
        tag="Grooming"
        price={40}
        bookerName="John Doe"
        date="2025-09-28, 2:00 PM"
        status="pending"
      />
    </div>
  );
};
