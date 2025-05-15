import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import Select, { components, StylesConfig, MultiValue } from "react-select";
import { useField } from "formik";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";

interface OptionType {
  value: string;
  label: string;
}

interface SelectManyInputProps extends InputProps {
  placeholder?: string;
}

const SelectManyInput: React.FC<SelectManyInputProps> = ({
  name,
  options,
  placeholder,
}) => {
  const { t } = useTranslation();
  const [field, , helpers] = useField<string[]>(name);

  const reactSelectOptions =
    options?.map(({ value, label }) => ({
      value: String(value),
      label: label || String(value),
    })) || [];

  const valueAsArray = field.value
    ? reactSelectOptions.filter((opt) =>
        (field.value as string[]).includes(opt.value)
      )
    : [];

  const handleChange = (selected: MultiValue<OptionType>) => {
    helpers.setValue(selected.map((opt) => opt.value));
  };

  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          backgroundColor: "var(--bs-info)",
          borderRadius: "20%",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 15,
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </components.DropdownIndicator>
  );

  const MultiValueRemove = (props: any) => (
    <components.MultiValueRemove {...props}>
      <div
        style={{
          backgroundColor: "var(--bs-danger)",
          borderRadius: "50%",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 8,
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </components.MultiValueRemove>
  );

  const customStyles: StylesConfig<OptionType> = {
    control: (base) => ({
      ...base,
      padding: 6,
      borderRadius: 7,
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--bs-info)",
      },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "transparent",
      border: `1px solid var(--bs-info)`,
      borderRadius: 6,
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "var(--bs-info)",
      padding: 0,
      margin: "auto 4px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      padding: 0,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 6,
    }),
    menu: (base) => ({ ...base, zIndex: 3 }),
  };

  return (
    <Select
      name={name}
      isMulti
      value={valueAsArray}
      onChange={handleChange}
      styles={customStyles}
      placeholder={placeholder || t("Global.Form.Labels.PleaseSelect")}
      className={`w-100 px-0 ${commonInputClasses}`}
      options={reactSelectOptions}
      components={{
        DropdownIndicator,
        MultiValueRemove,
      }}
    />
  );
};

export default SelectManyInput;
