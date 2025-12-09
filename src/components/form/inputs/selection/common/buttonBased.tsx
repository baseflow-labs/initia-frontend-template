import React from "react";
import { InputProps } from "../../..";
import Button from "../../../../core/button";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const ButtonBasedSelectionView = ({
  type,
  options,
  stacked,
  ...input
}: FinalInput) => {
  return (
    <div className={`w-100 ${stacked ? "" : "d-flex flex-wrap gap-2"}`}>
      {options?.map((option, i) => (
        <Button
          className={`${stacked ? "d-block" : ""}`}
          color="primary"
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

              input.onChange &&
                input.onChange({
                  target: { name: input.name, value: option.value },
                } as any);
            } else if (type === "checkbox") {
              let newValue: any[] = [];
              if (input.value && Array.isArray(input.value)) {
                if (input.value.includes(option.value)) {
                  newValue = input.value.filter((v) => v !== option.value);
                } else {
                  newValue = [...input.value, option.value];
                }
              } else {
                newValue = [option.value];
              }

              input.onChange &&
                input.onChange({
                  target: { name: input.name, value: newValue },
                } as any);
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
