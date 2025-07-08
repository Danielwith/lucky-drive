import { DataTable } from "@/components/templates/AppDataTable";
import GenericSelect from "@/components/templates/generics/GenericSelect";
import { SearchSelect } from "@/components/templates/generics/SearchSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import {
  DataTableTypes,
  RequestCourierTypes,
  RequestTaxiExpressTypes,
  SelectTypes,
  TaskBoardTypes,
  TripHistoryTypes,
} from "@/lib/types/types";
import { fetchTripHistoryData } from "@/services/trip_history_data_service";
import { CalendarClock } from "lucide-react";
import { memo } from "react";
import { BiHelpCircle } from "react-icons/bi";
import { IoIosCloseCircle } from "react-icons/io";
import { MdLinearScale, MdPayments } from "react-icons/md";
import { PiMapPinFill } from "react-icons/pi";
import { RiBox3Line } from "react-icons/ri";
import { TbHandStop, TbWeight } from "react-icons/tb";
import { HiOutlineUser } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function TripHistory() {
  const data = fetchTripHistoryData();
  const tableActions: DataTableTypes.TableActions[] = [];
  const status: TripHistoryTypes.TripStatus[] = ["Cancelado", "Finalizado"];

  const select: SelectTypes.SelectData[] = status.map((e) => ({
    label: e,
    value: e,
  }));

  return (
    <div className={twMerge("container h-full max-w-full")}>
      <DataTable
        columns={TripHistoryTypes.columns}
        data={data}
        actions={tableActions}
        sheetname="HISTORIAL_VIAJES"
        customFilters={(table) => (
          <>
            <GenericSelect
              placeholder="Estado"
              data={select}
              onChange={(value) => {
                table.getColumn("estado")?.setFilterValue(value);
              }}
            ></GenericSelect>
            <DatePicker
              onChange={(date) => {
                table.getColumn("fecha_hora")?.setFilterValue(date);
              }}
              label={""}
            ></DatePicker>
          </>
        )}
      />
    </div>
  );
}

interface TripDetailModalProps {
  data: TripHistoryTypes.Trip;
  close: () => void;
}

