import { MapContainerProps } from "react-leaflet";
import { ModalDialog } from "@/components/templates/AppDialog";
import { Button } from "@/components/ui/button";
import { ColumnDef, FilterFn, Table } from "@tanstack/react-table";
import { LucideIcon, Pencil } from "lucide-react";
import { IconType } from "react-icons/lib";
import { ReactNode } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LatLngExpression } from "leaflet";
import { GoogleMapProps } from "react-google-map-wrapper";
import { dateEquals } from "../helpers/DataTableFilters";
import { TripDetailModal } from "@/pages/dashboard/TripHistory";
import { RiPencilFill } from "react-icons/ri";
import { DriverModal } from "@/pages/dashboard/DriversManagement";
import { SearchSelectVariant } from "@/components/templates/generics/SearchSelect";

export namespace DataTableTypes {
  export interface props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    actions: TableActions[];
    customFilters?: (table: Table<TData>) => ReactNode;
    tableFilters?: Record<string, FilterFn<TData>>;
    sheetname?: string;
  }

  export interface paginationProps<TData> {
    table: Table<TData>;
  }

  export type SeparatorLevel = "low" | "mid" | "high";

  export type TableActions = "DOWNLOAD" | "SEPARATOR";
}

export namespace TaskBoardTypes {
  export interface props {
    cards: BoardCard[];
    tasks: BoardItemContent[];
  }

  // DEFAULT, no es dinamico
  export interface form {
    driverInfo?: string;
    motivo?: string;
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
    Icon?: IconType;
  };

  export type TaskStatus = "Pendiente" | "En curso" | "Terminados";

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
          {Icon && <Icon className="w-3 h-3 mr-1"></Icon>}
          {/* <PiMapPinFill className="w-3 h-3 mr-1" /> */}
          <span className="text-neutral-400">{task_label}&nbsp;</span>
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
    value: any;
  }
}

export namespace RadioGroupTypes {
  export type RadioOption = {
    value: string;
    label: string;
  };

  export interface props {
    className?: string;
    value: string;
    data: RadioOption[];
    onChange: (value: string) => void;
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

export namespace GoogleMapViewerTypes {
  export type MarkerType = "Taxi" | "Courier" | "Taxi express";

  export interface Position {
    lng: number;
    lat: number;
  }

  export interface MarkerData {
    driverId: number;
    position: Position;
    popupText?: string;
    status: TaskBoardTypes.TaskStatus;
    mode: MarkerType;
    driverInfo: TrackingTypes.DriverDetail;
  }

  export interface MapViewerProps {
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    markers?: MarkerData[];
    /** Puedes extender con cualquier otra prop de MapContainerProps */
    mapProps?: Partial<GoogleMapProps>;
    polyline?: Position[];
    onMarkerClick?: (marker: MarkerData) => void;
  }
}

export namespace ModalDialogTypes {
  export interface props {
    trigger: React.ReactNode; // HTML(XML) que desencadena el mostrar dialogo
    children: React.ReactNode; // Contenido HTML(XML) del dialogo
    exitButton?: boolean; // Boton X de salir
    customStyles?: React.HTMLAttributes<HTMLDivElement>["className"];

    // Este sirve es que el trigger es una funcion y no un XML
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
}

export namespace ModalSheetTypes {
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

export namespace RequestTaxiTypes {
  export interface Point {
    label: string;
    address: string;
    ubication: string;
    amount?: number;
  }

  export interface FDate {
    start: string;
    end: string;
  }

  export interface ModalData {
    distance: string;
    ppto: number;
    points: Point[];
    selected_driver?: string;
    finished_date?: FDate;
  }

  export interface Address {
    label: string;
    data_1: string;
    data_2: string;
  }

  export interface Task {
    id: string;
    name: string;
    time: string;
    status: string;
    address: Address[];
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
    amount?: number;
    items: Item[];
    completed: number;
  }

  export interface FDate {
    start: string;
    end: string;
  }

  export interface ModalData {
    distance: string;
    ppto: number;
    points: Point[];
    finished_date?: FDate;
    selected_driver?: string;
  }

  export interface Address {
    label: string;
    data_1: string;
    data_2: string;
  }

