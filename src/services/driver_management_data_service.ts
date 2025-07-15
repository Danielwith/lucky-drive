import { apiFetch } from "@/lib/helpers/ApiFetch";
import { ApiFetchTypes, DriversManagementTypes } from "@/lib/types/types";

export const fetchDriverManagementData =
  (): DriversManagementTypes.Driver[] => {
    const DRIVER_MANAGEMENT_DATA: DriversManagementTypes.Driver[] = [
      {
        id: "0001",
        conductor: "Oscar Hurtado",
        servicios: "Taxi, Courier, Taxi Express",
        dni: "0123648",
        telefono: "930558877",
        modelo: "AAA",
        placa: "PE-2012",
        soat: "15451",
        soat_vigencia: "2025-07-08",
        categoria: "II-B",
        clase: "A",
        correo: "gg@gmail.com",
        licencia: "B12345678",
      },
      {
        id: "0002",
        conductor: "Oscar Hurtado",
        servicios: "Taxi, Courier, Taxi Express",
        dni: "0123648",
        telefono: "930558877",
        modelo: "AAA",
        placa: "PE-2012",
        soat: "15451",
        soat_vigencia: "2025-07-08",
        categoria: "II-B",
        clase: "A",
        correo: "gg@gmail.com",
        licencia: "B12345678",
      },
      {
        id: "0003",
        conductor: "Oscar Hurtado",
        servicios: "Taxi, Courier, Taxi Express",
        dni: "0123648",
        telefono: "930558877",
        modelo: "AAA",
        placa: "PE-2012",
        soat: "15451",
        soat_vigencia: "2025-07-08",
        categoria: "II-B",
        clase: "A",
        correo: "gg@gmail.com",
        licencia: "B12345678",
      },
    ];

    // const endpoint: ApiFetchTypes.ApiEndpoint = {
    //   controller: "/Controlador",
    //   method: "/consultar",
    // };

    return DRIVER_MANAGEMENT_DATA;
    // return apiFetch<any>(endpoint, {
    //   method: "GET",
    //   log: true,
    // });
  };
