"use client";

import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Briefcase, CalendarCheck2, CalendarClock, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Manage Services",
    url: "/dashboard/services",
    icon: Briefcase,
  },
  {
    title: "Availability",
    url: "/dashboard/availability",
    icon: CalendarClock,
  },
  {
    title: "Bookings",
    url: "/dashboard/bookings",
    icon: CalendarCheck2,
  },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <div className="px-4 py-2">
        <SidebarSeparator className="opacity-10 text-[#5D6B68]" />
      </div>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarGroup>
            <SidebarMenu className="space-y-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "py-8",
                      pathname === item.url && "!bg-brand-blue !text-white"
                    )}
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon className="!size-8" />
                      <span className="text-xl font-medium tracking-tight">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
};
