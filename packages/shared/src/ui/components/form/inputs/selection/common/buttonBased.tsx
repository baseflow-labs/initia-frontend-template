import React from "react";

import { InputProps } from "../../..";
import Button from "../../../../core/button";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

type OptionValue = string | number;
type Option = { value: OptionValue; label?: string };

const ButtonBasedSelectionView = ({ type, options, stacked, ...input }: FinalInput) => {
  return (
    <div className={`w-100 ${stacked ? "" : "d-flex flex-wrap gap-2"}`}>
      {(options as Option[] | undefined)?.map((option, i) => (
        <Button
          className={`${stacked ? "d-block" : ""}`}
          outline={
            (input.value && type === "radio" && input.value === option.value) ||
            (input.value &&
              type === "checkbox" &&
              Array.isArray(input.value) &&
              input.value.includes(option.value))
              ? false
              : true
          }
          onClick={() => {
            if (type === "radio") {
              if (input.value === option.value) return;
              if (input.onChange) {
                const synthetic = {
                  target: { name: input.name, value: option.value },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                input.onChange(synthetic);
              }
            } else if (type === "checkbox") {
              const current: OptionValue[] = Array.isArray(input.value)
                ? (input.value as OptionValue[])
                : [];
              const newValue: OptionValue[] = current.includes(option.value)
                ? current.filter((v: OptionValue) => v !== option.value)
                : [...current, option.value];
              if (input.onChange) {
                const synthetic = {
                  target: { name: input.name, value: newValue },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                input.onChange(synthetic);
              }
            }
          }}
          key={i}
        >
          {option.label || option.value}
        </Button>
      ))}
    </div>
  );
};

export default ButtonBasedSelectionView;
