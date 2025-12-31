import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "../..";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const StarsInput: React.FC<FinalInput> = ({ ...input }) => {
  const { i18n } = useTranslation();

  return (
    <Fragment>
      <span className="d-flex" style={{ direction: i18n.dir() }}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <h2
              role="button"
              onClick={() => {
                if (input.onChange) {
                  const synthetic = {
                    target: { name: input.name, value: i + 1 },
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  input.onChange(synthetic);
                }
              }}
              key={i}
            >
              <FontAwesomeIcon
                icon={faStar}
                className={`text-${
                  input.value && typeof input.value === "number" && input.value > i
                    ? "primary"
                    : "muted"
                }`}
              />
            </h2>
          ))}
      </span>
    </Fragment>
  );
};

export default StarsInput;
