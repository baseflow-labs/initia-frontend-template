import React from "react";

import { InputProps } from "../..";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> & { row?: boolean };

const CheckboxesInput: React.FC<FinalInput> = ({
  type,
  options,
  stacked,
  ...input
}) => {
  return (
    <div className={stacked ? "" : "d-flex flex-wrap"}>
      {options?.map((option, i) => (
        <div className="form-check my-2" key={i}>
          <input
            {...input}
            value={option.value}
            checked={
              input.value && Array.isArray(input.value)
                ? input.value.includes(option.value)
                : false
            }
            type="checkbox"
            className="form-check-input"
            required={false}
          />

          <label className="form-check-label">
            {option.label || option.value}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxesInput;
