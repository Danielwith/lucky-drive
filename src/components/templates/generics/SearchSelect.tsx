import React, { useState, useEffect, useRef } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
};

type SearchSelectProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export const SearchSelect: React.FC<SearchSelectProps> = ({
  options,
  placeholder = "Buscar...",
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (val: string) => {
    setSelectedValue(val);
    const sel = options.find((o) => o.value === val);
    const label = sel?.label ?? "";
    setInputValue(label);
    setOpen(false);
    onChange?.(val);
  };

  const clearSelection = () => {
    setSelectedValue("");
    setInputValue("");
    setOpen(false);
    onChange?.("");
  };

  // Cerrar al click fuera
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-64", className)}>
      <Command>
        <div className="relative">
          <CommandInput
            placeholder={placeholder}
            className="h-9 pr-8"
            value={inputValue}
            onClick={() => setOpen(true)}
            onValueChange={(val) => setInputValue(val)}
          />
          {inputValue && (
            <button
              type="button"
              onClick={clearSelection}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </button>
          )}
        </div>

        {open && (
          <CommandList className="absolute top-full left-0 mt-1 w-full z-50 bg-white shadow-lg rounded-md max-h-[200px] overflow-auto">
            {filtered.length === 0 ? (
              <CommandEmpty>No se encontró resultado.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filtered.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => handleSelect(opt.value)}
                  >
                    {opt.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedValue === opt.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};
