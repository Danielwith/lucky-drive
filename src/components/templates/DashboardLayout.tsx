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
      <div className="flex grow md:grid md:grid-cols-[auto_minmax(0,1fr)] bg-neutral-400/20 backdrop-blur-xs md:my-3 md:mx-5 pr-2 rounded-xl relative w-screen h-screen md:h-[calc(100dvh-1.5rem)]">
        <AppSidebar variant="inset" />
        <SidebarInset className="bg-dark-blur overflow-auto">
          <DashboardHeader />
          <div className="overflow-auto w-full h-full md:rounded-xl rounded-b-xl">
            {staticChildren.current}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
