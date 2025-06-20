import { NavigationTypes } from "@/lib/types/types";
import { PiMapPinFill } from "react-icons/pi";
import { AiOutlineClockCircle, AiOutlineUser } from "react-icons/ai";
import { MdInbox } from "react-icons/md";

export const fetchNavData = (): NavigationTypes.NavInfoData[] => {
  const NAV_DATA: NavigationTypes.NavInfoData[] = [
    {
      title: "Requerimientos Taxi",
      url: "request-taxi",
      icon: MdInbox,
    },
    {
      title: "Requerimientos Courier",
      url: "request-courier",
      icon: MdInbox,
    },
    {
      title: "Requerimientos Taxi Express",
      url: "request-taxi-express",
      icon: MdInbox,
    },
    {
      title: "Tracking",
      url: "tracking",
      icon: PiMapPinFill,
    },
    {
      title: "Historial de viajes",
      url: "trip-history",
      icon: AiOutlineClockCircle,
    },
    {
      title: "Administración de conductores",
      url: "drivers-management",
      icon: AiOutlineUser,
    },
    {
      title: "Lista de usuarios",
      url: "users-management",
      icon: AiOutlineUser,
    },
    // {
    //   title: "Programación de viajes",
    //   url: "trip-planning",
    //   icon: Heart,
    // },
    // {
    //   title: "Historial de viajes",
    //   url: "trip-history",
    //   icon: Trash2,
    // },
    // {
    //   title: "Administración de choferes",
    //   url: "drivers-management",
    //   icon: Folder,
    // },
    // {
    //   title: "Administración de usuarios",
    //   url: "users-management",
    //   icon: Folder,
    // },
  ];

  return NAV_DATA.map((e) => {
    return { ...e, count: String(Math.floor(Math.random() * 25) + 1) };
  });

  //   const response = await fetch('/api/navigation');
  //   if (!response.ok) throw new Error('Error fetching NAV_DATA');
  //   return response.json();
};
