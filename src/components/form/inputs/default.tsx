import React from "react";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";
import { ValidatedInput } from "../Input";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const DefaultInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
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
