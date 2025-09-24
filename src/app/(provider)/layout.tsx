import React, { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/provider/ui/components";
import { DashboardNavbar } from "@/features/provider/ui/components/navbar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col gap-5 min-h-screen w-screen bg-muted">
        <DashboardNavbar />
        <div className="px-5 flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
