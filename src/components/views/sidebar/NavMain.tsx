"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { PATH } from "@/lib/constants/route_path";
import { NavigationTypes } from "@/lib/types/types";
import { useLocation } from "wouter";

export function NavMain({ items }: { items: NavigationTypes.NavInfoData[] }) {
  const [location, push] = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className="text-primary font-medium"
            >
              <SidebarMenuButton
                tooltip={item.title}
                variant={"navitem"}
                onClick={() => {
                  push(`${PATH.DASHBOARD}/${item.url}`);
                }}
                isActive={item.url === location.split("/")[2]}
              >
                {<item.icon />}
                <span>{item.title}</span>
                <span className="ml-auto">{item.count}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
