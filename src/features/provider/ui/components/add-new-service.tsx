import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export const AddNewService = () => {
  return (
    <Button variant={'cta'}>
      <Plus className="shrink-0 size-6" /> <span>Add New Service</span>
    </Button>
  );
};
