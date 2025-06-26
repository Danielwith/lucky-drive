import { TripHistoryTypes } from "@/lib/types/types";

export const fetchTripHistoryData = (): TripHistoryTypes.Trip[] => {
  const TRIP_HISTORY_DATA: TripHistoryTypes.Trip[] = [
    {
      id: "REQ-012568",
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "En curso",
      monto: "S/25.00",
      sobretiempo: "S/25.00",
    },
    {
      id: "REQ-012568",
      usuario: "prueba",
      cargo: "Comercial",
      contacto: "930558877",
      estado: "En curso",
      monto: "S/25.00",
      sobretiempo: "S/25.00",
    },
  ];

  return TRIP_HISTORY_DATA;
  //   const response = await fetch('/api/navigation');
  //   if (!response.ok) throw new Error('Error fetching NAV_DATA');
  //   return response.json();
};
