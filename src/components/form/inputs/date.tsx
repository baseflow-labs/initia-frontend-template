import React from "react";
import { InputProps } from "..";
import { ValidatedInput } from "../Input";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement>;

const DateInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
  // To Do
  // - Date: RTL & Icon & Placeholder

  return (
    <input
      {...input}
      type="date"
      dir="rtl"
      placeholder="اختر التاريخ"
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      className={`form-control form-control-sm ${commonInputClasses}`}
      // style={{
      //   position: "relative",
      //   backgroundImage: `url('/calendar-icon.svg')`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "left center",
      //   paddingLeft: "2rem",
      //   paddingRight: "2rem",
      // }}
    />
  );
};

export default DateInput;
