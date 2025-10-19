"use client";
import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import { QuickActionModal } from "./quick-actions-modal";
import { useState } from "react";
import { AddCategoryForm } from "./add-category-form";

export const AddCategory = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handlClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant={"cta"} onClick={handleOpen}>
        <PackagePlus className="shrink-0 size-6" />{" "}
        <span>Add New Category</span>
      </Button>

      <QuickActionModal
        title="Add Service"
        description="Add new service to offer"
        onOpenChange={setOpen}
        open={open}
        className="!max-w-lg"
      >
        <AddCategoryForm onClose={handlClose} />
      </QuickActionModal>
    </>
  );
};
