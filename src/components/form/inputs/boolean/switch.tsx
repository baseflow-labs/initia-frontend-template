import React from "react";
import { InputProps } from "../..";
import { useTranslation } from "react-i18next";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const SwitchBasedBooleanInputView: React.FC<FinalInput> = ({
  type,
  ...input
}) => {
  const { t } = useTranslation();

  return (
    <div className="form-check form-switch my-1">
      <input
        {...input}
        value={input.value}
        checked={input.checked}
        type="checkbox"
        role="switch"
        className="form-check-input"
        required={false}
      />

      <label className="form-check-label">
        {input.value
          ? input.booleanLabels?.trueLabel || t("Global.Form.Labels.Yes")
          : input.booleanLabels?.falseLabel || t("Global.Form.Labels.No")}
      </label>
    </div>
  );
};

export default SwitchBasedBooleanInputView;
