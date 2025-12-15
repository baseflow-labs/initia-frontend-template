import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { InputProps } from "..";
import { commonInputClasses } from "@/utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput: React.FC<FinalInput> = ({ placeholder, ...rest }) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <input
        {...rest}
        type={show ? "text" : "password"}
        placeholder={rest.label}
        autoComplete={rest.name}
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
