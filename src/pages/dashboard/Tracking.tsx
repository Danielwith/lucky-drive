import { AppMapViewer } from "@/components/templates/AppMapViewer";
import GenericSelect from "@/components/templates/generics/GenericSelect";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapViewerTypes, SelectTypes, TrackingTypes } from "@/lib/types/types";
import { IoSearchSharp } from "react-icons/io5";
import { useForm, Controller } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { RiCarLine } from "react-icons/ri";
import { TbPhone } from "react-icons/tb";
import { PiMapPinFill } from "react-icons/pi";
import { TrackingDataService } from "@/services/tracking_data_service";
import { useState } from "react";
import { FiBox } from "react-icons/fi";
import { Separator } from "@/components/ui/separator";

export default function Tracking() {
  const center: [number, number] = [-12.0464, -77.0428];
  const zoom = 16;
  const markers: MapViewerTypes.MarkerData[] = [
    { lat: -12.0464, lng: -77.0428, popupText: "Aquí estoy 📍" },
    { lat: -12.05, lng: -77.03, popupText: "Otro punto" },
  ];

  const transporte: SelectTypes.SelectData[] =
    TrackingDataService.fetchTipoTransporte();

  const [results, setResults] = useState<TrackingTypes.SearchData[] | null>(
    null
  );

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

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-0 w-full z-50 p-2">
        <div className="flex flex-col flex-wrap gap-5 bg-white dark:bg-neutral-700 rounded-xl shadow-material p-4">
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
            <div className="border-t-1 pt-4 pb-2 flex gap-4 w-full overflow-x-auto">
              {results.map((item: TrackingTypes.SearchData) => (
                <SearchCard key={item.placa} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
      <AppMapViewer center={center} zoom={zoom} markers={markers} />
    </div>
  );
}

function SearchCard({ item }: { item: TrackingTypes.SearchData }) {
  const [selectedParada, setSelectedParada] =
    useState<TrackingTypes.ParadaData | null>(null);

  // Vista original
  if (!selectedParada) {
    return (
      <div className="min-w-[250px] w-[250px] shadow-material rounded-xl p-3 h-full">
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
                className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full cursor-pointer hover:bg-gray-100 p-1 rounded"
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
    <div className="min-w-[250px] w-[250px] shadow-material rounded-xl p-3 h-full">
      <div className="flex flex-wrap flex-row items-center gap-2.5 overflow-hidden w-full cursor-pointer hover:bg-gray-100 p-1 rounded">
        <PiMapPinFill color={selectedParada.estado === 1 ? "green" : "red"} />
        <p className="w-[calc(100%-1.75rem)] overflow-ellipsis overflow-hidden font-semibold">
          Parada {selectedParada.numero}: {selectedParada.nombre}
        </p>
      </div>
      <Separator className="my-2"></Separator>
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

      <Separator className="my-2"></Separator>
      <p className="font-semibold">Observaciones</p>
      <p>{selectedParada.info.observacion}</p>
      <Separator className="my-3"></Separator>

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
          className="mt-4 w-full"
        >
          Ok
        </Button>
      </div>
    </div>
  );
}
