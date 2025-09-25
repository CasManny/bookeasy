import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface QuickActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={cn("max-w-lg", className)}>
        <AlertDialogHeader>
          <AlertDialogTitle className="sr-only">{title}</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4">{children}</div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
