import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";
import { ValidatedInput } from "../Input";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
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
        className="input-group-text bg-white rounded-2 px-3 py-2 ms-2 me-0"
        role="button"
        onClick={() => setShow((current) => !current)}
      >
        <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
      </span>
    </Fragment>
  );
};

export default PasswordInput;
