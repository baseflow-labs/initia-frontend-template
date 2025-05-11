import React from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";
import { ValidatedInput } from "../Input";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  ...input
}) => {
  const { t } = useTranslation();

  return (
    <select
      {...input}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={`form-select form-select-sm ${commonInputClasses}`}
    >
      <option value="">
        {input.placeholder || t("Global.Labels.PleaseSelect")}
      </option>

      {input.options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label ?? option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
