import React from "react";

import { InputProps } from "../../..";
import ButtonBasedSelectionView from "../common/buttonBased";
import CardBasedSelectionView from "../common/cardBased";
import ImageBasedSelectionView from "../common/imageBased";
import DefaultRadioInput from "./default";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const RadioInput: React.FC<FinalInput> = ({ options, stacked, layout = "default", ...input }) => {
  switch (layout) {
    case "card":
      return <CardBasedSelectionView {...input} stacked={stacked} options={options} type="radio" />;
    case "image":
      return (
        <ImageBasedSelectionView {...input} stacked={stacked} options={options} type="radio" />
      );
    case "button":
      return (
        <ButtonBasedSelectionView {...input} stacked={stacked} options={options} type="radio" />
      );
    default:
      return <DefaultRadioInput {...input} stacked={stacked} options={options} type="radio" />;
  }
};

export default RadioInput;
