import GenericSelect from "@/components/templates/generics/GenericSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GoogleMapViewerTypes,
  SelectTypes,
  TaskBoardTypes,
  TrackingTypes,
} from "@/lib/types/types";
import { IoCarOutline, IoSearchSharp } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { TrackingDataService } from "@/services/tracking_data_service";
import { useEffect, useMemo, useState } from "react";
import { RxPlus } from "react-icons/rx";
import { Separator } from "@/components/ui/separator";
import { AppGoogleMapViewer } from "@/components/templates/AppGoogleMapViewer";
import { LuMinimize2 } from "react-icons/lu";
import { PolylineService } from "@/services/tracking/polyline_service";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import { IoIosCheckmark, IoIosInformationCircleOutline } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import { PiMapPinFill } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { ModalDialog } from "@/components/templates/AppDialog";
import { DriverModal } from "./DriversManagement";

export default function Tracking() {
  const center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  const zoom = 16;
  const markers = useMemo<GoogleMapViewerTypes.MarkerData[]>(
    () => [
      {
        driverId: 1,
        position: { lat: -12.0464, lng: -77.0428 },
        popupText: "DC", // Iniciales del Conductor
        status: "Terminados",
        mode: "Taxi",
      },
      {
        driverId: 2,
        position: { lat: -12.05, lng: -77.03 },
        popupText: "AB",
        status: "En curso",
        mode: "Taxi express",
      },
      {
        driverId: 3,
        position: { lat: -12.05, lng: -77.04 },
        popupText: "ED",
        status: "Pendiente",
        mode: "Courier",
      },
    ],
    []
  );

  const transporte: SelectTypes.SelectData[] = [
    {
      label: "Taxi",
      value: "Taxi",
    },
    {
      label: "Taxi express",
      value: "Taxi express",
    },
    {
      label: "Courier",
      value: "Courier",
    },
  ];

  const estado: SelectTypes.SelectData[] = [
    {
      label: "Inactivo",
      value: "Inactivo",
    },
    {
      label: "Activo",
      value: "Activo",
    },
  ];

  const [results, setResults] = useState<TrackingTypes.SearchData[] | null>(
    null
  );
  const [selectedMarker, setSelectedMarker] =
    useState<GoogleMapViewerTypes.MarkerData | null>(null);

  // const [polyline, setPolyline] = useState<{ lat: number; lng: number }[]>([]);

  const [filterView, setFilterView] = useState<boolean>(true);
  const [checkedItems, setCheckedItems] = useState<Record<any, boolean>>({});
  const { handleSubmit, control } = useForm<TrackingTypes.TrackingForm>({
    defaultValues: {
      estado: "",
      tipo_transporte: [],
      conductor: "",
    },
  });

  // Marcar todos
  const checkAll = () => {
    const allChecked: Record<string, boolean> = {};
    results?.forEach((item) => {
      allChecked[item.id] = true;
    });
    setCheckedItems(allChecked);
  };

  // Desmarcar todos
  const uncheckAll = () => {
    const noneChecked: Record<string, boolean> = {};
    results?.forEach((item) => {
      noneChecked[item.id] = false;
    });
    setCheckedItems(noneChecked);
  };

  // Manejo individual
  const toggleCheck = (key: any, value: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (data: TrackingTypes.TrackingForm) => {
    console.log("Form Data:", data);
    setResults(TrackingDataService.fetchFormSearch(data));
    // Ejecuta tu lógica de búsqueda aquí
  };

  const visibleMarkers = useMemo(
    () => markers.filter((m) => checkedItems[m.driverId]),
    [markers, checkedItems]
  );

  useEffect(() => {
    // Reinicia los checkbox del Card
    const init: Record<string, boolean> = {};
    results?.forEach((item) => (init[item.id] = true));
    setCheckedItems(init);
  }, [results]);

  // useEffect(() => {
  //   const fetchPolyline = async () => {
  //     if (markers.length < 2) {
  //       setPolyline([]);
  //       return;
  //     }

  //     const positions = markers.map((m) => m.position);
  //     const result = await PolylineService.fetchPolylineVector(positions);

  //     if (
  //       !result.success ||
  //       !result.response?.routes?.[0]?.geometry?.coordinates
  //     ) {
  //       setPolyline([]);
  //       return;
  //     }

  //     const coords = result.response.routes[0].geometry.coordinates;
  //     const formatted: { lat: number; lng: number }[] = coords.map(
  //       ([lng, lat]: [lng: number, lat: number]) => ({ lat, lng })
  //     );
  //     setPolyline(formatted);
  //   };

  //   void fetchPolyline();
  // }, [markers]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col h-full w-full relative z-50">
        {filterView && (
          <div className="flex flex-col flex-wrap gap-5 bg-white dark:bg-[#1D1B20] rounded-xl shadow-material p-4">
            <div className="flex flex-row justify-between">
              <Label>Filtros</Label>
              <Button
                variant={"ghost"}
                onClick={() => {
                  setFilterView(false);
                }}
              >
                <LuMinimize2 />
              </Button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-row flex-wrap items-end justify-between gap-2"
            >
              <div className="flex flex-row flex-wrap gap-4 grow">
                <Controller
                  control={control}
                  name="estado"
                  render={({ field }) => (
                    <GenericSelect
                      label="Estado"
                      data={estado}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder=""
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="tipo_transporte"
                  render={({ field }) => (
                    <SearchSelect
                      label="Tipo de transporte"
                      className="w-[180px]"
                      options={transporte}
                      value={field.value}
                      variant={"basic"}
                      onChange={field.onChange}
                      placeholder=""
                      isMulti
                    />
                  )}
                />
                <div className="flex flex-col gap-1 min-w-[18rem] grow">
                  <Label htmlFor="conductor" className="px-1">
                    Conductor
                  </Label>
                  <Controller
                    control={control}
                    name="conductor"
                    render={({ field }) => (
                      <Input
                        className="border-gray-500"
                        id="conductor"
                        type="text"
                        placeholder="Buscar conductor"
                        icon={<IoSearchSharp />}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <Button variant={"circular_fab_main"}>
                <IoSearchSharp /> Buscar
              </Button>
            </form>
            {results && (
              <>
                <Separator className="bg-neutral-500"></Separator>
                <div className="flex w-full gap-2">
                  <Button variant={"circular_fab_main"} onClick={checkAll}>
                    <IoIosCheckmark className="scale-150" />
                    Marcar todos
                  </Button>
                  <Button variant={"circular_fab_main"} onClick={uncheckAll}>
                    <RxPlus />
                    Desmarcar todos
                  </Button>
                </div>
                <div className="grid pb-2 gap-4 w-full">
                  <div className="flex pb-4 gap-4 overflow-x-auto">
                    {results.map((item: TrackingTypes.SearchData) => (
                      <SearchCard
                        key={item.id}
                        item={item}
                        checked={checkedItems[item.id] ?? true}
                        onCheckedChange={(val) => toggleCheck(item.id, val)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        <AppGoogleMapViewer
          center={center}
          zoom={zoom}
          markers={visibleMarkers}
          onMarkerClick={(marker: GoogleMapViewerTypes.MarkerData) => {
            console.log("Marker clickeado en el padre:", marker);
            setSelectedMarker(marker);
          }}
          // polyline={polyline}
        />
        <ModalDialog
          trigger={null}
          open={!!selectedMarker}
          exitButton={false}
          onOpenChange={(o) => {
            if (!o) setSelectedMarker(null);
          }}
        >
          {() => <DriverDetailModal data={selectedMarker} />}
        </ModalDialog>
      </div>
    </div>
  );
}

function SearchCard({
  item,
  checked,
  onCheckedChange,
}: TrackingTypes.TrackingCardProps) {
  const color: Record<TrackingTypes.TrackingDriverStatus, string> = {
    Atendiendo: "#F2B8B5",
    Disponible: "#14AE5C",
  };

  return (
    <div className="min-w-[328px] w-[328px] grid grid-cols-[auto_1fr_auto] bg-lucky px-4 py-3 rounded-2xl gap-4">
      <div
        className={cn("w-2 h-auto rounded-xl", `bg-[${color[item.estado]}]`)}
      ></div>
      <ul className="[&_li]:flex [&_li]:items-center [&_li]:gap-2">
        <li>
          <FaRegUser />
          <span className="font-semibold text-xl">{item.user}</span>
        </li>
        <li>
          <IoCarOutline />
          <span className="text-sm">{item.tipo_transporte.join(", ")}</span>
        </li>
        <li>
          <HiOutlinePhone />
          <span className="text-sm">{item.telefono}</span>
        </li>
        <li>
          <PiMapPinFill fill={color[item.estado]} />
          <span className="text-sm">{item.estado_info}</span>
        </li>
      </ul>
      <div className="flex flex-col items-center justify-between">
        <div>
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckedChange}
          ></Checkbox>
        </div>
        <ModalDialog
          customStyles="sm:max-w-none p-3"
          exitButton={false}
          trigger={
            <Button
              variant={"ghost"}
              className="hover:bg-transparent !p-0 h-6 w-6"
            >
              <IoIosInformationCircleOutline className="scale-125" />
            </Button>
          }
        >
          {({ close }) => (
            <DriverModal
              data={item.driver_info}
              close={close}
              mode={"UPDATE"}
              readonly
            />
          )}
        </ModalDialog>
      </div>
    </div>
  );
}

function DriverDetailModal({ data }: TrackingTypes.DriverDetailProps) {
  return <h1>dd</h1>;
}
