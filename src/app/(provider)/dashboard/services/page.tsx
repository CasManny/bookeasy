"use client";
import { ManageHeader } from "@/features/provider/ui/components/manage-header";
import { ManageServiceView } from "@/features/provider/ui/views/manage-service-view";

const ServicesPage = () => {
  return (
    <>
      <ManageHeader />
      <ManageServiceView />
    </>
  );
};

export default ServicesPage;
