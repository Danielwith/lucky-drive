import { TrackingTypes } from "@/lib/types/types";
export namespace TrackingDataService {
  export const fetchFormSearch = (
    formRequest: TrackingTypes.TrackingForm
  ): TrackingTypes.SearchData[] => {
    console.log(formRequest);
    return [
      {
        user: "Juan Pérez",
        placa: "ABC-123",
        telefono: "+51 987654321",
        destino: { from: 1, to: 5 },
        paradas: [
          {
            numero: 3,
            nombre: "Parada Central",
            estado: "Terminados",
            info: {
              observacion: "Conductor puntual y sin incidencias",
              fotos: [
                "https://placehold.co/600x400",
                "https://placehold.co/600",
                "https://placehold.co/600",
                "https://placehold.co/600",
              ],
            },
          },
          {
            numero: 4,
            nombre: "Parada Norte",
            estado: "Pendiente",
            info: {
              observacion: "Retraso por obras en la vía",
              fotos: [],
            },
          },
        ],
      },
      {
        user: "María García",
        placa: "XYZ-789",
        telefono: "+51 912345678",
        destino: { from: 2, to: 6 },
        paradas: [
          {
            numero: 2,
            nombre: "Estación Norte",
            estado: "Pendiente",
            info: {
              observacion: "Pasajeros bajaron en destino alternativo",
              fotos: ["https://placehold.co/600x400"],
            },
          },
        ],
      },
      {
        user: "Carlos Ruiz",
        placa: "LMN-456",
        telefono: "+51 998877665",
        destino: { from: 3, to: 8 },
        paradas: [
          {
            numero: 4,
            nombre: "Terminal Sur",
            estado: "Pendiente",
            info: {
              observacion: "Entrega completada exitosamente",
              fotos: [
                "https://placehold.co/600x400",
                "https://placehold.co/600x400",
              ],
            },
          },
        ],
      },
    ];
  };
}
