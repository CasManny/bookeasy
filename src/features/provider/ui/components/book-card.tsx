"use client";

import React from "react";

interface Props {
  title: string;
  time: string;
  date: string;
  price: number;
}

export const BookCard: React.FC<Props> = ({ title, time, date, price }) => {
  return (
    <div className="w-full p-3 hover:bg-brand-accent/10 cursor-pointer transition duration-300 items-center flex justify-between border-b border-brand-accent">
      <div className="">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>
          {date} {time}
        </p>
      </div>
      <span className="font-medium">${price.toFixed(2)}</span>
    </div>
  );
};
