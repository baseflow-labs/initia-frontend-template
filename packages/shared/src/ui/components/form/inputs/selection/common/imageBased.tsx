import React from "react";
import { InputProps } from "../../..";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const ImageBasedSelectionView = ({ type, options, stacked, ...input }: FinalInput) => {
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
          role="button"
          onClick={() => {
            if (type === "radio") {
              if (input.value === option.value) return;

              if (input.onChange) {
                input.onChange({
                  target: { name: input.name, value: String(option.value) },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }
            } else if (type === "checkbox") {
              let newValue: unknown[] = [];
              if (input.value && Array.isArray(input.value)) {
                if (input.value.includes(option.value)) {
                  newValue = input.value.filter((v: unknown) => v !== option.value);
                } else {
                  newValue = [...input.value, option.value];
                }
              } else {
                newValue = [option.value];
              }

              if (input.onChange) {
                input.onChange({
                  target: { name: input.name, value: newValue },
                } as unknown as React.ChangeEvent<HTMLInputElement>);
              }
            }
          }}
          key={i}
        >
          <img
            src={option.image}
            alt={option.label}
            style={{ maxWidth: "100px" }}
            className="card-img-top mx-auto"
          />

          {option.label || option.description ? (
            <div className="card-body">
              {option.label && (
                <label className="form-check-label d-block h5">{option.label}</label>
              )}

              {option.description && (
                <label className="form-check-label d-block">{option.description}</label>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageBasedSelectionView;
