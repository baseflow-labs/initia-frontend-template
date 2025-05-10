import React, { ChangeEvent, FocusEvent, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { ValidatedInput } from "../Input";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const RadioInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      {input.options?.map((option) => (
        <div className="form-check" key={option.value}>
          <input
            {...input}
            type="radio"
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-check-input"
            required={false}
          />

          <label className="form-check-label">
            {option.label || option.value}
          </label>
        </div>
      ))}
    </Fragment>
  );
};

export default RadioInput;
