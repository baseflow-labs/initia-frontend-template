import React from "react";
import { InputProps } from "../..";
import CheckboxInput from "./checkbox";
import ButtonBasedBooleanInputView from "./button";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const BooleanInput: React.FC<FinalInput> = ({
  type,
  options,
  stacked,
  layout = "default",
  ...input
}) => {
  switch (layout) {
    case "button":
      return <ButtonBasedBooleanInputView {...input} />;
    default:
      return <CheckboxInput {...input} type="checkbox" />;
  }
};

export default BooleanInput;
