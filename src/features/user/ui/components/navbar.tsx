"use client";
import { Logo } from "@/components/logo";
import React from "react";
import { LogOut, Calendar, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navLinks = [
  {
    name: "Services",
    icon: Home,
    href: "/services",
  },
  {
    name: "My Bookings",
    icon: Calendar,
    href: "/my-bookings",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="p-5 w-full sticky top-0 bg-white z-50 flex items-center justify-between shadow-sm">
      <Logo />
      <ul className="md:flex space-x-6 items-center hidden">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={cn(
                "flex items-center space-x-2 p-2 text-gray-700",
                isActive &&
                  "bg-brand-blue duration-300 transition-colors  rounded-lg text-white font-bold"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
        <Button variant={"ghost"}>
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </ul>
    </nav>
  );
};
