import React from "react";
import { providerservices } from "../../data";
import { ServiceCard } from "../components";

export const ManageServiceView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {providerservices.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          price={service.price}
          duration={service.duration}
          tag={service.tag}
        />
      ))}
    </div>
  );
};
