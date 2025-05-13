import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import Select, { components, StylesConfig } from "react-select";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectManyInput: React.FC<FinalInput> = ({
  name,
  value,
  defaultValue,
  ...input
}) => {
  const { t } = useTranslation();
  interface OptionType {
    value: string;
    label: string;
  }

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
    control: (base, state) => ({
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
      border: `1px solid ${"var(--bs-info)"}`,
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
  };

  const onChange = (e: any) => console.log({ e });

  return (
    <Select
      {...input}
      name={name}
      isMulti
      onChange={onChange}
      styles={customStyles}
      placeholder={input.placeholder || t("Global.Labels.PleaseSelect")}
      className={`w-100 px-0 ${commonInputClasses}`}
      options={input.options?.map(({ label, value }) => ({
        value: String(value),
        label: label || String(value),
      }))}
      components={{
        DropdownIndicator,
        MultiValueRemove,
      }}
    />
  );
};

export default SelectManyInput;
