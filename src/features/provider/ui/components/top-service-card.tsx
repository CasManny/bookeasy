import React from "react";

interface ServiceItemProps {
  id: string;
  name: string;
  bookingsCount: number;
  price: number;
  duration: string;
}

export const TopServiceCard: React.FC<ServiceItemProps> = ({
  id,
  name,
  bookingsCount,
  price,
  duration,
}) => {
  return (
    <div key={id} className="flex items-center justify-between p-2 border-b">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{bookingsCount} bookings</div>
      </div>
      <div className="text-right">
        <div className="font-medium">${price}</div>
        <div className="text-sm text-gray-500">{duration}</div>
      </div>
    </div>
  );
};
