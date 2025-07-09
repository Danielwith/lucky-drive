/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Checkbox } from "@/components/ui/checkbox";
import { SearchSelectTypes } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import Select, {
  components,
  ControlProps,
  MultiValue,
  OptionProps,
  SingleValue,
  StylesConfig,
  ValueContainerProps,
} from "react-select";

const DEFAULT_ICON = <IoMdSearch />;

const searchSelectVariants = cva("", {
  variants: {
    variant: {
      default: "",
      basic:
        "h-9 [&_.css-1p3m7a8-multiValue]:!hidden [&_.css-hlgwow]:-translate-y-[2px] [&_.css-hlgwow]:!flex [&_.css-1dyz3mf]:-translate-y-[2px] [&_.css-1wy0on6]:-translate-y-[2px] [&_.select-svg]:hidden dark:bg-input/30 border-gray-500 border rounded-md text-base shadow-xs transition-[color,box-shadow] outline-none [&:has(.css-1nmdiq5-menu)]:border-ring [&:has(.css-1nmdiq5-menu)]:ring-ring/50 [&:has(.css-1nmdiq5-menu)]:ring-[3px]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SearchSelectVariant = VariantProps<
  typeof searchSelectVariants
>["variant"];

const CustomControl: React.ComponentType<
  ControlProps<SearchSelectTypes.Option> & {
    selectProps: { iconToShow?: React.ReactNode };
  }
> = (props) => {
  const { iconToShow } = props.selectProps;
  return (
    <components.Control {...props}>
      <div className="pl-2 scale-125 select-svg">{iconToShow}</div>
      {props.children}
    </components.Control>
  );
};

const CustomOption = <OptionType, IsMulti extends boolean = false>(
  props: OptionProps<OptionType, IsMulti>
) => (
  <components.Option {...props}>
    <div className="flex w-full justify-between items-center">
      {props.label}
      <Checkbox
        key={String(props.isSelected)}
        id={props.label}
        defaultChecked={props.isSelected}
        className="mr-2 pointer-events-none"
      ></Checkbox>
    </div>
  </components.Option>
);

const CustomValueContainer = <OptionType, IsMulti extends boolean = false>(
  props: ValueContainerProps<OptionType, IsMulti>
) => {
  const { children, getValue, selectProps } = props;
  const selected = getValue() as OptionType[];
  const labels = selected.map((v: any) => v.label).join(", ");
  const inputVal = selectProps.inputValue;
  const showPlaceholder = selected.length === 0 && !inputVal;
  const childArray: any = children;

  return (
    <components.ValueContainer {...props}>
      {selected.length > 0
        ? labels
        : showPlaceholder
        ? selectProps.placeholder
        : null}
      {childArray[1]}
    </components.ValueContainer>
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
  isMulti = false,
  icon,
}) => {
  const iconToShow = icon ?? DEFAULT_ICON;
  const selectedValue = isMulti
    ? options.filter((opt) => Array.isArray(value) && value.includes(opt.value))
    : options.find((opt) => opt.value === value) ?? null;

  useEffect(() => {
    if (autoSelectFirst && !value && options.length > 0 && onChange) {
      if (isMulti) {
        onChange([options[0].value] as string[]);
      } else {
        onChange(options[0].value);
      }
    }
  }, [autoSelectFirst, value, options, onChange, isMulti]);

  const handleChange = (
    option:
      | SingleValue<SearchSelectTypes.Option>
      | MultiValue<SearchSelectTypes.Option>
  ) => {
    if (!onChange) return;

    if (isMulti) {
      const vals: string[] = (
        option as MultiValue<SearchSelectTypes.Option>
      ).map((o) => o.value);
      onChange(vals);
    } else {
      // option es SingleValue<Option>
      const single: string =
        (option as SingleValue<SearchSelectTypes.Option>)?.value ?? "";
      onChange(single);
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
      color: isSelected && !isMulti ? "white" : "black",
      backgroundColor: isSelected && !isMulti ? "#6750A4" : "",
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
    }),
  };

  const selectComponents: any = {
    DropdownIndicator: () => null,
    IndicatorSeparator: () => null,
    Control: CustomControl,
  };
  if (isMulti) {
    selectComponents.Option = CustomOption;
    selectComponents.ValueContainer = CustomValueContainer;
  }

  return (
    <Select<SearchSelectTypes.Option, boolean>
      className={cn(
        searchSelectVariants({
          variant,
        }),
        className
      )}
      options={options}
      placeholder={placeholder}
      styles={colourStyles}
      onChange={handleChange as any}
      value={selectedValue as any}
      isDisabled={isDisabled}
      isClearable={true}
      isMulti={isMulti}
      closeMenuOnSelect={!isMulti}
      hideSelectedOptions={false}
      noOptionsMessage={() => "No hay resultados"}
      components={selectComponents}
      {...{ iconToShow }}
    />
  );
};
