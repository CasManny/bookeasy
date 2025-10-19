"use client";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, Trash } from "lucide-react";
import React, { useState } from "react";
import { QuickActionModal } from "./quick-actions-modal";
import { AddServiceForm } from "./add-service-form";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DEFAULT_LIMIT } from "@/constants";
import { ServiceCardType } from "../../types";

interface Props {
  data: ServiceCardType
  id: string;
}

export const ManageCTA = ({
  id,
  data
}: Props) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const deleteService = useMutation(
    trpc.provider.deleteService.mutationOptions({
      onSuccess: async (data) => {
        toast.success(data.message);
        await queryClient.invalidateQueries(
          trpc.provider.getAllServices.infiniteQueryOptions({
            limit: DEFAULT_LIMIT,
          })
        );
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );
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
    deleteService.mutate({ id });
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
        <AddServiceForm initialValue={data} onClose={handlClose} />
      </QuickActionModal>
    </>
  );
};
