import React from "react";
import { InputProps } from "../..";
import StarsInput from "./stars";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const RatingInput: React.FC<FinalInput> = ({
  layout = "default",
  ...input
}) => {
  switch (layout) {
    default:
      return <StarsInput {...input} />;
  }
};

export default RatingInput;
