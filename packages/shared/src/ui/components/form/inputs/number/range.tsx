import React from "react";
import { InputProps } from "../..";
import DefaultInput from "../default";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const RangeInput: React.FC<FinalInput> = (input) => {
  return (
    <div className="input-group">
      <DefaultInput
        min={input.min}
        max={input.max}
        className="form-range"
        type="range"
        {...input}
      />

      {/* 
        <InlineElement
          flip
          content={
            <FontAwesomeIcon
              icon={faFilter}
              role="button"
              onClick={() =>
                formik.setFieldValue(input.name, input.defaultValue)
              }
            />
          }
        /> */}
    </div>
  );
};

export default RangeInput;
