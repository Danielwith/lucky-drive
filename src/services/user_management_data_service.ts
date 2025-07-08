import { UserManagementTypes } from "@/lib/types/types";

export const fetchUserManagementData = (): UserManagementTypes.User[] => {
  const USER_MANAGEMENT_DATA: UserManagementTypes.User[] = [
    {
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      correo: "ohurtado@xplora.net",
      estado: "Habilitado",
    },
    {
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      correo: "ohurtado@xplora.net",
      estado: "Habilitado",
    },
    {
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      correo: "ohurtado@xplora.net",
      estado: "Deshabilitado",
    },
  ];

  return USER_MANAGEMENT_DATA;
};
