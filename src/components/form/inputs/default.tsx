import React from "react";
import { InputProps } from "..";
import { commonInputClasses } from "@/utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const DefaultInput: React.FC<FinalInput> = ({ className, sizing = "sm", ...input }) => {
  return (
    <input
      {...input}
      placeholder={input.placeholder || input.label}
      className={`form-control form-control-${sizing} ${commonInputClasses} ${className}`}
    />
  );
};

export default DefaultInput;
