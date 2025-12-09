import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "../../..";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    onChange: (i: number) => void;
    value: number;
  };

const StarsInput: React.FC<FinalInput> = ({ type, options, ...input }) => {
  const { i18n } = useTranslation();

  return (
    <Fragment>
      <span className="d-flex" style={{ direction: i18n.dir() }}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <h2
              role="button"
              onClick={() => input.onChange && input.onChange(i + 1)}
              key={i}
            >
              <FontAwesomeIcon
                icon={faStar}
                className={`text-${
                  input.value && input.value > i ? "warning" : "muted"
                }`}
              />
            </h2>
          ))}
      </span>
    </Fragment>
  );
};

export default StarsInput;
