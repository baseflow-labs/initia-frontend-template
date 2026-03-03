import React from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "..";
import { commonInputClasses } from "../../../../utils/consts";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const DateInput: React.FC<FinalInput> = (input) => {
  const { t, i18n } = useTranslation();
  const finalType = input.type || "date";

  if (finalType === "weekday") {
    const days = [
      { value: "monday", label: "Monday" },
      { value: "tuesday", label: "Tuesday" },
      { value: "wednesday", label: "Wednesday" },
      { value: "thursday", label: "Thursday" },
      { value: "friday", label: "Friday" },
      { value: "saturday", label: "Saturday" },
      { value: "sunday", label: "Sunday" },
    ];

    return (
      <select
        {...(input as React.SelectHTMLAttributes<HTMLSelectElement>)}
        className={`form-select form-select-sm ${commonInputClasses}`}
      >
        <option value="">{input.placeholder || t("Global.Form.Labels.PleaseSelect")}</option>
        {days.map((day) => (
          <option key={day.value} value={day.value}>
            {day.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      {...input}
      type={finalType}
      lang="en-GB"
      dir={i18n.dir()}
      placeholder={input.placeholder || t("Global.Form.Labels.PickDate")}
      className={`form-control form-control-sm ${commonInputClasses}`}
    />
  );
};

export default DateInput;
