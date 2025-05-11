import React from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { ValidatedInput } from "../Input";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const PhoneNoInput: React.FC<FinalInput> = ({
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
      name={name}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) handleChange(e); // allow only digits
      }}
      minLength={9}
      maxLength={9}
      onBlur={handleBlur}
      value={value}
      placeholder={input.placeholder || "501234567" || input.label}
      className={`form-control form-control-sm ${commonInputClasses}`}
    />
  );
};

export default PhoneNoInput;
