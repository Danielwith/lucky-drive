import { RequestTaxiExpressTypes } from "@/lib/types/types";

export namespace RequestTaxiExpressDataService {
  export const fetchTaxiExpressData = (): RequestTaxiExpressTypes.Task[] => {
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
            label: "Ini Express",
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
              address: "COLP",
              ubication: "La Victoria",
            },
            {
              label: "1",
              address: "Av. Mendiburu 1236",
              ubication: "Miraflores",
              amount: 24,
              items: [
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
      };
    });
  };
}
