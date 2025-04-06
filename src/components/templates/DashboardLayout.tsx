// import { Link } from "wouter"
import { DashboardHeader } from "../views/dashboard/DashboardHeader"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./AppSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
       <SidebarInset>
        <DashboardHeader />
        {children}
       </SidebarInset>
    </SidebarProvider>
  )
}
