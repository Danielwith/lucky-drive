import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "../views/sidebar/NavMain";
import { useNavStore } from "@/lib/store/nav_store";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const NAV_DATA = useNavStore((state) => state.navData);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-auto text-primary"
            >
              <a href="#">
                <Avatar>
                  <AvatarImage src="assets/images/user.png" />
                  <AvatarFallback>AVATAR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">Oscar Hurtado</p>
                  <span className="text-xs font-medium">Administrador</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NAV_DATA} />
        <Separator className="data-[orientation=horizontal]:w-[85%] mx-auto mb-2" />
        <div className="px-6">
          <Button
            className="bg-zinc-700 border-0 text-violet-300"
            variant="circular_fab"
            size="icon"
          >
            <Settings />
          </Button>
        </div>
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" />  */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
