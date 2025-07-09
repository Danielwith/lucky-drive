import { DataTable } from "@/components/templates/AppDataTable";
import { ModalDialog } from "@/components/templates/AppDialog";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import { Button } from "@/components/ui/button";
import {
  DataTableTypes,
  DriversManagementTypes,
  SearchSelectTypes,
} from "@/lib/types/types";
import { fetchDriverManagementData } from "@/services/driver_management_data_service";
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
}: DriversManagementTypes.ModalProps) {
  const { handleSubmit, control } = useForm<DriversManagementTypes.form>({
    defaultValues: {
      nombreConductor: "",
      dni: "",
      telefono: "",
      servicios: [],
      modeloVehiculo: "",
      placaVehiculo: "",
      nroSOAT: 0,
      vigenciaSOAT: "",
    },
  });

  const services: SearchSelectTypes.Option[] = [
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

  const onInsert = (
    data: DriversManagementTypes.form,
    closeModal: () => void
  ) => {
    console.log("Form Data INSERT:", data);

    closeModal();
  };

  const onUpdate = (
    data: DriversManagementTypes.form,
    closeModal: () => void
  ) => {
    console.log("Form Data UPDATE:", data);

    closeModal();
  };

  return (
    <div className="w-[745px] px-2 py-2.5 flex flex-col space-y-1 text-gray-200">
      <div className="flex items-center text-xl gap-2">
        <HiOutlineUser />
        <h2>
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
      <>
        {(() => {
          switch (mode) {
            case "INSERT":
              return (
                <>
                  <form
                    onSubmit={handleSubmit((data) => onInsert(data, close))}
                    className="mt-3"
                  >
                    <Controller
                      control={control}
                      name="servicios"
                      rules={{ required: "Debe seleccionar un conductor" }}
                      render={({ field, fieldState }) => (
                        <>
                          <SearchSelect
                            variant={"basic"}
                            options={services}
                            placeholder="-"
                            onChange={field.onChange}
                            isMulti
                            value={field.value}
                          />
                          {fieldState.error && (
                            <p className="text-red-600">
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                    <div className="flex flex-row gap-2 mt-2 justify-end">
                      <Button
                        type="reset"
                        onClick={close}
                        className="rounded-full"
                        variant="outline"
                      >
                        Salir
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#68548E] rounded-full"
                      >
                        Guardar conductor
                      </Button>
                    </div>
                  </form>
                </>
              );
            case "UPDATE":
              return <div className="mt-1"></div>;
            default:
              return null;
          }
        })()}
      </>
    </div>
  );
});
