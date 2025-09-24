import { Container } from "@/components/container";
import { services } from "../../data";
import { ServiceCard } from "../components";

export const ServiceViews = () => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </Container>
  );
};
