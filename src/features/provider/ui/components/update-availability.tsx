"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { QuickActionModal } from "./quick-actions-modal";
import { UpdateAvailabilityForm } from "./updata-availability-form";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const UpdateAvailability = ({ className }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handlClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant={"cta"} onClick={handleOpen} className={cn(className)}>
        <Calendar className="shrink-0 size-6" />{" "}
        <span>Update Availability</span>
      </Button>
      <QuickActionModal
        title="Update availability"
        description="Update service avaiability"
        onOpenChange={setOpen}
        open={open}
        className="!max-w-lg"
      >
        <UpdateAvailabilityForm onClose={handlClose} />
      </QuickActionModal>
    </>
  );
};
