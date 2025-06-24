import React from "react";
import { IoMdSearch } from "react-icons/io";
import Select, {
  components,
  ControlProps,
  SingleValue,
  StylesConfig,
} from "react-select";

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

const CustomControl = (props: ControlProps<Option, false>) => {
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

export const SearchSelect: React.FC<SearchSelectProps> = ({
  options,
  placeholder = "Buscar...",
  onChange,
  className,
}) => {
  const handleChange = (selectedOption: SingleValue<Option>) => {
    if (selectedOption && onChange) {
      onChange(selectedOption.value);
      console.log(selectedOption);
    }
  };

  const colourStyles: StylesConfig<Option> = {
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
    <Select<Option>
      className={className}
      options={options}
      placeholder={placeholder}
      styles={colourStyles}
      onChange={handleChange}
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
