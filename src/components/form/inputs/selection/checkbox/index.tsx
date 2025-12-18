import React from "react";

import { InputProps } from "../../..";
import ButtonBasedSelectionView from "../common/buttonBased";
import CardBasedSelectionView from "../common/cardBased";
import ImageBasedSelectionView from "../common/imageBased";
import DefaultCheckboxesInput from "./default";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxesInput: React.FC<FinalInput> = ({
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
          type="checkbox"
        />
      );
    case "image":
      return (
        <ImageBasedSelectionView
          {...input}
          stacked={stacked}
          options={options}
          type="checkbox"
        />
      );
    case "button":
      return (
        <ButtonBasedSelectionView
          {...input}
          stacked={stacked}
          options={options}
          type="checkbox"
        />
      );
    default:
      return (
        <DefaultCheckboxesInput
          {...input}
          stacked={stacked}
          options={options}
          type="checkbox"
        />
      );
  }
};

export default CheckboxesInput;
