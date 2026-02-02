import React from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "../..";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const CheckboxInput: React.FC<FinalInput> = ({ ...input }) => {
  const { t } = useTranslation();

  return (
    <div className="form-check my-1">
      <input
        {...input}
        value={input.value}
        checked={input.checked}
        type="checkbox"
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

export default CheckboxInput;
