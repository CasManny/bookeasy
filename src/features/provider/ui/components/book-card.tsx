"use client";

import React from "react";
import { parse, format } from "date-fns";

interface Props {
  bookingId: string | null;
  title: string;
  time: string | null;
  date: Date | null;
  price: number;
}


export const BookCard: React.FC<Props> = ({ title, time, date, price, bookingId }) => {
  const longFormat = format(date!, "EEEE, MMMM do yyyy");
  return (
    <div className="w-full p-3 hover:bg-brand-accent/10 cursor-pointer transition duration-300 items-center flex justify-between border-b border-brand-accent">
      <div className="">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>
          {longFormat} {time}
        </p>
      </div>
      <span className="font-medium">${price.toFixed(2)}</span>
    </div>
  );
};
