import React, { Fragment } from "react";

import { InputProps } from "..";
import { mutedStarIcon, pickedStarIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";

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
              <IconWrapperComp
                icon={
                  input.value && input.value > i
                    ? pickedStarIcon
                    : mutedStarIcon
                }
                onClick={() => input.onChange && input.onChange(i + 1)}
              />
            </h2>
          ))}
      </span>
    </Fragment>
  );
};

export default StarsInput;
