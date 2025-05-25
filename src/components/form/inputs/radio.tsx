import React, { Fragment } from "react";

import { InputProps } from "..";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const RadioInput: React.FC<FinalInput> = ({ type, options, ...input }) => {
  return (
    <Fragment>
      {options?.map((option) => (
        <div className="form-check" key={option.value}>
          <input
            {...input}
            checked={input.value === option.value}
            type="radio"
            className="form-check-input"
            required={false}
          />

          <label className="form-check-label">
            {option.label || option.value}
          </label>
        </div>
      ))}
    </Fragment>
  );
};

export default RadioInput;
