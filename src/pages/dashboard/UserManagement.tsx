import { DataTable } from "@/components/templates/AppDataTable";
import { DataTableTypes, UserManagementTypes } from "@/lib/types/types";
import { fetchUserManagementData } from "@/services/user_management_data_service";

export default function UserManagement() {
  const data = fetchUserManagementData();
  const tableActions: DataTableTypes.TableActions[] = ["SEPARATOR", "DOWNLOAD"];
  console.log("PRODUCCION?: ", import.meta.env.PROD);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  console.log("PRUEBA: ", __ENV__);
  return (
    <div className="container h-full max-w-full">
      <DataTable
        columns={UserManagementTypes.columns}
        data={data}
        actions={tableActions}
        sheetname="LISTA_USUARIOS"
      />
    </div>
  );
}
