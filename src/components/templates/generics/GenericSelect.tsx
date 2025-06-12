import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectTypes } from "@/lib/types/types";

export default function GenericSelect({
  label = "",
  placeholder = "Seleccionar",
  data,
  onChange,
  value,
}: SelectTypes.GenericSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="select" className="px-1">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="select" className="w-[180px] z-[999]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-[999]">
          <SelectGroup>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
