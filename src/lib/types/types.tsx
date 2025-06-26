import { MapContainerProps } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { ModalDialog } from "@/components/templates/AppDialog";
import { Button } from "@/components/ui/button";
import { ColumnDef, Table } from "@tanstack/react-table";
import { LucideIcon, Pencil } from "lucide-react";
import { DateRange } from "react-day-picker";
import { IconType } from "react-icons/lib";
import { ReactNode } from "react";

export namespace DataTableTypes {
  export interface props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    actions: TableActions[];
    customFilters?: (table: Table<TData>) => ReactNode;
    sheetname?: string;
  }

  export interface paginationProps<TData> {
    table: Table<TData>;
  }

  export type SeparatorLevel = "low" | "mid" | "high";

  export type TableActions = "ADD" | "DOWNLOAD" | "SEPARATOR";
}

export namespace TaskBoardTypes {
  export interface props {
    cards: BoardCard[];
    tasks: BoardItemContent[];
  }

  // DEFAULT, no es dinamico
  export interface form {
    driverInfo: string;
  }

  export interface BoardCard {
    status: string;
    color: string;
  }

  export interface BoardItemContent {
    statusParent: string;
    /* ITEM HIJO */
    renderXml: () => ReactNode;
  }

  type TaskContentProps = {
    task_label: string;
    task_data_1: string | number;
    task_data_2: string | number;
    between?: boolean;
    Icon: IconType;
  };

  export function TaskContentDefault({
    task_label,
    task_data_1,
    task_data_2,
    between = true,
    Icon,
  }: TaskContentProps) {
    return (
      <div
        className={`flex items-center ${
          between ? "justify-between" : ""
        } gap-2`}
      >
        <div className="flex items-center">
          <Icon className="w-3 h-3 mr-1"></Icon>
          {/* <PiMapPinFill className="w-3 h-3 mr-1" /> */}
          <span className="text-neutral-400">{task_label}:&nbsp;</span>
          {task_data_1}
        </div>
        <div>
          <span className="capitalize font-bold">{task_data_2}</span>
        </div>
      </div>
    );
  }

  export function AddressTags({ address }: { address: string[] }) {
    const maxTags = 3;
    const filledTags = address;
    const emptyTags = Array.from({ length: maxTags - filledTags.length });

    return (
      <div className="flex gap-2">
        {filledTags.map((tag, i) => (
          <span
            key={`filled-${i}`}
            className="bg-[#D0BCFF] text-[#4A4458] text-xs px-2 py-1 rounded grow font-bold content-center"
          >
            {tag}
          </span>
        ))}
        {emptyTags.map((_, i) => (
          <span
            key={`empty-${i}`}
            className="bg-[#EFB8C8] text-[#4A4458] text-xs px-2 py-1 rounded grow font-bold content-center"
          >
            -
          </span>
        ))}
      </div>
    );
  }
}

export namespace SelectTypes {
  export type GenericSelectProps = {
    label?: string;
    placeholder?: string;
    data: SelectData[];
    onChange?: (value: string) => void;
    value?: string;
  };

  export interface SelectData {
    label: string;
    value: string;
  }
}

export namespace MapViewerTypes {
  export interface MarkerData {
    lat: number;
    lng: number;
    popupText?: string;
  }

  export interface MapViewerProps {
    center?: LatLngExpression;
    zoom?: number;
    markers?: MarkerData[];
    /** Puedes extender con cualquier otra prop de MapContainerProps */
    mapProps?: Partial<Omit<MapContainerProps, "center" | "zoom">>;
  }
}

export namespace ModalDialogTypes {
  export interface props {
    trigger: React.ReactNode; // HTML(XML) que desencadena el mostrar dialogo
    children: React.ReactNode; // Contenido HTML(XML) del dialogo
    exitButton?: boolean; // Boton X de salir
    customStyles?: string;
  }
}

export namespace NavigationTypes {
  export interface NavInfoData {
    title: string;
    url: string;
    icon: LucideIcon | IconType;
    count?: string;
  }
}

export namespace DriversManagementTypes {}

export namespace RequestTaxiTypes {
  export interface Point {
    label: string;
    address: string;
    ubication: string;
    status: string;
  }

  export interface ModalData {
    distance: string;
    cost: number;
    ppto: number;
    points: Point[];
    selected_driver?: string;
  }

  export interface Task {
    id: string;
    name: string;
    start: {
      address: string;
      ubication: string;
    };
    end?: {
      address: string;
      ubication: string;
    };
    time: string;
    status: string;
    address: string[];
    modal_data: ModalData;
  }
}

export namespace RequestCourierTypes {
  export interface Item {
    label: string;
    status: string;
    weight: string;
    instruction: string;
  }

  export interface Point {
    label: string;
    address: string;
    ubication: string;
    items: Item[];
    completed: number;
  }

  export interface ModalData {
    distance: string;
    cost: number;
    ppto: number;
    points: Point[];
    selected_driver?: string;
  }

  export interface Task {
    id: string;
    name: string;
    start: {
      address: string;
      ubication: string;
    };
    end?: {
      address: string;
      ubication: string;
    };
    time: string;
    status: string;
    address: string[];
    modal_data: ModalData;
  }
}

export namespace RequestTaxiExpressTypes {
  export interface Item {
    label: string;
    status: string;
  }

  export interface Point {
    label: string;
    address: string;
    ubication: string;
    items?: Item[];
    completed?: number;
  }

  export interface ModalData {
    distance: string;
    cost: number;
    ppto: number;
    points: Point[];
    selected_driver?: string;
  }

  export interface Task {
    id: string;
    name: string;
    start: {
      address: string;
      ubication: string;
    };
    end?: {
      address: string;
      ubication: string;
    };
    time: string;
    status: string;
    address: string[];
    modal_data: ModalData;
  }
}

export namespace TripHistoryTypes {
  export type TripStatus = "En curso" | "Sin asignar" | "Terminado";

  export interface Trip {
    id: string;
    usuario: string;
    cargo: string;
    contacto: string;
    estado: TripStatus;
    monto: string;
    sobretiempo: string;
  }

  export const columns: ColumnDef<Trip>[] = [
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
      accessorKey: "usuario",
      header: "Usuario",
    },
    {
      accessorKey: "cargo",
      header: "Cargo",
    },
    {
      accessorKey: "contacto",
      header: "Contacto",
    },
    {
      accessorKey: "estado",
      header: "Estado",
    },
    {
      accessorKey: "monto",
      header: "Monto",
    },
    {
      accessorKey: "sobretiempo",
      header: "Sobretiempo",
    },
  ];
}

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

export namespace TrackingTypes {
  export interface TrackingForm {
    dateRange: DateRange | undefined;
    transporte: string;
    conductor: string;
  }

  export interface SearchData {
    user: string;
    placa: string;
    telefono: string;
    destino: {
      from: number;
      to: number;
    };
    paradas: ParadaData[];
  }

  export interface ParadaData {
    numero: number;
    nombre: string;
    estado: number;
    info: ParadaInfoData;
  }

  export interface ParadaInfoData {
    observacion: string;
    fotos: string[];
  }
}

export namespace SearchSelectTypes {
  export type Option = {
    label: string;
    value: string;
  };

  export type props = {
    options: Option[];
    placeholder?: string;
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
    isDisabled?: boolean;
    autoSelectFirst?: boolean;
  };
}