  export interface Task {
    id: string;
    name: string;
    time: string;
    status: string;
    address: Address[];
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
    amount?: number;
    items?: Item[];
    completed?: number;
  }

  export interface FDate {
    start: string;
    end: string;
  }

  export interface ModalData {
    distance: string;
    ppto: number;
    points: Point[];
    finished_date?: FDate;
    selected_driver?: string;
  }

  export interface Address {
    label: string;
    data_1: string;
    data_2: string;
  }

  export interface Task {
    id: string;
    name: string;
    time: string;
    status: string;
    address: Address[];
    modal_data: ModalData;
  }
}

export namespace TripHistoryTypes {
  export type TripStatus = "Cancelado" | "Finalizado";
  export type TripMode = "Taxi" | "Courier" | "Taxi express";

  export interface Point {
    label: string;
    address: string;
    ubication: string;
    amount?: number;
    courier_items?: RequestCourierTypes.Item[];
    taxi_express_items?: RequestTaxiExpressTypes.Item[];
    completed?: number;
  }

  export interface FDate {
    start: string;
    end: string;
  }

  export interface ModalData {
    distance?: string;
    ppto: number;
    observation: string;
    points: Point[];
    selected_driver?: string;
    finished_date?: FDate;
  }

  export interface ModalProps {
    data: Trip;
    close: () => void;
  }

  export interface Trip {
    id: string;
    usuario: string;
    fecha_hora: string;
    monto: string;
    cargo: string;
    contacto: string;
    estado: TripStatus;
    modo: TripMode;
    modal_data: ModalData;
  }

  export const columns: ColumnDef<Trip>[] = [
    {
      id: "actions",
      header: "Opción",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <ModalDialog
            customStyles="bg-[#4A4458] px-2 py-3 sm:max-w-none"
            exitButton={false}
            trigger={
              <Button
                variant="semicircular_fab"
                size="icon"
                onClick={() => {
                  console.log("Editar", data);
                }}
              >
                <MdOutlineRemoveRedEye className="scale-150" />
              </Button>
            }
          >
            {({ close }) => <TripDetailModal data={data} close={close} />}
          </ModalDialog>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ID RQ",
    },
    {
      accessorKey: "usuario",
      header: "Usuario",
    },
    {
      accessorKey: "fecha_hora",
      header: "Fecha y hora",
      filterFn: dateEquals,
    },
    {
      accessorKey: "monto",
      header: "Monto",
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
  ];
}

export namespace DriversManagementTypes {
  export interface Driver {
    id: string;
    conductor: string;
    servicios: string;
    dni: string;
    telefono: string;
    correo: string;
    licencia: string;
    clase: string;
    categoria: string;
    modelo: string;
    placa: string;
    soat: string;
    soatVigencia: string;
  }

  export interface ModalProps {
    data?: Driver;
    close: () => void;
    mode: "INSERT" | "UPDATE";
    readonly?: boolean;
  }

  export interface form {
    nombreConductor?: string;
    dni?: string;
    correo?: string;
    licencia?: string;
    clase?: string;
    categoria?: string;
    telefono?: string;
    servicios?: string[];
    modeloVehiculo?: string;
    placaVehiculo?: string;
    nroSOAT?: string;
    vigenciaSOAT?: Date;
  }

  export const columns: ColumnDef<Driver>[] = [
    {
      id: "actions",
      header: "Opción",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <ModalDialog
            customStyles="sm:max-w-none p-3"
            exitButton={false}
            trigger={
              <Button variant="semicircular_fab" size="icon">
                <RiPencilFill className="scale-150" />
              </Button>
            }
          >
            {({ close }) => (
              <DriverModal data={data} close={close} mode={"UPDATE"} />
            )}
          </ModalDialog>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "conductor",
      header: "Conductor",
    },
    {
      accessorKey: "servicios",
      header: "Servicios",
    },
    {
      accessorKey: "dni",
      header: "DNI",
    },
    {
      accessorKey: "telefono",
      header: "Teléfono",
    },
    {
      accessorKey: "modelo",
      header: "Modelo de vehículo",
    },
    {
      accessorKey: "placa",
      header: "Placa de vehículo",
    },
    {
      accessorKey: "soat",
      header: "Nro. SOAT",
    },
    {
      accessorKey: "soatVigencia",
      header: "SOAT Vigencia",
      cell: ({ getValue }) => {
        const rawDate = getValue<string>(); // formato ISO
        const formattedDate = new Date(rawDate).toLocaleDateString("es-PE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        return formattedDate;
      },
    },
  ];
}

export namespace UserManagementTypes {
  export type UserStatus = "Habilitado" | "Deshabilitado";

