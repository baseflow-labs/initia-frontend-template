import React from "react";

import { InputProps } from "..";
import { commonInputClasses } from "../../../../utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const PhoneNoInput: React.FC<FinalInput> = ({ name, ...input }) => {
  return (
    <input
      {...input}
      onChange={(e) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return;
        if (typeof input.onChange === "function") {
          input.onChange({
            target: { name, value: val },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      }}
      maxLength={9}
      placeholder={input.placeholder || "501234567" || input.label}
      className={`form-control form-control-sm ${commonInputClasses}`}
    />
  );
};

export default PhoneNoInput;
