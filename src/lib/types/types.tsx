import { ModalDialog } from "@/components/templates/AppDialog";
import { Button } from "@/components/ui/button";
import { ColumnDef, Table } from "@tanstack/react-table";
import { LucideIcon, Pencil } from "lucide-react";

export namespace DataTableTypes {
  export interface props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    actions: TableActions[];
  }

  export interface paginationProps<TData> {
    table: Table<TData>;
  }

  export type TableActions = "ADD" | "DOWNLOAD";
}

export namespace ModalDialogTypes {
  export interface props {
    trigger: React.ReactNode; // HTML(XML) que desencadena el mostrar dialogo
    children: React.ReactNode; // Contenido HTML(XML) del dialogo
  }
}

export namespace NavigationTypes {
  export interface NavInfoData {
    title: string;
    url: string;
    icon: LucideIcon;
    count?: string;
  }
}

export namespace DriversManagementTypes {}

export namespace DriverStatusTypes {}

export namespace RequestReceptionTypes {
  // export interface AdminTable {
  //   editable: boolean;
  //   requirement: string;
  //   user: number;
  //   start_point: string;
  //   destiny_point: string;
  //   ppto: string;
  //   kind: string;
  // }

  export interface Payment {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
  }

  export const columns: ColumnDef<Payment>[] = [
    {
      id: "actions",
      header: "Opción",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <ModalDialog
            trigger={
              <Button
                variant="semicircular_fab"
                size="icon"
                onClick={() => {
                  console.log("Editar", data);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            }
          >
            {Object.values(data).join(" | ")}
          </ModalDialog>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "status",
      header: "Estado",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "amount",
      header: () => <div>Total</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("es-PE", {
          style: "currency",
          currency: "SOL",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
  ];
}

export namespace TripHistoryTypes {}

export namespace TripPlanningTypes {}

export namespace UserManagementTypes {}
