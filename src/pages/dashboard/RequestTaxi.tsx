import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { CalendarClock } from "lucide-react";
import { PiMapPinFill } from "react-icons/pi";
import { SearchSelectTypes, TaskBoardTypes } from "@/lib/types/types";
import { AppTaskBoard, TaskModal } from "@/components/templates/AppTaskBoard";
import { MdLinearScale, MdPayments } from "react-icons/md";

export default function RequestTaxi() {
  const cards: TaskBoardTypes.BoardCard[] = [
    { status: "Pendiente", color: "bg-red-500" },
    { status: "En curso", color: "bg-yellow-500" },
    { status: "Terminados", color: "bg-green-500" },
  ];

  const frameworks: SearchSelectTypes.Option[] = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
  ];

  const statusList = ["Pendiente", "En curso", "Terminados"];

  const data = Array.from({ length: 6 }).map((_, i) => {
    const randomStatus =
      statusList[Math.floor(Math.random() * statusList.length)];

    return {
      id: `REQ-0102${i}`,
      name: "Martinez Isla, Jose Luis",
      start: {
        address: "Av. Mendiburu 1236",
        ubication: "San Miguel",
      },
      end: {
        address: "Av. Mendiburu 1236",
        ubication: "SMP",
      },
      time: "11:35 PM, 06 Jul 2025",
      status: randomStatus,
      address: ["SMP", "San Miguel"],
      modal_data: {
        distance: "14 Km",
        cost: 24.0,
        ppto: 993203,
        points: [
          {
            label: "Inicio",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            status: randomStatus,
          },
          {
            label: "1",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            status: randomStatus,
          },
          {
            label: "2",
            address: "Av. Mendiburu 1236",
            ubication: "Miraflores",
            status: randomStatus,
          },
        ],
        selected_driver: "Juan",
      },
    };
  });

  const taskData: TaskBoardTypes.BoardItemContent[] = data.map((task: any) => {
    const color = cards.find((e: TaskBoardTypes.BoardCard) => {
      return e.status === task.status;
    })?.color;

    return {
      statusParent: task.status,
      renderXml: () => (
        <div
          key={task.id}
          className="bg-[#4A4458] rounded-lg px-4 py-2.5 flex flex-col space-y-1 text-gray-200"
        >
          <div className="flex justify-between items-center text-2xs">
            <span>{task.id}</span>
            <span className="flex items-center gap-1">
              <CalendarClock className="inline align-middle" size={10} />
              {task.time}
            </span>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value={task.id}>
              <div className="relative">
                <h3 className="font-bold relative flex items-center gap-1 h-full text-base/5 my-1">
                  <span
                    className={`min-w-2 min-h-2 inline-block ${color} rounded-full`}
                  ></span>
                  <p className="text-continue max-w-[88%]">{task.name}</p>
                </h3>
                {/* SE INSTANCIA, PARA EVITAR REENDERIZADOS */}
                <TaskModal
                  task={task}
                  color={color}
                  drivers={frameworks}
                  indicator={
                    <div className="flex gap-1 flex-col my-1.5">
                      <div className="flex items-center gap-2 justify-between text-sm">
                        <div className="flex items-center">
                          <MdLinearScale className="w-4 h-4 mr-1"></MdLinearScale>
                          <span className="text-neutral-400">
                            Distancia:&nbsp;
                          </span>
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
                    </div>
                  }
                  content={
                    <div className="flex flex-col gap-2">
                      {task.modal_data.points.map((p: any, i: number) => (
                        <Accordion
                          key={i}
                          type="single"
                          collapsible
                          className="w-full"
                        >
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
                    </div>
                  }
                />
              </div>
              <Separator className="bg-neutral-500"></Separator>
              <div className="w-full mt-1">
                <div className="text-sm space-y-0.5 mb-2">
                  <TaskBoardTypes.TaskContentDefault
                    Icon={PiMapPinFill}
                    task_label="Inicio"
                    task_data_1={task.start.address}
                    task_data_2={task.start.ubication}
                  ></TaskBoardTypes.TaskContentDefault>
                  {task.end ? (
                    <TaskBoardTypes.TaskContentDefault
                      Icon={PiMapPinFill}
                      task_label="Fin"
                      task_data_1={task.end.address}
                      task_data_2={task.end.ubication}
                    ></TaskBoardTypes.TaskContentDefault>
                  ) : (
                    ""
                  )}
                </div>
                <TaskBoardTypes.AddressTags
                  address={task.address}
                ></TaskBoardTypes.AddressTags>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      ),
    };
  });

  return <AppTaskBoard cards={cards} tasks={taskData} />;
}
