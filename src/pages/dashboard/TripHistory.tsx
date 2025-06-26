import { DataTable } from "@/components/templates/AppDataTable";
import GenericSelect from "@/components/templates/generics/GenericSelect";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DataTableTypes,
  SelectTypes,
  TripHistoryTypes,
} from "@/lib/types/types";
import { fetchTripHistoryData } from "@/services/trip_history_data_service";
import { twMerge } from "tailwind-merge";

export default function TripHistory() {
  const data = fetchTripHistoryData();
  const tableActions: DataTableTypes.TableActions[] = ["DOWNLOAD"];
  const status: TripHistoryTypes.TripStatus[] = [
    "En curso",
    "Sin asignar",
    "Terminado",
  ];

  const select: SelectTypes.SelectData[] = status.map((e) => ({
    label: e,
    value: e,
  }));

  return (
    <div className={twMerge("container h-full max-w-full")}>
      <DataTable
        columns={TripHistoryTypes.columns}
        data={data}
        actions={tableActions}
        customFilters={(table) => (
          <>
            <GenericSelect
              placeholder="Estado"
              data={select}
              onChange={(value) => {
                table.getColumn("estado")?.setFilterValue(value);
              }}
            ></GenericSelect>
            <DatePicker
              onChange={(date) => {
                console.log(date);
                // table.getColumn("status")?.setFilterValue(date);
              }}
              label={""}
            ></DatePicker>
          </>
        )}
      />
    </div>
  );
}
