import { NavigationTypes } from "@/lib/types/types";
import {
  Folder,
  Heart,
  Info,
  MapPin,
  SendHorizontal,
  Trash2,
} from "lucide-react";

export const fetchNavData = async (): Promise<
  NavigationTypes.NavInfoData[]
> => {
  const NAV_DATA: NavigationTypes.NavInfoData[] = [
    {
      title: "Recepción de requerimientos",
      url: "request-reception",
      icon: Info,
    },
    {
      title: "Tracking",
      url: "tracking",
      icon: MapPin,
    },
    {
      title: "Estado de choferes",
      url: "driver-status",
      icon: SendHorizontal,
    },
    {
      title: "Programación de viajes",
      url: "trip-planning",
      icon: Heart,
    },
    {
      title: "Historial de viajes",
      url: "trip-history",
      icon: Trash2,
    },
    {
      title: "Administración de choferes",
      url: "drivers-management",
      icon: Folder,
    },
    {
      title: "Administración de usuarios",
      url: "users-management",
      icon: Folder,
    },
  ];

  return NAV_DATA.map((e) => {
    return { ...e, count: String(Math.floor(Math.random() * 25) + 1) };
  });

  //   const response = await fetch('/api/navigation');
  //   if (!response.ok) throw new Error('Error fetching NAV_DATA');
  //   return response.json();
};
