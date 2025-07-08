import GenericSelect from "@/components/templates/generics/GenericSelect";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GoogleMapViewerTypes,
  SelectTypes,
  TrackingTypes,
} from "@/lib/types/types";
import { IoSearchSharp } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { RiCarLine } from "react-icons/ri";
import { TbPhone } from "react-icons/tb";
import { PiMapPinFill } from "react-icons/pi";
import { TrackingDataService } from "@/services/tracking_data_service";
import { useEffect, useMemo, useState } from "react";
import { FiBox } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";
import { AppGoogleMapViewer } from "@/components/templates/AppGoogleMapViewer";
import { LuMinimize2 } from "react-icons/lu";
import { PolylineService } from "@/services/tracking/polyline_service";

export default function Tracking() {
  const center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  const zoom = 16;
  const markers = useMemo<GoogleMapViewerTypes.MarkerData[]>(
    () => [
      {
        position: { lat: -12.0464, lng: -77.0428 },
        popupText: "Aquí estoy 📍",
        color: "Terminados",
      },
      {
        position: { lat: -12.05, lng: -77.03 },
        popupText: "Otro punto",
        color: "En curso",
      },
      {
        position: { lat: -12.05, lng: -77.04 },
        popupText: "Otro punto",
        color: "Pendiente",
      },
    ],
    []
  );

  const transporte: SelectTypes.SelectData[] =
    TrackingDataService.fetchTipoTransporte();

  const [results, setResults] = useState<TrackingTypes.SearchData[] | null>(
    null
  );

  const [polyline, setPolyline] = useState<{ lat: number; lng: number }[]>([]);

  const [filterView, setFilterView] = useState<boolean>(true);

  const { handleSubmit, control } = useForm<TrackingTypes.TrackingForm>({
    defaultValues: {
      dateRange: undefined,
      transporte: "",
      conductor: "",
    },
  });

  const onSubmit = (data: TrackingTypes.TrackingForm) => {
    console.log("Form Data:", data);
    setResults(TrackingDataService.fetchFormSearch(data));
    // Ejecuta tu lógica de búsqueda aquí
  };

  useEffect(() => {
    const fetchPolyline = async () => {
      if (markers.length < 2) {
        setPolyline([]);
        return;
      }

      const positions = markers.map((m) => m.position);
      const result = await PolylineService.fetchPolylineVector(positions);

      if (
        !result.success ||
        !result.response?.routes?.[0]?.geometry?.coordinates
      ) {
        setPolyline([]);
        return;
      }

      const coords = result.response.routes[0].geometry.coordinates;
      const formatted: { lat: number; lng: number }[] = coords.map(
        ([lng, lat]: [lng: number, lat: number]) => ({ lat, lng })
      );
      setPolyline(formatted);
    };

    void fetchPolyline();
  }, [markers]);

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
              <div className="flex flex-row flex-wrap gap-4">
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => (
                    <DateRangePicker
                      label="Rango de fecha"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="transporte"
                  render={({ field }) => (
                    <GenericSelect
                      label="Tipo de transporte"
                      data={transporte}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder=""
                    />
                  )}
                />

                <div className="flex flex-col gap-1 min-w-[18rem]">
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
                <div className=" pb-2 flex gap-4 w-full overflow-x-auto">
                  {results.map((item: TrackingTypes.SearchData) => (
                    <SearchCard key={item.placa} item={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        {!filterView && (
          <div className="absolute top-3 right-15 z-50">
            <Button
              variant={"circular_fab_main"}
              onClick={() => {
                setFilterView(true);
              }}
            >
              <IoSearchSharp /> Filtros
            </Button>
          </div>
        )}
        <AppGoogleMapViewer
          center={center}
          zoom={zoom}
          markers={markers}
          polyline={polyline}
        />
      </div>
    </div>
  );
}

function SearchCard({ item }: { item: TrackingTypes.SearchData }) {
  const [selectedParada, setSelectedParada] =
    useState<TrackingTypes.ParadaData | null>(null);

  // Vista original
  if (!selectedParada) {
    return (
      <div className="min-w-[250px] w-[250px] shadow-material rounded-xl p-3 h-fit bg-[#342c44]">
        <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full">
          <FaRegUser />
          <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden font-semibold">
            {item.user}
          </p>
        </div>
        <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full">
          <RiCarLine />
          <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden">
            {item.placa}
          </p>
        </div>
        <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full">
          <TbPhone />
          <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden">
            {item.telefono}
          </p>
        </div>
        <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full pb-4">
          <FiBox />
          <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden">
            Destinos completados {item.destino.from}/{item.destino.to}
          </p>
        </div>
        {item.paradas && (
          <>
            {item.paradas.map((parada: TrackingTypes.ParadaData) => (
              <div
                key={parada.numero}
                onClick={() => {
                  setSelectedParada(parada);
                }}
                className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full cursor-pointer  p-1 rounded"
              >
                <PiMapPinFill color={parada.estado === 1 ? "green" : "red"} />
                <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden">
                  Parada {parada.numero}: {parada.nombre}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }

  // Vista detallada al seleccionar una parada
  return (
    <div className="min-w-[250px] w-[250px] shadow-material rounded-xl p-3 h-fit bg-[#342c44]">
      <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full cursor-pointer hover:bg-gray-100 p-1 rounded">
        <PiMapPinFill color={selectedParada.estado === 1 ? "green" : "red"} />
        <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden font-semibold">
          Parada {selectedParada.numero}: {selectedParada.nombre}
        </p>
      </div>
      <Separator className="my-2 bg-white"></Separator>
      {selectedParada.estado === 1 ? (
        <>
          <p className="font-semibold mb-2">Datos de recepcionario</p>
          <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full">
            <FaRegUser />
            <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden">
              {item.user}
            </p>
          </div>
          <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full">
            <RiCarLine />
            <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden">
              {item.placa}
            </p>
          </div>
          <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full">
            <TbPhone />
            <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden">
              {item.telefono}
            </p>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold mb-2 text-red-600">
            Pedido no recepcionado
          </p>
        </>
      )}

      <Separator className="my-2 bg-white"></Separator>
      <p className="font-semibold">Observaciones</p>
      <p>{selectedParada.info.observacion}</p>
      <Separator className="my-3 bg-white"></Separator>

      <p className="font-semibold text-center">Fotos de sustento</p>
      {selectedParada.info.fotos.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {selectedParada.info.fotos.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Foto ${i + 1}`}
              className="w-[68px] h-[68px] object-cover rounded"
            />
          ))}
        </div>
      )}
      <div className="">
        <Button
          variant="circular_fab_main"
          onClick={() => {
            setSelectedParada(null);
          }}
          className="mt-4 w-full bg-[#68548E]"
        >
          Ok
        </Button>
      </div>
    </div>
  );
}
