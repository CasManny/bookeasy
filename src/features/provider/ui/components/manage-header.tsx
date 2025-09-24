import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export const ManageHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-brand-blue text-2xl font-bold md:text-4xl">Manage services</h1>
      <Button className="bg-brand-blue hover:brand-blue text-white font-bold">
        <Plus className="size-7" /> Add Service
      </Button>
    </div>
  );
};
