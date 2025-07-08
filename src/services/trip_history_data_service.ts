import { TripHistoryTypes } from "@/lib/types/types";

export const fetchTripHistoryData = (): TripHistoryTypes.Trip[] => {
  const TRIP_HISTORY_DATA: TripHistoryTypes.Trip[] = [
    {
      id: "REQ-012568",
      usuario: "Martinez Isla, Jose Luis ",
      fecha_hora: "25/05/25 - 10:00 AM",
      monto: "S/25.00",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "Finalizado",
      modo: "Taxi",
      modal_data: {
        observation: "-",
        distance: "14 Km",
        ppto: 993203,
        points: [
          {
            label: "Inicio",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
          },
          {
            label: "1",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            amount: 24.0,
          },
          {
            label: "2",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            amount: 24.0,
          },
        ],
        finished_date: {
          start: "11:35 PM 06 jul 2025",
          end: "11:35 PM 06 jul 2025",
        },
        selected_driver: "Juan",
      },
    },
    {
      id: "REQ-012568",
      usuario: "Martinez Isla, Jose Luis ",
      fecha_hora: "25/07/25 - 10:00 AM",
      monto: "S/25.00",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "Cancelado",
      modo: "Courier",
      modal_data: {
        observation:
          "Esto es un espacio en donde se mostraría la tipificación de cancelación.",
        distance: "14 Km",
        ppto: 993203,
        points: [
          {
            label: "Inicio",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            amount: 24,
            courier_items: [
              {
                label: "Caja pequeña",
                status: "Pendiente",
                weight: "2 Kg",
                instruction:
                  "En este espacio van las instrucciones de courier ingresadas por el usuario solicitante.",
              },
            ],
            completed: 0,
          },
          {
            label: "1",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            amount: 24,
            courier_items: [
              {
                label: "Caja pequeña",
                status: "Pendiente",
                weight: "2 Kg",
                instruction:
                  "En este espacio van las instrucciones de courier ingresadas por el usuario solicitante.",
              },

              {
                label: "Caja pequeña",
                status: "Pendiente",
                weight: "2 Kg",
                instruction:
                  "En este espacio van las instrucciones de courier ingresadas por el usuario solicitante.",
              },
            ],
            completed: 1,
          },
          {
            label: "2",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            amount: 24,
            courier_items: [
              {
                label: "Caja pequeña",
                status: "Pendiente",
                weight: "2 Kg",
                instruction:
                  "En este espacio van las instrucciones de courier ingresadas por el usuario solicitante.",
              },
              {
                label: "Caja pequeña",
                status: "Pendiente",
                weight: "2 Kg",
                instruction:
                  "En este espacio van las instrucciones de courier ingresadas por el usuario solicitante.",
              },
              {
                label: "Caja pequeña",
                status: "Pendiente",
                weight: "2 Kg",
                instruction:
                  "En este espacio van las instrucciones de courier ingresadas por el usuario solicitante.",
              },
            ],
            completed: 2,
          },
        ],
        finished_date: {
          start: "11:35 PM 06 jul 2025",
          end: "11:35 PM 06 jul 2025",
        },
        selected_driver: "Juan",
      },
    },
    {
      id: "REQ-012568",
      usuario: "Martinez Isla, Jose Luis ",
      fecha_hora: "25/07/25 - 10:00 AM",
      monto: "S/25.00",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "Cancelado",
      modo: "Taxi express",
      modal_data: {
        observation:
          "Esto es un espacio en donde se mostraría la tipificación de cancelación.",
        distance: "14 Km",
        ppto: 993203,
        points: [
          {
            label: "Inicio",
            address: "COLP",
            ubication: "La Victoria",
          },
          {
            label: "1",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            amount: 24,
            taxi_express_items: [
              {
                label: "GUI-034920",
                status: "Pendiente",
              },
              {
                label: "GUI-034920",
                status: "GUI-034920",
              },
              {
                label: "Caja pequeña",
                status: "Pendiente",
              },
            ],
            completed: 2,
          },
          {
            label: "2",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            amount: 26,
          },
        ],
        finished_date: {
          start: "11:35 PM 06 jul 2025",
          end: "11:35 PM 06 jul 2025",
        },
        selected_driver: "Juan",
      },
    },
  ];

  return TRIP_HISTORY_DATA;
  //   const response = await fetch('/api/navigation');
  //   if (!response.ok) throw new Error('Error fetching NAV_DATA');
  //   return response.json();
};
