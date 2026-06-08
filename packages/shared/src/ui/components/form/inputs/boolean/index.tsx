import React from "react";

import { InputProps } from "../..";

import CheckboxInput from "./checkbox";
import ButtonBasedBooleanInputView from "./button";
import SwitchBasedBooleanInputView from "./switch";

type FinalInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"] | boolean;
} & InputProps;

const BooleanInput: React.FC<FinalInput> = ({ layout = "default", ...input }) => {
  switch (layout) {
    case "button":
      return (
        <ButtonBasedBooleanInputView
          {...input}
          value={typeof input.value === "string" ? input.value === "true" : input.value}
        />
      );
    case "switch":
      return (
        <SwitchBasedBooleanInputView
          {...input}
          value={typeof input.value === "string" ? input.value === "true" : input.value}
        />
      );
    default:
      return <CheckboxInput {...input} type="checkbox" />;
  }
};

export default BooleanInput;
