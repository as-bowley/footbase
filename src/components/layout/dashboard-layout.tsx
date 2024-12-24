import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import React from "react";
import { HeaderBar } from "@/components/layout/header-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-full">
        <HeaderBar />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
