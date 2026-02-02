import React from "react";
import { commonInputClasses } from "src/utils/consts";

import { InputProps } from "..";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const NumberTextInput: React.FC<FinalInput> = ({ ...input }) => {
  return (
    <input
      {...input}
      placeholder={input.placeholder || input.label}
      className={`form-control form-control-sm ${commonInputClasses}`}
    />
  );
};

export default NumberTextInput;
