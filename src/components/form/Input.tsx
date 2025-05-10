import React, { ChangeEvent, FocusEvent } from "react";
import { InputProps } from ".";

interface ValidatedInput {
  value?: string | number;
  handleChange?: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  handleBlur?: {
    (e: FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

type finalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const InputComp: React.FC<finalInput> = (input) => {
  if (input.type === "select" && input.options) {
    return (
      <select
        name={input.name}
        value={input.value}
        onChange={input.handleChange}
        onBlur={input.handleBlur}
        className="form-select rounded-2 px-3 py-2"
        key={input.name}
      >
        <option value="">Select...</option>
        {input.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
    );
  }

  if (input.type === "phoneNumber") {
    return (
      <input
        type="number"
        name={input.name}
        onChange={input.handleChange}
        onBlur={input.handleBlur}
        value={input.value}
        className="form-control rounded-2 px-3 py-2"
        key={input.name}
      />
    );
  }

  return (
    <input
      type={input.type}
      name={input.name}
      onChange={input.handleChange}
      onBlur={input.handleBlur}
      value={input.value}
      className="form-control rounded-2 px-3 py-2"
      key={input.name}
    />
  );
};

export default InputComp;
