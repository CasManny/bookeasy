import React from "react";
// import { ServiceCard } from "./service-card";
import { DateSelector } from "./date-selector";

interface Props {
  closeModal: () => void;
}

export const RescheduleDialog = ({  closeModal }: Props) => {
  return (
    <div className="flex">
      <div className="basis-1/3">
        {/* <ServiceCard
          duration="duration"
          service="service"
          tag="Tag"
          price={232}
          showButton={false}
          description="Descripiton"
        /> */}
      </div>
      <DateSelector reschedule={true} onClose={closeModal} />
    </div>
  );
};
