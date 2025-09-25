"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import React, { useState } from "react";
import { QuickActionModal } from "./quick-actions-modal";
import { AddServiceForm } from "./add-service-form";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const AddNewService = ({ className }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handlClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        className={cn(
          "w-full border flex justify-start  hover:bg-brand-accent/10 text-black",
          className
        )}
      >
        <Plus className="shrink-0 size-6" /> <span>Add New Service</span>
      </Button>
      <QuickActionModal
        title="Add Service"
        description="Add new service to offer"
        onOpenChange={setOpen}
        open={open}
      >
        <AddServiceForm onClose={handlClose} />
      </QuickActionModal>
    </>
  );
};
