import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { CalendarClock } from "lucide-react";
import { PiMapPinFill } from "react-icons/pi";
import {
  RequestTaxiTypes,
  SearchSelectTypes,
  TaskBoardTypes,
} from "@/lib/types/types";
import { AppTaskBoard, TaskModal } from "@/components/templates/AppTaskBoard";
import { MdLinearScale, MdPayments } from "react-icons/md";
import { RequestTaxiDataService } from "@/services/request_taxi_data_service";
import { useCallback, useEffect } from "react";
import { useReqTaxiTaskBoardStore } from "@/lib/store/dashboard/req_taxi_store";

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

  const TAXI_DATA = useReqTaxiTaskBoardStore((s) => s.reqTaxiData);
  const updateReqTaxiData = useReqTaxiTaskBoardStore(
    (s) => s.updateReqTaxiData
  );

  const refreshData = useCallback(() => {
    try {
      const newData = RequestTaxiDataService.fetchTaxiData();
      updateReqTaxiData(newData);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }, [updateReqTaxiData]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const taskData: TaskBoardTypes.BoardItemContent[] = TAXI_DATA.map(
    (task: RequestTaxiTypes.Task) => {
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
                    onFormAction={refreshData}
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
                            <span className="text-neutral-400">
                              Costo:&nbsp;
                            </span>
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
    }
  );

  return <AppTaskBoard cards={cards} tasks={taskData} />;
}
