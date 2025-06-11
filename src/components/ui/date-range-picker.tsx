import * as React from "react";
import { FiCalendar } from "react-icons/fi";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { es } from "date-fns/locale";

interface DateRangePickerProps {
  label?: string;
  value?: DateRange;
  onChange?: (range: DateRange) => void;
}

export default function DateRangePicker({
  label = "",
  value,
  onChange,
}: DateRangePickerProps) {
  const [uncontrolledRange, setUncontrolledRange] = React.useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const range = value ?? uncontrolledRange;

  const formattedRange = React.useMemo(() => {
    if (range?.from && range.to) {
      return `${range.from.toLocaleDateString(
        "es-PE"
      )} - ${range.to.toLocaleDateString("es-PE")}`;
    }
    return "Seleccione rango de fechas";
  }, [range]);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="dates" className="px-1">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="dates"
            className="w-56 justify-between font-normal"
          >
            {formattedRange}
            <FiCalendar />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            captionLayout="dropdown"
            locale={es}
            onSelect={(range) => {
              if (onChange) {
                onChange(range as DateRange);
              } else {
                setUncontrolledRange(range as DateRange);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
