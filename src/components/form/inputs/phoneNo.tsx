import React from "react";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";
import { useField } from "formik";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const PhoneNoInput: React.FC<FinalInput> = ({ name, type, ...input }) => {
  const [, , helpers] = useField(name);

  return (
    <input
      {...input}
      onChange={(e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) helpers.setValue(val);
      }}
      minLength={9}
      maxLength={9}
      placeholder={input.placeholder || "501234567" || input.label}
      className={`form-control form-control-sm ${commonInputClasses}`}
    />
  );
};

export default PhoneNoInput;
