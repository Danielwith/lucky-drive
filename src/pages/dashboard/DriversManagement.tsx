import { DataTable } from "@/components/templates/AppDataTable";
import { ModalDialog } from "@/components/templates/AppDialog";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isNumericOrControlKey } from "@/lib/helpers/InputValidation";
import {
  DataTableTypes,
  DriversManagementTypes,
  SearchSelectTypes,
} from "@/lib/types/types";
import { fetchDriverManagementData } from "@/services/driver_management_data_service";
import { parseISO } from "date-fns";
import { Plus } from "lucide-react";
import { memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiOutlineUser } from "react-icons/hi";

export default function DriversManagement() {
  const data = fetchDriverManagementData();
  const tableActions: DataTableTypes.TableActions[] = ["SEPARATOR", "DOWNLOAD"];
  console.log("PRODUCCION?: ", import.meta.env.PROD);
  console.log("PRUEBA: ", import.meta.env.XPLORA_API_URL);
  return (
    <div className="container h-full max-w-full">
      <DataTable
        columns={DriversManagementTypes.columns}
        data={data}
        actions={tableActions}
        sheetname="LISTA_CONDUCTORES"
        customFilters={() => (
          <>
            <ModalDialog
              customStyles="sm:max-w-none p-3"
              exitButton={false}
              trigger={
                <Button
                  variant="circular_fab_main"
                  size={"icon"}
                  className="ml-auto"
                >
                  <Plus />
                </Button>
              }
            >
              {({ close }) => <DriverModal close={close} mode={"INSERT"} />}
            </ModalDialog>
          </>
        )}
      />
    </div>
  );
}

