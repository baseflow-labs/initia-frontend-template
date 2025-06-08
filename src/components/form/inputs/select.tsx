import React from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput: React.FC<FinalInput> = ({
  className,
  placeholder,
  options,
  sizing = "sm",
  ...input
}) => {
  const { t } = useTranslation();

  return (
    <select
      {...input}
      className={`form-select form-select-${sizing} ${commonInputClasses} ${className}`}
    >
      <option value="">
        {placeholder || t("Global.Form.Labels.PleaseSelect")}
      </option>

      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label ?? option.value}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
