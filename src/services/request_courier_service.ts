import { RequestCourierTypes } from "@/lib/types/types";

export namespace RequestCourierService {
  export const fetchCourierData = (): RequestCourierTypes.Task[] => {
    const statusList = ["Pendiente", "En curso", "Terminados"];
    return Array.from({ length: 6 }).map((_, i) => {
      const randomStatus =
        statusList[Math.floor(Math.random() * statusList.length)];

      return {
        id: `REQ-0102${i}`,
        name: "Martinez Isla, Jose Luis",
        start: {
          address: "Av. Mendiburu 1236",
          ubication: "San Miguel",
        },
        end: {
          address: "Av. Mendiburu 1236",
          ubication: "SMP",
        },
        time: "11:35 PM, 06 Jul 2025",
        status: randomStatus,
        address: ["SMP", "San Miguel"],
        modal_data: {
          distance: "14 Km",
          cost: 24.0,
          ppto: 993203,
          points: [
            {
              label: "Inicio",
              address: "Av. Mendiburu 1236",
              ubication: "Miraflores",
              status: randomStatus,
              items: [
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
              status: randomStatus,
              items: [
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
              status: randomStatus,
              items: [
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
          selected_driver: "Juan",
        },
      };
    });
  };
}
