"use client";

import { format } from "date-fns";
import React from "react";
import { recentBookingsType } from "../../types";

interface Props {
  data: recentBookingsType[number]
}


export const BookCard: React.FC<Props> = ({ data }) => {
  const { title, time, date, price } = data;
  const longFormat = format(date!, "EEEE, MMMM do yyyy");
  return (
    <div className="w-full p-3 hover:bg-brand-accent/10 cursor-pointer transition duration-300 items-center flex justify-between border-b border-brand-accent">
      <div className="">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>
          {longFormat} {time}
        </p>
      </div>
      <span className="font-medium">${price?.toFixed(2)}</span>
    </div>
  );
};
