import React, { PropsWithChildren } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/provider/ui/components";
import { DashboardNavbar } from "@/features/provider/ui/components/navbar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Head from "next/head";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect('/login')
  
  const title = session.user.name


  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="flex flex-col gap-5 min-h-screen w-screen bg-muted">
          <DashboardNavbar />
          <div className="px-5 flex-1">{children}</div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
