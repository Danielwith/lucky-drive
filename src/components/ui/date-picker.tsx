/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "./button"; // ajusta la ruta
import { CalendarIcon } from "lucide-react"; // o tu ícono preferido
import { Calendar } from "./calendar";
import { useEffect, useState } from "react";
import { Label } from "./label";

type DatePickerProps = {
  label: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date) => void;
};

export function DatePicker({
  label = "",
  placeholder = "Fecha",
  value,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-1">
      {label === "" ? null : (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="min-w-48 w-auto justify-between font-normal border-gray-500 dark:bg-input/30 "
          >
            {date ? date.toLocaleDateString("es-PE") : placeholder}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 z-50 pointer-events-auto"
          align="start"
        >
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={(date) => {
              if (onChange) {
                onChange(date as Date);
                setDate(date);
              }
              setOpen(false);
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
