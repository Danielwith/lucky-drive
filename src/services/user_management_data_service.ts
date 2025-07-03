import { UserManagementTypes } from "@/lib/types/types";

export const fetchUserManagementData = (): UserManagementTypes.User[] => {
  const USER_MANAGEMENT_DATA: UserManagementTypes.User[] = [
    {
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "En COLP",
    },
    {
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "En ruta",
    },
    {
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "Ausente",
    },
  ];

  return USER_MANAGEMENT_DATA;
  //   const response = await fetch('/api/navigation');
  //   if (!response.ok) throw new Error('Error fetching NAV_DATA');
  //   return response.json();
};
