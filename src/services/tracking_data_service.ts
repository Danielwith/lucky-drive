import { TrackingTypes } from "@/lib/types/types";
export namespace TrackingDataService {
  export const fetchFormSearch = (
    formRequest: TrackingTypes.TrackingForm
  ): TrackingTypes.SearchData[] => {
    console.log(formRequest);
    return [
      {
        id: 1,
        user: "Oscar Hurtado",
        tipo_transporte: ["Taxi", "Taxi express", "Courier"],
        telefono: "933166556",
        estado: "Disponible",
        estado_info: "Disponible",
        driver_info: {
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
      },
      {
        id: 2,
        user: "Diego Silva",
        tipo_transporte: ["Taxi", "Taxi express"],
        telefono: "933166556",
        estado: "Atendiendo",
        estado_info: "En Taxi express: Paradas 01/03",
        driver_info: {
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
      },
      {
        id: 3,
        user: "Oscar Hurtado",
        tipo_transporte: ["Taxi", "Taxi express", "Courier"],
        telefono: "933166556",
        estado: "Disponible",
        estado_info: "Disponible",
        driver_info: {
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
      },
      {
        id: 4,
        user: "Oscar Hurtado",
        tipo_transporte: ["Taxi", "Taxi express", "Courier"],
        telefono: "933166556",
        estado: "Disponible",
        estado_info: "Disponible",
        driver_info: {
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
      },
    ];
  };

  export const fetchMarkerDriverInfo = (
    driverId: number
  ): TrackingTypes.DriverDetail => {
    return {
      user: "Diego Silva",
      tipo_transporte: ["Taxi", "Taxi express"],
      telefono: "93061788",
      estado: "Disponible",
      estado_info: "En Taxi Express: Paradas 01/03",
      paradas: [
        {
          estado: "En curso",
          parada: "2: Makro Callao",
        },
        {
          estado: "Pendiente",
          parada: "3: Mercado Productores Sta.Anita",
        },
        {
          estado: "Pendiente",
          parada: "4: Mercado Productores Sta.Anita",
        },
        {
          estado: "Pendiente",
          parada: "5: Mercado Productores Sta.Anita",
        },
        {
          estado: "Pendiente",
          parada: "6: Mercado Productores Sta.Anita",
        },
        {
          estado: "Pendiente",
          parada: "7: Mercado Productores Sta.Anita",
        },
        {
          estado: "Pendiente",
          parada: "8: Mercado Productores Sta.Anita",
        },
        {
          estado: "Pendiente",
          parada: "3: Mercado Productores Sta.Anita",
        },
        {
          estado: "Pendiente",
          parada: "3: Mercado Productores Sta.Anita",
        },
      ],
      parada_detalle: {
        numero: 2,
        nombre: "Makro Callao",
        estado: "En curso",
        recepcionario: {
          nombre: "Diego Silva",
          documento: "47051888",
          telefono: "93061788",
        },
        observacion: "Ninguna",
        fotos: [
          "https://placehold.co/600x400/EEE/31343C",
          "https://placehold.co/600x400/EEE/31343C",
          "https://placehold.co/600x400/EEE/31343C",
        ],
      },
    };
  };
}
