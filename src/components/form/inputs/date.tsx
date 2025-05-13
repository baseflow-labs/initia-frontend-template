import React from "react";
import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const DateInput: React.FC<FinalInput> = (input) => {
  // To Do
  // - Date: RTL & Icon & Placeholder

  return (
    <input
      {...input}
      type="date"
      dir="rtl"
      placeholder="اختر التاريخ"
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
