import React from "react";

interface ServiceItemProps {
  id: string | number;
  name: string;
  bookings: number;
  price: number;
  duration: number;
}

export const TopServiceCard: React.FC<ServiceItemProps> = ({
  id,
  name,
  bookings,
  price,
  duration,
}) => {
  return (
    <div key={id} className="flex items-center justify-between p-2 border-b">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{bookings} bookings</div>
      </div>
      <div className="text-right">
        <div className="font-medium">${price}</div>
        <div className="text-sm text-gray-500">{duration} min</div>
      </div>
    </div>
  );
};
