"use client";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import { QuickActionModal } from "./quick-actions-modal";
import { AddServiceForm } from "./add-service-form";

interface Props {
  title: string;
  description: string;
  price: number;
  category: string;
  duration: string;
}

export const ManageCTA = ({
  title,
  description,
  price,
  category,
  duration,
}: Props) => {
  const initialValues = { title, description, price, category, duration };
  const [open, setOpen] = useState(false);
  const [DeleteServiceModal, confirmDelete] = useConfirm({
    title: "Delete Service",
    description:
      "Are you sure you want to delete this service? This action cannot be undone and all related bookings will be removed.",
  });

  const handleDelete = async () => {
    const success = await confirmDelete();
    if (!success) {
      return;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handlClose = () => {
    setOpen(false);
  };
  return (
    <>
      <DeleteServiceModal />
      <div className="flex gap-1 items-center">
        <button className="cursor-pointer" onClick={handleOpen}>
          <Edit className="" />
        </button>
        <button className="cursor-pointer" onClick={handleDelete}>
          <Trash className="text-red-500" />
        </button>
      </div>

      <QuickActionModal
        title="Add Service"
        description="Add new service to offer"
        onOpenChange={setOpen}
        open={open}
      >
        <AddServiceForm initialValue={initialValues} onClose={handlClose} />
      </QuickActionModal>
    </>
  );
};
