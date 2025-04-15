// import { Link } from "wouter"
import { DashboardHeader } from "../views/dashboard/DashboardHeader";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useRef } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const staticChildren = useRef(children);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <DashboardHeader />
        {staticChildren.current}
      </SidebarInset>
    </SidebarProvider>
  );
}
