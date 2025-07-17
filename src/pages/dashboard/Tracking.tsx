import GenericSelect from "@/components/templates/generics/GenericSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GoogleMapViewerTypes,
  SelectTypes,
  TrackingTypes,
} from "@/lib/types/types";
import {
  IoCarOutline,
  IoCloseCircleOutline,
  IoSearchSharp,
} from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { TrackingDataService } from "@/services/tracking_data_service";
import { useEffect, useMemo, useState } from "react";
import { RxPlus } from "react-icons/rx";
import { Separator } from "@/components/ui/separator";
import { AppGoogleMapViewer } from "@/components/templates/AppGoogleMapViewer";
import { LuMinimize2 } from "react-icons/lu";
// import { PolylineService } from "@/services/tracking/polyline_service";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import { IoIosCheckmark, IoIosInformationCircleOutline } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePhone } from "react-icons/hi";
import { PiMapPinFill } from "react-icons/pi";
import { ModalDialog } from "@/components/templates/AppDialog";
import { DriverModal } from "./DriversManagement";

export default function Tracking() {
  const center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  const tempDriverInfo = TrackingDataService.fetchMarkerDriverInfo(1);
  const zoom = 16;
  const markers = useMemo<GoogleMapViewerTypes.MarkerData[]>(
    () => [
      {
        driverId: 1,
        position: { lat: -12.0464, lng: -77.0428 },
        popupText: "DC", // Iniciales del Conductor
        status: "Terminados",
        mode: "Taxi",
        driverInfo: tempDriverInfo,
      },
      {
        driverId: 2,
        position: { lat: -12.05, lng: -77.03 },
        popupText: "AB",
        status: "En curso",
        mode: "Taxi express",
        driverInfo: tempDriverInfo,
      },
      {
        driverId: 3,
        position: { lat: -12.05, lng: -77.04 },
        popupText: "ED",
        status: "Pendiente",
        mode: "Courier",
        driverInfo: tempDriverInfo,
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
    setFilterView(true);
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
        <div className="flex flex-col flex-wrap gap-5 bg-white dark:bg-[#1D1B20] rounded-xl shadow-material p-4">
          <div className="flex flex-row justify-between">
            <Label>Filtros</Label>
            {results && (
              <Button
                variant={"ghost"}
                onClick={() => {
                  setFilterView(!filterView);
                }}
              >
                <LuMinimize2 />
              </Button>
            )}
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
          {results && filterView && (
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

        <AppGoogleMapViewer
          center={center}
          zoom={zoom}
          markers={visibleMarkers}
          onMarkerClick={(marker: GoogleMapViewerTypes.MarkerData) => {
            setSelectedMarker(marker);
          }}
          // polyline={polyline}
        />
        <ModalDialog
          customStyles="sm:max-w-none bg-lucky px-4 py-3"
          trigger={null}
          open={!!selectedMarker}
          exitButton={false}
          onOpenChange={(open) => {
            if (!open) setSelectedMarker(null);
          }}
        >
          {({ close }) => (
            <DriverDetailModal data={selectedMarker} close={close} />
          )}
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
        className={"w-2 h-auto rounded-xl"}
        style={{ backgroundColor: color[item.estado] }}
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

function DriverDetailModal({ data, close }: TrackingTypes.DriverDetailProps) {
  if (data) {
    const color: Record<TrackingTypes.TrackingDriverStatus, string> = {
      Atendiendo: "#F2B8B5",
      Disponible: "#14AE5C",
    };

    const fillColor: Record<TrackingTypes.ParadaStatus, string> = {
      "En curso": "#14AE5C",
      Pendiente: "#C00F0C",
    };
    const item = data.driverInfo;

    return (
      <div className="w-[621px]">
        {/* //w-[621px] */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 border border-l-0 border-t-0 border-b-0 border-r-neutral-400 pr-4">
            <div className="grid grid-cols-[auto_1fr] gap-4">
              <div
                className={"w-2 h-auto rounded-xl"}
                style={{ backgroundColor: color[item.estado] }}
              ></div>
              <ul className="[&_li]:flex [&_li]:items-center [&_li]:gap-2">
                <li>
                  <FaRegUser />
                  <span className="font-semibold text-xl">{item.user}</span>
                </li>
                <li>
                  <IoCarOutline className="scale-125" />
                  <span className="text-sm">
                    {item.tipo_transporte.join(", ")}
                  </span>
                </li>
                <li>
                  <HiOutlinePhone className="scale-125" />
                  <span className="text-sm">{item.telefono}</span>
                </li>
                <li>
                  <PiMapPinFill
                    className="scale-125"
                    fill={color[item.estado]}
                  />
                  <span className="text-sm">{item.estado_info}</span>
                </li>
              </ul>
            </div>
            <Separator
              orientation="horizontal"
              className="bg-neutral-400"
            ></Separator>
            <div>
              <Label className="mb-4">Lista de paradas</Label>
              <ul className="[&_li]:flex [&_li]:items-center [&_li]:gap-2 flex flex-col gap-1 min-h-36 h-36 overflow-auto">
                {item.paradas.map((e: TrackingTypes.ParadaListData, i) => (
                  <li key={i}>
                    <PiMapPinFill fill={fillColor[e.estado]} />
                    <span className="font-light text-xs">{e.parada}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* <Separator
              orientation="vertical"
              className="bg-neutral-400"
            ></Separator> */}
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-[1fr_auto] items-center">
              <div className="[&>p]:font-semibold">
                <p>Parada {item.parada_detalle.numero}:</p>
                <p>{item.parada_detalle.nombre}</p>
              </div>
              <PiMapPinFill
                className="mx-2 scale-125"
                fill={fillColor[item.parada_detalle.estado]}
              />
            </div>
            <div>
              <Label>Datos de recepcionario</Label>
              <ul className="[&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li>span]:text-sm flex flex-col gap-1 my-1">
                <li>
                  <FaRegUser />
                  <span>{item.parada_detalle.recepcionario.nombre}</span>
                </li>
                <li>
                  <IoCarOutline className="scale-125" />
                  <span>{item.parada_detalle.recepcionario.documento}</span>
                </li>
                <li>
                  <HiOutlinePhone className="scale-125" />
                  <span>{item.parada_detalle.recepcionario.telefono}</span>
                </li>
              </ul>
            </div>
            <div>
              <Label>Observaciones</Label>
              <p className="text-sm mt-2 break-words">
                {item.parada_detalle.observacion}
              </p>
            </div>
            {item.parada_detalle.fotos.length > 0 && (
              <div>
                <Label>Fotos de sustento</Label>
                <div className="py-2 flex flex-row gap-2 overflow-auto">
                  {item.parada_detalle.fotos.map((url, i) => (
                    <ModalDialog
                      key={i}
                      customStyles="w-full sm:max-w-[954px] max-w-[954px] h-[90dvh] max-h-[652px] bg-transparent p-0 border-0"
                      exitButton={false}
                      trigger={
                        <img
                          src={url}
                          alt={`Foto ${i + 1}`}
                          className="w-[68px] h-[68px] object-cover rounded cursor-pointer"
                        />
                      }
                    >
                      {({ close }) => (
                        <div
                          className="w-full h-full p-6 relative rounded-2xl bg-center bg-cover bg-no-repeat"
                          style={{
                            backgroundImage: `url(${url})`,
                          }}
                        >
                          <Button
                            variant={"circular_fab_main"}
                            size={"icon"}
                            className="scale-125 absolute right-6"
                            onClick={close}
                          >
                            <IoCloseCircleOutline className="scale-175" />
                          </Button>
                        </div>
                      )}
                    </ModalDialog>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full p-3">
          <Button
            className="w-full"
            variant={"circular_fab_main"}
            onClick={close}
          >
            Ok
          </Button>
        </div>
      </div>
    );
  }
}