  export interface User {
    usuario: string;
    cargo: string;
    contacto: string;
    correo: string;
    estado: UserStatus;
  }

  export const columns: ColumnDef<User>[] = [
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
      accessorKey: "correo",
      header: "Correo",
    },
    {
      accessorKey: "estado",
      header: "Estado",
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
  export interface TrackingCardProps {
    item: TrackingTypes.SearchData;
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
  }

  export interface DriverDetailProps {
    data: GoogleMapViewerTypes.MarkerData | null;
    close: () => void;
  }

  export interface TrackingForm {
    estado: string;
    tipo_transporte: string[];
    conductor: string;
  }

  export type TrackingDriverStatus = "Disponible" | "Atendiendo";
  export type TrackingMode = "Taxi" | "Courier" | "Taxi express";
  export type ParadaStatus = "En curso" | "Pendiente";

  export interface SearchData {
    id: number;
    user: string;
    estado: TrackingDriverStatus;
    tipo_transporte: TrackingMode[];
    telefono: string;
    estado_info: string;
    driver_info: DriversManagementTypes.Driver;
  }

  export interface DriverDetail {
    user: string;
    estado: TrackingDriverStatus;
    tipo_transporte: TrackingMode[];
    telefono: string;
    estado_info: string;
    paradas: ParadaListData[];
    parada_detalle: ParadaInfoData;
  }

  export interface ParadaInfoData {
    numero: number;
    nombre: string;
    estado: ParadaStatus;
    recepcionario: RecepcionarioData;
    observacion: string;
    fotos: string[];
  }

  interface RecepcionarioData {
    nombre: string;
    documento: string;
    telefono: string;
  }

  export interface ParadaListData {
    estado: ParadaStatus;
    parada: string;
  }
}

export namespace SearchSelectTypes {
  export type Option = {
    label: string;
    value: string;
  };

  export type props = {
    label: string;
    options: Option[];
    placeholder?: string;
    onChange?: (value: string | string[]) => void;
    value?: string | string[];
    className?: string;
    isDisabled?: boolean;
    autoSelectFirst?: boolean;
    icon?: React.ReactNode;
    isMulti?: boolean;
    variant?: SearchSelectVariant | null;
  };
}

export namespace ApiFetchTypes {
  export interface ApiResponse<T> {
    success: boolean;
    response?: T;
    errors?: string;
  }

  export class ApiError extends Error {
    public readonly success = false;
    public readonly errors: string;

    constructor(message: string) {
      super(message);
      this.name = "ApiError";
      this.errors = message;
    }
  }

  export interface ApiEndpoint {
    controller: string;
    method: string;
  }

  export interface ApiFetchOptions extends Omit<RequestInit, "body"> {
    params?: Record<string, string | number>;
    body?: any; // Se convierte automáticamente a JSON
    headers?: HeadersInit;
    log?: boolean;
    message?: string;
  }
}

export namespace LoginTypes {
  export interface LoginForm {
    sDocUsu: string;
    sClaUsu: string;
    sVerApp: string;
    sVerAnd: string;
    sModCel: string;
    dLatUsu: number;
    dLonUsu: number;
  }

  export interface LoginResponse {
    nRetorno: number;
    sRetorno: string;
    oUsurio: Usuario;
  }

  export interface Usuario {
    nIdUsu: number;
    sUser: string;
    sPassrword: string;
    sNombre: string;
    sCorreo: string;
    sTel: string;
    sTipDoc: string;
    bTaxi: number;
    bTaxiXpress: number;
    bCarga: number;
    bCourier: number;
    modelo_vehiculo: string;
    placa_vehiculo: string;
    nro_soat: string;
    vigencia_soat: string; // ISO date string
    fecha_registro: string; // ISO date string
    sToken: string;
    nIdUsuarioLuckyGo: number;
    bConductor: number;
  }
}

export namespace SpinnerTypes {
  export interface State {
    loading: boolean;
    message?: string;
  }
}
