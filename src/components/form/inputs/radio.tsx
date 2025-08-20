import React, { Fragment } from "react";

import { InputProps } from "..";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> & { row?: boolean };

const RadioInput: React.FC<FinalInput> = ({
  type,
  options,
  row = true,
  ...input
}) => {
  return (
    <Fragment>
      <span className={row ? "d-flex" : undefined}>
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

            <label className="form-check-label">
              {option.label || option.value}
            </label>
          </div>
        ))}
      </span>
    </Fragment>
  );
};

export default RadioInput;
