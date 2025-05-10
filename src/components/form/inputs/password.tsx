import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { ValidatedInput } from "../Input";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const PasswordInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <input
        {...input}
        type={show ? "text" : "password"}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={input.placeholder || input.label}
        className={`form-control form-control-sm ${commonInputClasses}`}
      />

      <span
        className={`input-group-text bg-white rounded-2 px-3 py-2 ${"ms-2 me-0"}`}
        role="button"
        onClick={() => setShow((current) => !current)}
      >
        {show ? "Hi" : "Sh"}
      </span>
    </Fragment>
  );
};

export default PasswordInput;
