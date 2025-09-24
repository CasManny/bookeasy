import React from "react";
import { ManageCTA } from "./manage-cta";

interface Props {
  title: string;
  description: string;
  price: number;
  duration: string;
  tag: string;
}

export const ServiceCard: React.FC<Props> = ({
  title,
  description,
  price,
  duration,
  tag,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl py-10 px-4 border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <ManageCTA />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-lg mb-4">{description}</p>

      {/* Price & Duration */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-gray-900">${price}</span>
        <span className="text-sm text-gray-500">{duration}</span>
      </div>

      <p className="px-3 mt-4 w-fit py-1 text-sm font-medium text-white bg-brand-accent rounded-full">
        {tag}
      </p>
    </div>
  );
};
