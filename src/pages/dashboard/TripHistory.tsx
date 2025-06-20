import { DataTable } from "@/components/templates/AppDataTable";
import { DataTableTypes, RequestReceptionTypes } from "@/lib/types/types";
import { fetchReqReceptionData } from "@/services/init/req_reception_data_service";
import { twMerge } from "tailwind-merge";

export default function TripHistory() {
  const data = fetchReqReceptionData();
  const tableActions: DataTableTypes.TableActions[] = ["ADD", "DOWNLOAD"];

  return (
    <div className={twMerge("container h-full max-w-full")}>
      <DataTable
        columns={RequestReceptionTypes.columns}
        data={data}
        actions={tableActions}
      />
    </div>
  );
}
