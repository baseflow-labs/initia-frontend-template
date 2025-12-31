import React from "react";

import { InputProps } from "../../..";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const DefaultRadioInput: React.FC<FinalInput> = ({ options, stacked, ...input }) => (
  <span className={stacked ? undefined : "d-flex"}>
    {options?.map((option, i) => (
      <div className="form-check my-2" key={i}>
        <input
          {...input}
          value={option.value}
          checked={input.value === option.value}
          type="radio"
          className="form-check-input"
          required={false}
        />

        <label className="form-check-label">{option.label || option.value}</label>
      </div>
    ))}
  </span>
);

export default DefaultRadioInput;
