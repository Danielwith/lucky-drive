import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarClock } from "lucide-react";
import { IoIosCloseCircle } from "react-icons/io";
import { FaTaxi } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { PiMapPinFill } from "react-icons/pi";
import { RiPinDistanceFill } from "react-icons/ri";
import { ModalDialog } from "@/components/templates/AppDialog";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import { Controller, useForm } from "react-hook-form";
import { DriverStatusTypes } from "@/lib/types/types";

type TaskContentProps = {
  task_label: string;
  task_data_1: string | number;
  task_data_2: string | number;
  between?: boolean;
  Icon: IconType;
};

export default function DriverStatus() {
  const cards = [
    { status: "Pendiente", color: "bg-red-500", items: 3 },
    { status: "En curso", color: "bg-yellow-500", items: 4 },
    { status: "Terminados", color: "bg-green-500", items: 5 },
  ];

  const frameworks = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ];

  const sampleTasks = Array.from({ length: 6 }).map((_, i) => ({
    id: `REQ-0102${i}`,
    name: "Martinez Isla, Jose LuisPRUEBAEXTRALARGATEXTO",
    start: "Av. Mendiburu 1236",
    end: "Av. Mendiburu 1236",
    distance: "14 Km",
    district: "San miguel",
    province: "SMP",
    time: "11:35 PM, 06 Jul 2025",
  }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DriverStatusTypes.DriverStatusForm>({
    defaultValues: {
      driverInfo: "",
    },
  });

  const onSubmit = (data: DriverStatusTypes.DriverStatusForm) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="py-4 w-full h-full">
      <div className="grid grid-cols-1 md:flex h-full ">
        {cards.map(({ status, color, items }) => (
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

            {/* Task list */}
            <div className="flex-1 overflow-y-auto px-3 space-y-3 ">
              {sampleTasks.slice(0, items).map((task) => (
                <div
                  key={task.id}
                  className="bg-neutral-700 rounded-lg px-4 py-2.5 flex flex-col space-y-1 text-gray-200 "
                >
                  <div className="flex justify-between items-center text-2xs">
                    <span>{task.id}</span>
                    <span className="flex items-center gap-1">
                      <CalendarClock
                        className="inline align-middle"
                        size={10}
                      />
                      {task.time}
                    </span>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={task.id}>
                      <div className="relative ">
                        <h3 className="font-bold relative flex items-center gap-1 h-full text-base/5">
                          <span
                            className={`min-w-2 min-h-2 inline-block ${color} rounded-full`}
                          ></span>
                          <p className="">{task.name}</p>
                        </h3>
                        <AccordionTrigger
                          dir="rtl"
                          autoFocus={false}
                          className="p-0 hover:no-underline grow absolute top-0 w-full  h-full"
                        ></AccordionTrigger>
                      </div>
                      <Separator className="bg-neutral-500"></Separator>
                      <div className="w-full mt-1">
                        <div className="text-sm space-y-0.5">
                          <TaskContent
                            Icon={PiMapPinFill}
                            task_label="Inicio"
                            task_data_1={task.start}
                            task_data_2={task.district}
                          ></TaskContent>
                          <TaskContent
                            Icon={PiMapPinFill}
                            task_label="Fin"
                            task_data_1={task.end}
                            task_data_2={task.province}
                          ></TaskContent>
                        </div>
                      </div>
                      <AccordionContent>
                        <TaskContent
                          Icon={RiPinDistanceFill}
                          task_label="Distancia"
                          task_data_1={""}
                          task_data_2={task.distance}
                          between={false}
                        ></TaskContent>
                        <div className="flex gap-2 flex-col mt-3">
                          <ModalDialog
                            exitButton={false}
                            trigger={
                              <Button className=" w-full h-10 bg-[#6750A4]">
                                <FaTaxi />
                                Asignar chofer
                              </Button>
                            }
                            children={({ close }) => (
                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="w-[282px] text-center font-bold">
                                  <p>Ingresa el nombre o DNI del conductor</p>
                                </div>
                                <div className="py-2 w-full">
                                  <Controller
                                    control={control}
                                    name="driverInfo"
                                    rules={{
                                      required: "Debe seleccionar un conductor",
                                    }}
                                    render={({ field }) => (
                                      <>
                                        <SearchSelect
                                          className="w-full"
                                          options={frameworks}
                                          placeholder="Ingresa nombre o DNI"
                                          onChange={field.onChange}
                                        />
                                        {errors.driverInfo && (
                                          <p className="text-sm text-red-600 mt-1">
                                            {errors.driverInfo.message?.toString()}
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <Button className="w-full h-10 bg-[#6750A4]">
                                    <FaTaxi />
                                    Asignar chofer
                                  </Button>
                                  <Button
                                    className="w-full h-10 bg-[#d0bcff] hover:bg-[#d0bcff]/90 text-black"
                                    onClick={close}
                                  >
                                    <IoIosCloseCircle />
                                    Rechazar viaje
                                  </Button>
                                </div>
                              </form>
                            )}
                          ></ModalDialog>

                          <Button className="w-full h-10 bg-[#FFE9E7] hover:bg-[#FFE9E7]/90  text-black">
                            <IoIosCloseCircle />
                            Rechazar viaje
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function TaskContent({
  task_label,
  task_data_1,
  task_data_2,
  between = true,
  Icon,
}: TaskContentProps) {
  return (
    <div
      className={`flex items-center ${between ? "justify-between" : ""} gap-2`}
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
