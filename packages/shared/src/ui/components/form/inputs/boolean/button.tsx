import React from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "../..";
import Button from "../../../core/button";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const ButtonBasedBooleanInputView = ({ ...input }: FinalInput) => {
  const { t } = useTranslation();

  return (
    <div className="w-100">
      <Button
        color="primary"
        outline={!!input.value}
        onClick={() => {
          if (input.onChange) {
            const synthetic = {
              target: { name: input.name, value: !input.value },
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            input.onChange(synthetic);
          }
        }}
      >
        {input.value
          ? input.booleanLabels?.trueLabel || t("Global.Form.Labels.Yes")
          : input.booleanLabels?.falseLabel || t("Global.Form.Labels.No")}
      </Button>
    </div>
  );
};

export default ButtonBasedBooleanInputView;
