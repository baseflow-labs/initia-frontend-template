import React from "react";
import { InputProps } from "..";
import { commonInputClasses } from "@/utils/consts";

type FinalInput = InputProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaInput: React.FC<FinalInput> = (input) => {
  return (
    <textarea
      {...input}
      placeholder={input.placeholder || input.label}
      className={`form-control form-control-sm ${commonInputClasses}`}
    />
  );
};

export default TextareaInput;
