"use client";
import React, { useState } from "react";
import { Logo } from "@/components/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Home, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-client";

const navLinks = [
  { name: "Services", icon: Home, href: "/services" },
  { name: "My Bookings", icon: Calendar, href: "/my-bookings" },
];

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut();
    router.replace("/");
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="!w-8 !h-8" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 p-5">
        <ul className="flex flex-col space-y-4 mt-15">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors",
                  isActive && "bg-brand-blue text-white font-bold"
                )}
                onClick={() => setOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <Button
            variant="ghost"
            className="flex items-center space-x-2 mt-4"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </ul>
      </SheetContent>
    </Sheet>
  );
};
