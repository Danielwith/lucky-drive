import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroupTypes } from "@/lib/types/types";

export default function GenericRadioGroup({
  value,
  data,
  onChange,
  className,
}: RadioGroupTypes.props) {
  return (
    <RadioGroup className={className} value={value} onValueChange={onChange}>
      {data.map((item) => (
        <div
          key={item.value}
          className="flex items-center justify-between gap-3"
        >
          <Label className="grow text-white" htmlFor={item.value}>
            {item.label}
          </Label>
          <RadioGroupItem
            className="border-white border-2"
            value={item.value}
            id={item.value}
          />
        </div>
      ))}
    </RadioGroup>
  );
}
