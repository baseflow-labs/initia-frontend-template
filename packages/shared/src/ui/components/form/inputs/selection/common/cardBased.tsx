import React from "react";
import { InputProps } from "../../..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const CardBasedSelectionView = ({ type, options, stacked, ...input }: FinalInput) => {
  return (
    <div className={`w-100 ${stacked ? "" : "d-flex flex-wrap gap-2"}`}>
      {options?.map((option, i) => (
        <div
          className={`card my-2 text-center ${stacked ? "d-block" : ""} ${
            (input.value && type === "radio" && input.value === option.value) ||
            (input.value &&
              type === "checkbox" &&
              Array.isArray(input.value) &&
              input.value.includes(option.value))
              ? "border border-2 border-primary"
              : ""
          }`}
          key={i}
        >
          <div className="card-body">
            <label className="form-check-label d-block h5">
              {option.icon && <FontAwesomeIcon icon={option.icon} />}

              {option.label}
            </label>

            {option.description && (
              <label className="form-check-label d-block">{option.description}</label>
            )}

            <input
              {...input}
              value={option.value}
              checked={
                type === "radio"
                  ? input.value === option.value
                  : input.value && Array.isArray(input.value)
                    ? input.value.includes(option.value)
                    : false
              }
              type={type}
              className="form-check-input d-block mx-auto mt-3"
              required={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardBasedSelectionView;
