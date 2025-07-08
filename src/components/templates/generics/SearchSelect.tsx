import { SearchSelectTypes } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import Select, {
  components,
  ControlProps,
  SingleValue,
  StylesConfig,
} from "react-select";

const DEFAULT_ICON = <IoMdSearch />;

const searchSelectVariants = cva("", {
  variants: {
    variant: {
      default: "",
      basic:
        "h-9 [&_.css-hlgwow]:-translate-y-[2px] [&_svg]:hidden dark:bg-input border-input border rounded-md text-base shadow-xs transition-[color,box-shadow] outline-none [&:has(.css-1nmdiq5-menu)]:border-ring [&:has(.css-1nmdiq5-menu)]:ring-ring/50 [&:has(.css-1nmdiq5-menu)]:ring-[3px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SearchSelectVariant = VariantProps<
  typeof searchSelectVariants
>["variant"];

const CustomControl = (
  props: ControlProps<SearchSelectTypes.Option, false> & {
    selectProps: { iconToShow?: React.ReactNode };
  }
) => {
  const { iconToShow } = props.selectProps;
  return (
    <components.Control {...props}>
      <div className="pl-2 scale-125">{iconToShow}</div>

      {/* El resto del input */}
      {props.children}
    </components.Control>
  );
};

export const SearchSelect: React.FC<SearchSelectTypes.props> = ({
  options,
  variant,
  placeholder = "Buscar...",
  onChange,
  value,
  className,
  isDisabled = false,
  autoSelectFirst = false,
  icon,
}) => {
  const iconToShow = icon ?? DEFAULT_ICON;
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  useEffect(() => {
    if (autoSelectFirst && !value && options.length > 0 && onChange) {
      onChange(options[0].value);
    }
  }, [autoSelectFirst, value, options, onChange]);

  const handleChange = (option: SingleValue<SearchSelectTypes.Option>) => {
    if (onChange) {
      onChange(option ? option.value : "");
      console.log(option);
    }
  };

  const colourStyles: StylesConfig<SearchSelectTypes.Option> = {
    input: (styles) => ({
      ...styles,
      color: "white",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "white",
    }),
    control: (styles) => ({
      ...styles,
      borderRadius: 0,
      backgroundColor: "transparent",
      border: 0,
      boxShadow: "unset",
    }),
    option: (styles, { isSelected }) => ({
      ...styles,
      color: isSelected ? "white" : "black",
      backgroundColor: isSelected ? "#6750A4" : "",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
    }),
  };

  return (
    <Select<SearchSelectTypes.Option>
      className={cn(
        searchSelectVariants({
          variant,
        }),
        className
      )}
      options={options}
      placeholder={placeholder}
      styles={colourStyles}
      onChange={handleChange}
      value={selectedOption}
      isDisabled={isDisabled}
      isClearable={true}
      noOptionsMessage={() => "No hay resultados"}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        Control: CustomControl,
      }}
      {...{ iconToShow }}
    />
  );
};
