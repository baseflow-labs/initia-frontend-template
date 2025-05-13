import React from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput: React.FC<FinalInput> = (input) => {
  const { t } = useTranslation();

  return (
    <select
      {...input}
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
