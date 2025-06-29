import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { InputProps } from "..";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    onChange: (i: number) => void;
    value: number;
  };

const StarsInput: React.FC<FinalInput> = ({ type, options, ...input }) => {
  return (
    <Fragment>
      <span className="d-flex" style={{ direction: "rtl" }}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <h2 key={i}>
              <FontAwesomeIcon
                icon={faStar}
                onClick={() => input.onChange && input.onChange(i + 1)}
                className={
                  input.value && input.value > i
                    ? "text-warning"
                    : "text-secondary"
                }
              />
            </h2>
          ))}
      </span>
    </Fragment>
  );
};

export default StarsInput;
