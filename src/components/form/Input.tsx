import React, { ChangeEvent, FocusEvent, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from ".";

interface ValidatedInput {
  value?: string | number;
  handleChange?: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  handleBlur?: {
    (e: FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

const InputComp: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
  const { t } = useTranslation();

  const commonClasses = "rounded-2 p-3";

  // To Do
  // - Date: RTL & Icon & Placeholder
  // - Multiselect

  if (type === "select" && input.options) {
    return (
      <select
        {...input}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`form-select form-select-sm ${commonClasses}`}
        key={name}
      >
        <option value="">
          {input.placeholder || t("Global.Labels.PleaseSelect")}
        </option>

        {input.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
    );
  }

  if (type === "radio" && input.options) {
    return (
      <Fragment>
        {input.options.map((option) => (
          <div className="form-check" key={option.value}>
            <input
              {...input}
              type="radio"
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-check-input"
              required={false}
            />

            <label className="form-check-label">
              {option.label || option.value}
            </label>
          </div>
        ))}
      </Fragment>
    );
  }

  if (type === "phoneNumber") {
    return (
      <input
        {...input}
        type="number"
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={input.placeholder || input.label}
        className={`form-control form-control-sm ${commonClasses}`}
        key={name}
      />
    );
  }

  if (type === "date") {
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
        className={`form-control form-control-sm ${commonClasses}`}
        // style={{
        //   position: "relative",
        //   backgroundImage: `url('/calendar-icon.svg')`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "left center",
        //   paddingLeft: "2rem",
        //   paddingRight: "2rem",
        // }}
        key={name}
      />
    );
  }

  return (
    <input
      {...input}
      type={type}
      name={name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      placeholder={input.placeholder || input.label}
      className={`form-control form-control-sm ${commonClasses}`}
      key={name}
    />
  );
};

export default InputComp;
