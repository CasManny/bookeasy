import { Header } from "@/features/user/ui/components";
import { ServiceViews } from "@/features/user/ui/views/services-view";

const ServicesPage = () => {
  return (
    <div className="">
      <Header
        title="Professional Services"
        description="Book appointments with trusted professionals. choose from our wide range
        of services and find the perfect time that works for you"
      />
      <ServiceViews />
    </div>
  );
};

export default ServicesPage;