export const TripDetailModal = memo(function TripDetailModal({
  data,
  close,
}: TripDetailModalProps) {
  const detail: TripHistoryTypes.ModalData = data.modal_data;

  return (
    <div className="w-[568px] px-4 py-2.5 flex flex-col space-y-1 text-gray-200">
      <div className="flex justify-between items-center text-sm">
        <span>{data.id}</span>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={String(data.id)}>
          <div className="relative">
            <h3 className="font-bold flex items-center gap-1 text-xl my-4">
              <p className="max-w-full">{data.usuario}</p>
            </h3>
          </div>
          <div className="flex flex-col gap-1.5 text-sm mb-2">
            <div className="flex items-center">
              <span className="text-neutral-400">Estado:&nbsp;</span>
              {data.estado}
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-neutral-400">Observaciones:&nbsp;</span>
              </div>
              {detail.observation}
            </div>
          </div>
          <Separator className="bg-neutral-500" />
          <>
            {(() => {
              switch (data.modo) {
                case "Taxi":
                  return (
                    <div className="flex gap-1 flex-col my-1.5">
                      <div className="flex items-center gap-2 justify-between text-sm">
                        <div className="flex items-center">
                          <MdLinearScale className="w-4 h-4 mr-1"></MdLinearScale>
                          <span className="text-neutral-400">
                            Distancia:&nbsp;
                          </span>
                          {detail.distance}
                        </div>
                        <div className="flex items-center">
                          <MdPayments className="w-4 h-4 mr-1"></MdPayments>
                          <span className="text-neutral-400">
                            Costo total:&nbsp;
                          </span>
                          S/
                          {detail.points
                            .reduce(
                              (sum, point) => sum + (point.amount ?? 0),
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <MdLinearScale className="w-4 h-4 mr-1"></MdLinearScale>
                        <span className="text-neutral-400">Ppto:&nbsp;</span>
                        {detail.ppto}
                      </div>
                    </div>
                  );
                case "Courier":
                  return (
                    <div className="flex gap-1 flex-col my-1.5">
                      <div className="flex items-center gap-2 justify-between text-sm">
                        <div className="flex items-center">
                          <MdLinearScale className="w-4 h-4 mr-1"></MdLinearScale>
                          <span className="text-neutral-400">Ppto:&nbsp;</span>
                          {detail.ppto}
                        </div>
                        <div className="flex items-center">
                          <MdPayments className="w-4 h-4 mr-1"></MdPayments>
                          <span className="text-neutral-400">
                            Costo total:&nbsp;
                          </span>
                          S/
                          {detail.points
                            .reduce(
                              (sum, point) => sum + (point.amount ?? 0),
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                case "Taxi express":
                  return (
                    <div className="flex gap-1 flex-col my-1.5">
                      <div className="flex items-center gap-2 justify-between text-sm">
                        <div className="flex items-center">
                          <MdLinearScale className="w-4 h-4 mr-1"></MdLinearScale>
                          <span className="text-neutral-400">Ppto:&nbsp;</span>
                          {detail.ppto}
                        </div>
                        <div className="flex items-center">
                          <MdPayments className="w-4 h-4 mr-1"></MdPayments>
                          <span className="text-neutral-400">
                            Costo total:&nbsp;
                          </span>
                          S/
                          {detail.points
                            .reduce(
                              (sum, point) => sum + (point.amount ?? 0),
                              0
                            )
                            .toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
          </>
        </AccordionItem>
      </Accordion>

      {/* Contenido */}
      <>
        {(() => {
          switch (data.modo) {
            case "Taxi":
              return (
                <div className="flex flex-col gap-2">
                  {detail.points.map((p: any, i: number) => (
                    <Accordion
                      key={`ACCTAXI_${i}`}
                      type="single"
                      collapsible
                      className="w-full"
                    >
                      <AccordionItem value={`${data.id}_${i}`}>
                        <AccordionTrigger className="p-0 [&>svg]:hidden hover:bg-[#554e65] hover:no-underline">
                          <div className="w-full grid grid-cols-[auto_1fr_auto] border border-[#837f8c] rounded-md p-2 flex-wrap justify-between gap-2 items-center">
                            <div className="flex items-center px-2 w-[80px] justify-center">
                              <PiMapPinFill className="min-w-5 min-h-5 mr-2"></PiMapPinFill>
                              <span className="break-all">{p.label}</span>
                            </div>
                            <div>
                              <p>{p.address}</p>
                              <p className="font-bold">{p.ubication}</p>
                            </div>
                            <div>
                              <span>
                                {typeof p.amount === "number"
                                  ? `S/${p.amount.toFixed(2)}`
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </AccordionTrigger>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>
              );
            case "Courier":
              return (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full flex flex-col gap-2 max-h-[40vh] overflow-y-auto"
                >
                  {detail.points.map((p: TripHistoryTypes.Point, i: number) => (
                    <AccordionItem
                      value={`${data.id}_${i}`}
                      key={`ACCCOURIER_${i}`}
                    >
                      <AccordionTrigger className="p-0 [&>svg]:hidden hover:bg-[#554e65] hover:no-underline">
                        <div className="w-full flex flex-col border border-[#837f8c] rounded-md p-2 flex-wrap justify-between gap-2 items-center">
                          <div className="w-full grid grid-cols-[auto_1fr_auto_auto_auto] items-center justify-between gap-3">
                            <div className="flex items-center px-2 w-[80px] justify-center">
                              <PiMapPinFill className="min-w-5 min-h-5 mr-2"></PiMapPinFill>
                              <span className="break-all">{p.label}</span>
                            </div>
                            <span>{p.address}</span>
                            <span className="font-bold">{p.ubication}</span>
                            <span>S/{p.amount?.toFixed(2)}</span>
                            <div>
                              <span
                                className={`inline-block border border-[#837f8c] text-[10px] p-1 rounded-[5px]`}
                              >
                                {p.completed}/{p.courier_items?.length}
                              </span>
                            </div>
                          </div>
                          <AccordionContent className="pb-0">
                            {p.courier_items?.map(
                              (e: RequestCourierTypes.Item, i: number) => (
                                <div
                                  key={i}
                                  className="w-full flex border border-[#837f8c] rounded-md py-2 px-6 flex-wrap gap-2 items-center mt-2"
                                >
                                  <div className="w-full flex flex-row flex-wrap items-center justify-between">
                                    <p className="max-w-[calc(100%-8px)] text-sm">
                                      <RiBox3Line className="inline mr-2 text-xl -translate-y-0.5" />
                                      {e.label}
                                    </p>
                                    <span
                                      // ${color}
                                      className={`min-w-2 min-h-2 inline-block  rounded-full`}
                                    />
                                  </div>
                                  <div className="w-full m-2">
                                    <div className="flex flex-row flex-wrap justify-between">
                                      <span className="flex flex-row items-center gap-2">
                                        <TbWeight className="text-xl" />
                                        {e.weight}
                                      </span>
                                      <span className="flex flex-row items-center gap-2">
                                        <TbHandStop className="text-xl" />
                                        Entregar
                                      </span>
                                    </div>
                                    <div className="grid grid-flow-col gap-2 items-center mt-2">
                                      <BiHelpCircle className="text-xl" />
                                      <p className="w-full ">{e.instruction}</p>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </AccordionContent>
                        </div>
                      </AccordionTrigger>
                    </AccordionItem>
                  ))}
                </Accordion>
              );
            case "Taxi express":
              return (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full flex flex-col gap-2"
                >
                  {detail.points.map((p: TripHistoryTypes.Point, i: number) => (
                    <AccordionItem
                      value={`${data.id}_${i}`}
                      key={`ACCCOURIER_${i}`}
                    >
                      <AccordionTrigger className="p-0 [&>svg]:hidden hover:bg-[#554e65] hover:no-underline">
                        <div className="w-full flex flex-col border border-[#837f8c] rounded-md p-2 flex-wrap justify-between items-center">
                          <div className="w-full grid grid-cols-[auto_1fr_auto_auto_auto] items-center justify-between gap-2">
                            <div className="flex items-center px-2 w-[80px] justify-center">
                              <PiMapPinFill className="min-w-5 min-h-5 mr-2"></PiMapPinFill>
                              <span className="break-all">{p.label}</span>
                            </div>
                            {p.amount ? (
                              <>
                                <span>{p.address}</span>
                                <span className="font-bold">{p.ubication}</span>
                                <span>S/{p.amount?.toFixed(2)}</span>
                              </>
                            ) : (
                              <div>
                                <p>{p.address}</p>
                                <p className="font-bold">{p.ubication}</p>
                              </div>
                            )}

                            {p.taxi_express_items ? (
                              <div>
                                <span
                                  className={`inline-block border border-[#837f8c] text-[10px] p-1 rounded-[5px]`}
                                >
                                  {p.completed}/{p.taxi_express_items.length}
                                </span>
                              </div>
                            ) : (
                              <div className="w-[33px]"></div>
                            )}
                          </div>
                          <div className="w-full">
                            {p.taxi_express_items ? (
                              <AccordionContent className="w-full pb-0 mt-4">
                                {p.taxi_express_items.map(
                                  (
                                    e: RequestTaxiExpressTypes.Item,
                                    i: number
                                  ) => (
                                    <div
                                      key={i}
                                      className="w-full flex border border-[#837f8c] rounded-md py-2 px-6 flex-wrap gap-2 items-center mt-2"
                                    >
                                      <div className="w-full flex flex-row flex-wrap items-center justify-between">
                                        <p className="max-w-[calc(100%-8px)] text-sm">
                                          <RiBox3Line className="inline mr-2 text-xl -translate-y-0.5" />
                                          {e.label}
                                        </p>
                                        {/* ${color} */}
                                        <span
                                          className={`min-w-2 min-h-2 inline-block  rounded-full`}
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                              </AccordionContent>
                            ) : null}
                          </div>
                        </div>
                      </AccordionTrigger>
                    </AccordionItem>
                  ))}
                </Accordion>
              );
            default:
              return null;
          }
        })()}
      </>

      <div className="text-sm font-medium my-2 flex gap-1 flex-col">
        <TaskBoardTypes.TaskContentDefault
          Icon={CalendarClock}
          task_label={"Inicio:"}
          task_data_1={" "}
          task_data_2={detail.finished_date?.start ?? "-"}
          between={false}
        />
        <TaskBoardTypes.TaskContentDefault
          Icon={CalendarClock}
          task_label={"Fin:"}
          task_data_1={" "}
          task_data_2={detail.finished_date?.end ?? "-"}
          between={false}
        />
      </div>

      <div className="mt-3">
        <SearchSelect
          className="w-full border-2 border-[#68548E] placeholder:text-white"
          options={
            detail.selected_driver
              ? [
                  {
                    label: detail.selected_driver,
                    value: detail.selected_driver,
                  },
                ]
              : []
          }
          value={detail.selected_driver ?? ""}
          autoSelectFirst
          isDisabled
          icon={<HiOutlineUser />}
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
      </div>
    </div>
  );
});
