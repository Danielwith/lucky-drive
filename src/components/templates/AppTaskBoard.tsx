import { TaskBoardTypes } from "@/lib/types/types";
import { memo, ReactNode, useCallback, useMemo } from "react";
import { ModalDialog } from "@/components/templates/AppDialog";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import { Controller, useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { FaTaxi } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RequestCourierTypes, SearchSelectTypes } from "@/lib/types/types";
import { CalendarClock } from "lucide-react";
import { Separator } from "../ui/separator";

export const AppTaskBoard: React.FC<TaskBoardTypes.props> = ({
  cards,
  tasks,
}) => {
  return (
    <div className="py-4 w-full h-full">
      <div className="grid grid-cols-1 md:flex h-full">
        {cards.map(({ status, color }) => {
          const items = tasks.filter(
            (task) => task.statusParent === status
          ).length;
          return (
            <section
              key={status}
              className="rounded-2xl flex flex-col h-full grow gap-5 "
            >
              {/* Header */}
              <header className="mx-3 border-b bg-neutral-700 border-neutral-700 rounded-lg">
                <p className={`h-2 ${color} rounded-t-lg`}></p>
                <div className="flex items-center justify-between px-4 py-2">
                  <h2 className="text-lg font-semibold text-white">{status}</h2>
                  <span
                    className={`text-xs text-white px-1.5 py-1 rounded border-2 border-gray-400`}
                  >
                    {items.toString().padStart(2, "0")}
                  </span>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto px-3 space-y-3">
                {/* Task list */}
                {tasks
                  .filter((task) => task.statusParent === status)
                  .map((task, index) => (
                    <div key={index} className="">
                      {task.renderXml()}
                    </div>
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

//#region Mantenenemos un estado unico de cada tarea en el modal
export const TaskModal = memo(function TaskModal({
  task,
  color,
  drivers,
  indicator,
  content,
}: {
  task: any;
  color: string | undefined;
  drivers: SearchSelectTypes.Option[];
  indicator: ReactNode;
  content: ReactNode;
}) {
  const { handleSubmit, control } =
    useForm<RequestCourierTypes.RequestCourierForm>({
      defaultValues: {
        driverInfo: "",
      },
    });

  const onAssign = (
    data: RequestCourierTypes.RequestCourierForm,
    closeModal: () => void
  ) => {
    console.log("Form Data ASSIGN:", data);
    closeModal();
  };

  const onCancel = (
    data: RequestCourierTypes.RequestCourierForm,
    closeModal: () => void
  ) => {
    console.log("Form Data CANCEL:", data);
    closeModal();
  };

  // Se encarga de abrir el modal
  const trigger = useMemo(
    () => (
      <AccordionTrigger
        dir="rtl"
        autoFocus={false}
        className="p-0 hover:no-underline grow absolute bottom-1 w-full h-full"
      />
    ),
    []
  );

  // Contenido del modal
  const children = useCallback(
    ({ close }: { close: () => void }) => (
      <div className="w-[448px] px-4 py-2.5 flex flex-col space-y-1 text-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span>{task.id}</span>
          <span className="flex items-center gap-1">
            <CalendarClock className="inline align-middle" size={14} />
            {task.time}
          </span>
        </div>

        {/* SOLO DECORATIVO ESTE ACORDION */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value={task.id}>
            <div className="relative">
              <h3 className="font-bold relative flex items-center gap-1 h-full text-xl/5 my-4">
                <span
                  className={`min-w-2 min-h-2 inline-block ${color} rounded-full`}
                ></span>
                <p className="text-continue max-w-[88%]">{task.name}</p>
              </h3>
              <AccordionTrigger
                disabled={true}
                dir="rtl"
                autoFocus={false}
                className="p-0 hover:no-underline -translate-y-0.5 grow absolute bottom-1 w-full h-full disabled:opacity-100 [&>svg]:rotate-360"
              ></AccordionTrigger>
            </div>
            <Separator className="bg-neutral-500" />
            {indicator}
            {/* <div className="flex gap-1 flex-col my-1.5">
              <div className="flex items-center gap-2 justify-between text-sm">
                <div className="flex items-center">
                  <MdLinearScale className="w-4 h-4 mr-1"></MdLinearScale>
                  <span className="text-neutral-400">Distancia:&nbsp;</span>
                  {task.modal_data.distance}
                </div>
                <div className="flex items-center">
                  <MdPayments className="w-4 h-4 mr-1"></MdPayments>
                  <span className="text-neutral-400">Costo:&nbsp;</span>
                  S/{task.modal_data.cost.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center text-sm">
                <MdLinearScale className="w-4 h-4 mr-1"></MdLinearScale>
                <span className="text-neutral-400">Ppto:&nbsp;</span>
                {task.modal_data.ppto}
              </div>
            </div> */}
          </AccordionItem>
        </Accordion>

        {/* CONTENIDO DENTRO */}
        {/* <div className="flex flex-col gap-2">
          {task.modal_data.points.map((p: any, i: number) => (
            <Accordion key={i} type="single" collapsible className="w-full">
              <AccordionItem value={`${task.id}_${i}`}>
                <AccordionTrigger className="p-0 [&>svg]:hidden hover:bg-[#554e65] hover:no-underline">
                  <div className="w-full flex border border-[#837f8c] rounded-md p-2 flex-wrap justify-between gap-2 items-center">
                    <div className="flex items-center px-2 w-[80px] justify-center">
                      <PiMapPinFill className="min-w-5 min-h-5 mr-2"></PiMapPinFill>
                      <span className="break-all">{p.label}</span>
                    </div>
                    <div className="grow">
                      <p>{p.address}</p>
                      <p className="font-bold">{p.ubication}</p>
                    </div>
                    <div>
                      <span
                        className={`min-w-2 min-h-2 inline-block ${color} rounded-full`}
                      />
                    </div>
                  </div>
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>
          ))}
        </div> */}
        {content}

        {/* formulario */}
        <>
          {(() => {
            switch (task.status) {
              case "Pendiente":
                return (
                  <form
                    onSubmit={handleSubmit((data) => onAssign(data, close))}
                    className="mt-3"
                  >
                    <Controller
                      control={control}
                      name="driverInfo"
                      rules={{ required: "Debe seleccionar un conductor" }}
                      render={({ field, fieldState }) => (
                        <>
                          <SearchSelect
                            className="w-full border-3 border-[#68548E] placeholder:text-white"
                            options={drivers}
                            placeholder="Ingresa nombre o DNI"
                            onChange={field.onChange}
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
                    <div className="flex flex-col gap-2 mt-2">
                      <Button type="submit" className="bg-[#6750A4]">
                        <FaTaxi /> Asignar
                      </Button>
                      <Button
                        type="reset"
                        onClick={close}
                        className="bg-[#D0BCFF] hover:bg-[#d7c7fd] text-black hover:text-black"
                        variant="outline"
                      >
                        <IoIosCloseCircle /> Atrás
                      </Button>
                    </div>
                  </form>
                );
              case "En curso":
                return (
                  <form
                    onSubmit={handleSubmit((data) => onCancel(data, close))}
                    className="mt-3"
                  >
                    <Controller
                      control={control}
                      name="driverInfo"
                      rules={{ required: "Debe seleccionar un conductor" }}
                      render={({ field, fieldState }) => (
                        <>
                          <SearchSelect
                            className="w-full border-3 border-[#68548E] placeholder:text-white"
                            options={[
                              {
                                label: task.modal_data.selected_driver,
                                value: task.modal_data.selected_driver,
                              },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                            autoSelectFirst={true}
                            isDisabled={true}
                          />
                          {fieldState.error && (
                            <p className="text-red-600">
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                    <div className="flex flex-col gap-2 mt-2">
                      <Button
                        type="submit"
                        className="bg-[#8C1D18] hover:bg-[#8c1e18e3]"
                      >
                        <IoIosCloseCircle /> Cancelar viaje
                      </Button>
                      <Button
                        type="reset"
                        onClick={close}
                        className="bg-[#D0BCFF] hover:bg-[#d7c7fd] text-black hover:text-black"
                        variant="outline"
                      >
                        <IoIosCloseCircle /> Atrás
                      </Button>
                    </div>
                  </form>
                );
              case "Terminados":
                return (
                  <form className="mt-3">
                    <Controller
                      control={control}
                      name="driverInfo"
                      rules={{ required: "Debe seleccionar un conductor" }}
                      render={({ field, fieldState }) => (
                        <>
                          <SearchSelect
                            className="w-full border-3 border-[#68548E] placeholder:text-white"
                            options={[
                              {
                                label: task.modal_data.selected_driver,
                                value: task.modal_data.selected_driver,
                              },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                            autoSelectFirst={true}
                            isDisabled={true}
                          />
                          {fieldState.error && (
                            <p className="text-red-600">
                              {fieldState.error.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                    <div className="flex flex-col gap-2 mt-2">
                      <Button
                        type="button"
                        onClick={close}
                        className="bg-[#D0BCFF] hover:bg-[#d7c7fd] text-black hover:text-black"
                        variant="outline"
                      >
                        <IoIosCloseCircle /> Atrás
                      </Button>
                    </div>
                  </form>
                );
              default:
                return null;
            }
          })()}
        </>
      </div>
    ),
    [task, color, drivers, indicator, content]
  );

  return (
    <ModalDialog
      exitButton={false}
      customStyles="bg-[#4A4458] px-2 py-3"
      trigger={trigger}
      children={children}
    />
  );
});
//#endregion
