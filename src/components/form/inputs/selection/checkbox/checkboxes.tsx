import React from "react";

import { InputProps } from "../../..";
import CardBasedSelectionView from "../common/cardBased";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxesInput: React.FC<FinalInput> = ({
  type,
  options,
  stacked,
  layout = "default",
  ...input
}) => {
  switch (layout) {
    case "card":
      return (
        <CardBasedSelectionView
          {...input}
          stacked={stacked}
          options={options}
          type="checkbox"
        />
      );
    default:
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
  }
};

export default CheckboxesInput;
