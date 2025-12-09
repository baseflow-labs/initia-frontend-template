import React, { Fragment } from "react";

import { InputProps } from "../../..";
import CardBasedSelectionView from "../common/cardBased";
import ImageBasedSelectionView from "../common/imageBased";
import ButtonBasedSelectionView from "../common/buttonBased";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const RadioInput: React.FC<FinalInput> = ({
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
          type="radio"
        />
      );
    case "image":
      return (
        <ImageBasedSelectionView
          {...input}
          stacked={stacked}
          options={options}
          type="radio"
        />
      );
    case "button":
      return (
        <ButtonBasedSelectionView
          {...input}
          stacked={stacked}
          options={options}
          type="radio"
        />
      );
    default:
      return (
        <Fragment>
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

                <label className="form-check-label">
                  {option.label || option.value}
                </label>
              </div>
            ))}
          </span>
        </Fragment>
      );
  }
};

export default RadioInput;
