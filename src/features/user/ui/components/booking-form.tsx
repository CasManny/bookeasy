import React from "react";
import { ServiceCard } from "./service-card";
import { DateSelector } from "./date-selector";

interface Props {
  service: string;
  tag: string;
  price: number;
  description: string;
  time: string;
  closeModal: () => void;
}

export const BookingForm = ({
  service,
  tag,
  description,
  time,
  price,
  closeModal,
}: Props) => {
  return (
    <div className="flex gap-5 lg:flex-row flex-col">
      <div className="lg:basis-1/2">
        <ServiceCard
          showButton={false}
          duration={time}
          price={price}
          service={service}
          tag={tag}
          description={description}
        />
      </div>
      <DateSelector onClose={closeModal} />
    </div>
  );
};
