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
        time: "11:35 PM, 06 Jul 2025",
        status: randomStatus,
        address: [
          {
            label: "Ini Courier",
            data_1: "Av. Mendiburú 1236",
            data_2: "San Miguel",
          },
          {
            label: "1",
            data_1: "Av. Mendiburú 1236",
            data_2: "SMP",
          },
          {
            label: "2",
            data_1: "Av. Mendiburú 1236",
            data_2: "SMP",
          },
          {
            label: "3",
            data_1: "Av. Mendiburú 1236",
            data_2: "SMP",
          },
          {
            label: "4",
            data_1: "Av. Mendiburú 1236",
            data_2: "SMP",
          },
        ],
        modal_data: {
          distance: "14 Km",
          ppto: 993203,
          points: [
            {
              label: "Inicio",
              address: "Av. Mendiburu 1236",
              ubication: "Miraflores",
              amount: 24,
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
              amount: 24,
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
              amount: 24,
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
          finished_date: {
            start: "11:35 PM 06 jul 2025",
            end: "11:35 PM 06 jul 2025",
          },
          selected_driver: "Juan",
        },
      };
    });
  };
}
