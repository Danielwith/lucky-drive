import { RadioGroupTypes, TaskBoardTypes } from "@/lib/types/types";
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ModalDialog } from "@/components/templates/AppDialog";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import { Controller, useForm } from "react-hook-form";
import { IoIosCloseCircle, IoMdCloseCircleOutline } from "react-icons/io";
import { FaTaxi } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SearchSelectTypes } from "@/lib/types/types";
import { CalendarClock } from "lucide-react";
import { Separator } from "../ui/separator";
import { ModalSheet } from "./AppSheet";
import { SheetClose, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet";
import GenericRadioGroup from "./generics/GenericRadioGroup";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

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
  onFormAction,
}: {
  task: any;
  color: string | undefined;
  drivers: SearchSelectTypes.Option[];
  indicator: ReactNode;
  content: ReactNode;
  onFormAction: (formData: TaskBoardTypes.form) => void; // Envia al padre info del form
}) {
  const { handleSubmit, control } = useForm<TaskBoardTypes.form>({
    defaultValues: {
      driverInfo: "",
      motivo: "",
    },
  });

  const onAssign = (data: TaskBoardTypes.form, closeModal: () => void) => {
    console.log("Form Data ASSIGN:", data);
    onFormAction(data);
    closeModal();
  };

  const onCancel = (data: TaskBoardTypes.form, closeModal: () => void) => {
    console.log("Form Data CANCEL:", data);
    onFormAction(data);
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
                  <>
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
                    <div className="mt-1">
                      <ModalSheet
                        exitButton={false}
                        trigger={
                          <Button
                            type="button"
                            className="bg-[#8C1D18] hover:bg-[#8c1e18e3] w-full"
                          >
                            <IoIosCloseCircle /> Cancelar viaje
                          </Button>
                        }
                        children={
                          <CancelSheet
                            task={task}
                            onFormSubmit={(data) => {
                              onCancel(data, close);
                            }}
                          ></CancelSheet>
                        }
                      ></ModalSheet>
                    </div>
                  </>
                );
              case "En curso":
                return (
                  <div className="mt-1">
                    <SearchSelect
                      className="w-full border-3 border-[#68548E] placeholder:text-white"
                      options={[
                        {
                          label: task.modal_data.selected_driver,
                          value: task.modal_data.selected_driver,
                        },
                      ]}
                      value={task.modal_data.selected_driver}
                      isDisabled={true}
                    />
                    <div className="flex flex-col gap-2 mt-2">
                      <ModalSheet
                        exitButton={false}
                        trigger={
                          <Button
                            type="button"
                            className="bg-[#8C1D18] hover:bg-[#8c1e18e3] w-full"
                          >
                            <IoIosCloseCircle /> Cancelar viaje
                          </Button>
                        }
                        children={
                          <CancelSheet
                            task={task}
                            onFormSubmit={(data) => {
                              onCancel(data, close);
                            }}
                          ></CancelSheet>
                        }
                      ></ModalSheet>
                      <Button
                        type="reset"
                        onClick={close}
                        className="bg-[#D0BCFF] hover:bg-[#d7c7fd] text-black hover:text-black"
                        variant="outline"
                      >
                        <IoIosCloseCircle /> Atrás
                      </Button>
                    </div>
                  </div>
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

export const CancelSheet = memo(function CancelSheet({
  task,
  onFormSubmit,
}: {
  task: any;
  onFormSubmit: (formData: TaskBoardTypes.form) => void;
}) {
  const [selected, setSelected] = useState<string>("");

  const motivos: RadioGroupTypes.RadioOption[] = [
    {
      label: "Cliente solicitó cancelación de viaje",
      value: "Cliente solicitó cancelación de viaje",
    },
    {
      label: "Tamaño exesivo de paquete",
      value: "Tamaño exesivo de paquete",
    },
    {
      label: "Cliente no se presentó",
      value: "Cliente no se presentó",
    },
    {
      label: "Falla mecánica",
      value: "Falla mecánica",
    },
    {
      label: "Problema tecnológico",
      value: "Problema tecnológico",
    },
  ];

  const { handleSubmit, control, setValue } = useForm<TaskBoardTypes.form>({
    defaultValues: {
      driverInfo: "",
      motivo: "",
    },
  });

  useEffect(() => {
    setValue("motivo", selected, { shouldValidate: true });
  }, [selected, setValue]);

  console.log(task);

  return (
    <form
      onSubmit={handleSubmit((data: TaskBoardTypes.form) => onFormSubmit(data))}
      className="px-5 py-12 h-full flex flex-col"
    >
      <div>
        <SheetHeader className="p-0">
          <SheetTitle className="text-[#EADDFF] text-lg font-semibold">
            ¿Cuál fue el motivo?
          </SheetTitle>
        </SheetHeader>
        <GenericRadioGroup
          className="py-5 space-y-1"
          data={motivos}
          value={selected}
          onChange={(val) => {
            setSelected(val);
            const ta = document.getElementById(
              "otro-motivo"
            ) as HTMLTextAreaElement | null;
            if (ta) ta.value = "";
          }}
        ></GenericRadioGroup>
        <Textarea
          id="otro-motivo"
          className="dark:bg-[#36343B] placeholder:text-[#CAC4D0]"
          placeholder="Otro motivo"
          onChange={(e) => setSelected(e.target.value)}
        ></Textarea>
        <Controller
          control={control}
          name="motivo"
          rules={{ required: "Indique el motivo" }}
          render={({ field, fieldState }) => (
            <>
              <Input
                value={field.value}
                onChange={field.onChange}
                hidden={true}
              ></Input>
              {fieldState.error && (
                <p className="text-red-600">{fieldState.error.message}</p>
              )}
            </>
          )}
        ></Controller>
      </div>
      <SheetFooter className="w-full px-0 gap-4">
        <Button
          type="submit"
          variant={"circular_fab"}
          className="bg-[#B3261E] text-white hover:bg-[#b3261ee7] py-5"
        >
          <IoMdCloseCircleOutline />
          Confirmación de cancelación de viaje
        </Button>
        <SheetClose asChild>
          <Button
            type="button"
            variant={"circular_fab"}
            className="bg-transparent border border-[#CCC2DC] text-white hover:bg-white hover:text-black py-5"
          >
            <IoMdCloseCircleOutline />
            Cerrar
          </Button>
        </SheetClose>
      </SheetFooter>
    </form>
  );
});
//#endregion
