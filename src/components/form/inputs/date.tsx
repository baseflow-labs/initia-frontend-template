import React from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "..";
import { commonInputClasses } from "../../../utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const DateInput: React.FC<FinalInput> = (input) => {
  const { t, i18n } = useTranslation();
  // To Do
  // - Date: RTL & Icon & Placeholder

  return (
    <input
      {...input}
      type="date"
      lang="en-GB"
      dir={i18n.dir()}
      placeholder={input.placeholder || t("Global.Form.Labels.PickDate")}
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
