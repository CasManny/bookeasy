import React from "react";
import { ServiceCard } from "./service-card";
import { DateSelector } from "./date-selector";
import { ServicesType } from "../../types";

interface Props {
  data: ServicesType;
  closeModal: () => void;
}

export const BookingForm = ({
  data,
  closeModal,
}: Props) => {
  return (
    <div className="flex gap-5 lg:flex-row flex-col">
      <div className="lg:basis-1/2">
        <ServiceCard
          showButton={false}
          data={data}
          
        />
      </div>
      <DateSelector onClose={closeModal} />
    </div>
  );
};