export const DriverModal = memo(function DriverModal({
  data,
  close,
  mode,
  readonly = false,
}: DriversManagementTypes.ModalProps) {
  const { handleSubmit, control } = useForm<DriversManagementTypes.form>({
    defaultValues: {
      nombreConductor: data?.conductor ?? "",
      dni: data?.dni ?? "",
      correo: data?.correo ?? "",
      categoria: data?.categoria ?? "",
      clase: data?.clase ?? "",
      licencia: data?.licencia ?? "",
      telefono: data?.telefono ?? "",
      servicios: data?.servicios.split(",").map((e) => e.trim()) ?? [],
      modeloVehiculo: data?.modelo ?? "",
      placaVehiculo: data?.placa ?? "",
      nroSOAT: data?.soat ?? "",
      vigenciaSOAT: data?.soat_vigencia
        ? parseISO(data?.soat_vigencia)
        : undefined,
    },
  });

  const services: SearchSelectTypes.Option[] = [
    {
      label: "Taxi",
      value: "Taxi",
    },
    {
      label: "Taxi Express",
      value: "Taxi Express",
    },
    {
      label: "Courier",
      value: "Courier",
    },
  ];

  const onInsert = (
    dataForm: DriversManagementTypes.form,
    closeModal: () => void
  ) => {
    console.log("Form Data INSERT:", dataForm);

    closeModal();
  };

  const onUpdate = (
    dataForm: DriversManagementTypes.form,
    closeModal: () => void
  ) => {
    console.log("Form Data UPDATE:", dataForm);
    console.log(data?.id);

    closeModal();
  };

  return (
    <div className="w-[745px] px-2 py-2.5 flex flex-col space-y-1 text-gray-200 max-h-[92vh] overflow-y-auto">
      <div className="flex items-center text-xl gap-2 text-[#E6E0E9]">
        <HiOutlineUser />
        <h2 className="font-medium">
          {(() => {
            switch (mode) {
              case "INSERT":
                return "Añadir";
              case "UPDATE":
                return "Perfil";
            }
          })()}
          &nbsp;conductor
        </h2>
      </div>

      {/* formulario */}
      <form
        onSubmit={handleSubmit((data) => {
          switch (mode) {
            case "INSERT":
              return onInsert(data, close);
            case "UPDATE":
              return onUpdate(data, close);
          }
        })}
        className="mt-5"
      >
        <div className="grid grid-cols-2 gap-x-5 [&>div]:flex [&>div]:flex-col [&_div]:gap-y-2.5">
          <div
            className="[&>h4]:text-sm [&>h4]:font-medium
                    [&>div]:flex [&>div]:flex-col [&>div]:gap-1"
          >
            <h4>Datos conductor</h4>
            {/* Nombre conductor */}
            <div>
              <Label htmlFor="nombreConductor" className="px-1">
                Nombre conductor
              </Label>
              <Controller
                control={control}
                name="nombreConductor"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="nombreConductor"
                      type="text"
                      placeholder="-"
                      disabled={readonly}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* DNI/CE */}
            <div>
              <Label htmlFor="dni" className="px-1">
                DNI/CE
              </Label>
              <Controller
                control={control}
                name="dni"
                rules={{
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^(?:\d{8}|[A-Za-z0-9]{9})$/,
                    message:
                      "Debe ser 8 dígitos (DNI) o 9 caracteres alfanuméricos (CE)",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="dni"
                      type="text"
                      placeholder="-"
                      value={field.value}
                      disabled={readonly}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (!isNumericOrControlKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Correo */}
            <div>
              <Label htmlFor="correo" className="px-1">
                Correo
              </Label>
              <Controller
                control={control}
                name="correo"
                rules={{
                  required: "Campo obligatorio",
                  pattern: {
                    value:
                      /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
                    message: "Inserte un correo valido",
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="correo"
                      type="text"
                      placeholder="-"
                      value={field.value}
                      disabled={readonly}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Teléfono */}
            <div>
              <Label htmlFor="telefono" className="px-1">
                Teléfono
              </Label>
              <Controller
                control={control}
                name="telefono"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="telefono"
                      type="text"
                      placeholder="-"
                      value={field.value}
                      disabled={readonly}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (!isNumericOrControlKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Servicios */}
            <div>
              <Controller
                control={control}
                name="servicios"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <SearchSelect
                      label="Servicios"
                      variant={"basic"}
                      options={services}
                      placeholder="-"
                      isDisabled={readonly}
                      onChange={field.onChange}
                      isMulti
                      value={field.value}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Licencia de conducir */}
            <div>
              <Label htmlFor="licencia" className="px-1">
                Licencia de conducir
              </Label>
              <Controller
                control={control}
                name="licencia"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="licencia"
                      type="text"
                      placeholder="-"
                      disabled={readonly}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Clase */}
            <div>
              <Label htmlFor="clase" className="px-1">
                Clase
              </Label>
              <Controller
                control={control}
                name="clase"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="clase"
                      type="text"
                      placeholder="-"
                      disabled={readonly}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Categoría */}
            <div>
              <Label htmlFor="categoria" className="px-1">
                Categoría
              </Label>
              <Controller
                control={control}
                name="categoria"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="categoria"
                      type="text"
                      placeholder="-"
                      disabled={readonly}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div
            className="[&>h4]:text-sm [&>h4]:font-medium
                    [&>div]:flex [&>div]:flex-col [&>div]:gap-1"
          >
            <h4>Datos vehículo</h4>
            {/* Modelo de vehículo */}
            <div>
              <Label htmlFor="modeloVehiculo" className="px-1">
                Modelo de vehículo
              </Label>
              <Controller
                control={control}
                name="modeloVehiculo"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="modeloVehiculo"
                      type="text"
                      placeholder="-"
                      value={field.value}
                      disabled={readonly}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Placa de vehículo */}
            <div>
              <Label htmlFor="placaVehiculo" className="px-1">
                Placa de vehículo
              </Label>
              <Controller
                control={control}
                name="placaVehiculo"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="placaVehiculo"
                      type="text"
                      placeholder="-"
                      value={field.value}
                      disabled={readonly}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Nro. SOAT */}
            <div>
              <Label htmlFor="nroSOAT" className="px-1">
                Nro. SOAT
              </Label>
              <Controller
                control={control}
                name="nroSOAT"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id="nroSOAT"
                      type="text"
                      placeholder="-"
                      value={field.value}
                      disabled={readonly}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (!isNumericOrControlKey(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
            {/* Vigencia SOAT */}
            <div>
              <Controller
                control={control}
                name="vigenciaSOAT"
                rules={{ required: "Campo obligatorio" }}
                render={({ field, fieldState }) => (
                  <>
                    <DatePicker
                      label="Vigencia SOAT"
                      placeholder="-"
                      value={field.value}
                      disabled={readonly}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                    />
                    {fieldState.error && (
                      <p className="text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-end mt-5 sticky bottom-0">
          <Button
            type="reset"
            onClick={close}
            className="rounded-full"
            variant="outline"
          >
            Salir
          </Button>
          {!readonly && (
            <Button type="submit" className="bg-[#68548E] rounded-full">
              Guardar conductor
            </Button>
          )}
        </div>
      </form>
    </div>
  );
});
