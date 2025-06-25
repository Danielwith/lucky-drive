import { SearchSelectTypes } from "@/lib/types/types";
import React, { useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import Select, {
  components,
  ControlProps,
  SingleValue,
  StylesConfig,
} from "react-select";

const CustomControl = (
  props: ControlProps<SearchSelectTypes.Option, false>
) => {
  return (
    <components.Control {...props}>
      <div className="pl-2 scale-125">
        <IoMdSearch />
      </div>

      {/* El resto del input */}
      {props.children}
    </components.Control>
  );
};

export const SearchSelect: React.FC<SearchSelectTypes.props> = ({
  options,
  placeholder = "Buscar...",
  onChange,
  value,
  className,
  isDisabled = false,
  autoSelectFirst = false,
}) => {
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
      className={className}
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
    />
  );
};
