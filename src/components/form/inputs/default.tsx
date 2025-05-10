import React from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { ValidatedInput } from "../Input";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const DefaultInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
  const { t } = useTranslation();

  return (
    <input
      {...input}
      type={type}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      placeholder={input.placeholder || input.label}
      className={`form-control form-control-sm ${commonInputClasses}`}
    />
  );
};

export default DefaultInput;
