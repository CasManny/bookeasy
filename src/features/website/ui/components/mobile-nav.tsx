"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

interface MobileNavProps {
  links: React.ReactNode;
}

export const MobileNav = ({ links }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="!w-8 !h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-6 space-y-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4">
          {/* Render passed links (wrapped in mobile-friendly layout) */}
          {typeof links === "object" ? (
            <div className="flex flex-col space-y-3">{links}</div>
          ) : (
            links
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
