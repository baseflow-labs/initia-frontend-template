import React from "react";

import { InputProps } from "../../..";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxInput: React.FC<FinalInput> = ({ type, ...input }) => {
  return (
    <div className="form-check my-1">
      <input
        {...input}
        value={input.value}
        checked={input.checked}
        type="checkbox"
        className="form-check-input"
        required={false}
      />

      <label className="form-check-label">{input.label}</label>
    </div>
  );
};

export default CheckboxInput;
