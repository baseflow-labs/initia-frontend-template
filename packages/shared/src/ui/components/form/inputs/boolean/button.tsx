import React from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "../..";
import Button from "../../../core/button";

type FinalInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"] | boolean;
} & InputProps;

const ButtonBasedBooleanInputView = ({ ...input }: FinalInput) => {
  const { t } = useTranslation();
  const isChecked = typeof input.value === "string" ? input.value === "true" : Boolean(input.value);

  return (
    <div className="w-100">
      <Button
        color="primary"
        outline={isChecked}
        onClick={() => {
          if (input.onChange) {
            const synthetic = {
              target: { name: input.name, value: !isChecked, checked: !isChecked },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            input.onChange(synthetic);
          }
        }}
      >
        {isChecked
          ? input.booleanLabels?.trueLabel || t("Global.Form.Labels.Yes")
          : input.booleanLabels?.falseLabel || t("Global.Form.Labels.No")}
      </Button>
    </div>
  );
};

export default ButtonBasedBooleanInputView;
