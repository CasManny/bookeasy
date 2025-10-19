"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipButtonProps {
  label: string; // Text to show in the tooltip
  children: React.ReactNode; // Typically a button
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({
  label,
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side="top" align="center">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
