import React from "react";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const RangeInput: React.FC<FinalInput> = (input) => {
  return (
    <input
      {...input}
      type="range"
      placeholder={input.placeholder || input.label}
      className={`w-100 form-range ${commonInputClasses}`}
    />
  );
};

export default RangeInput;
