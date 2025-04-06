import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "../../ui/separator"
import { useLocation } from "wouter";
import { useNavStore } from "@/lib/store/nav_store";
import { NavInfoData } from "@/lib/types/types";

export function DashboardHeader() {  
  const [location] = useLocation();
  const NAV_DATA = useNavStore((state)=> state.navData)
  const HEADER = NAV_DATA.find((e: NavInfoData)=> e.url === location.split('/')[2])?.title

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{HEADER}</h1>
      </div>
    </header>
  )
}
