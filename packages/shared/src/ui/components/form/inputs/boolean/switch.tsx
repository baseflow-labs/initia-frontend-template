import React from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "../..";

type FinalInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> & {
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"] | boolean;
} & InputProps;

const SwitchBasedBooleanInputView: React.FC<FinalInput> = ({ value, booleanLabels, ...input }) => {
  const { t } = useTranslation();
  const isChecked = typeof value === "string" ? value === "true" : Boolean(value);

  return (
    <div className="form-check form-switch my-1">
      <input
        {...input}
        checked={input.checked ?? isChecked}
        type="checkbox"
        role="switch"
        className="form-check-input"
        required={false}
      />

      <label className="form-check-label">
        {(input.checked ?? isChecked)
          ? booleanLabels?.trueLabel || t("Global.Form.Labels.Yes")
          : booleanLabels?.falseLabel || t("Global.Form.Labels.No")}
      </label>
    </div>
  );
};

export default SwitchBasedBooleanInputView;
