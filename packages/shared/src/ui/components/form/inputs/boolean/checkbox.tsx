import React from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "../..";

type FinalInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"] | boolean;
} & InputProps;

const CheckboxInput: React.FC<FinalInput> = ({ value, ...input }) => {
  const { t } = useTranslation();
  const isChecked = typeof value === "string" ? value === "true" : Boolean(value);

  return (
    <div className="form-check my-1">
      <input
        {...input}
        checked={input.checked ?? isChecked}
        type="checkbox"
        className="form-check-input"
        required={false}
      />

      <label className="form-check-label">
        {(input.checked ?? isChecked)
          ? input.booleanLabels?.trueLabel || t("Global.Form.Labels.Yes")
          : input.booleanLabels?.falseLabel || t("Global.Form.Labels.No")}
      </label>
    </div>
  );
};

export default CheckboxInput;
