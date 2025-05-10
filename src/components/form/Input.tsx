import React, { ChangeEvent, FocusEvent, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from ".";
import DateInput from "./inputs/date";
import SelectInput from "./inputs/select";
import RadioInput from "./inputs/radio";
import PhoneNoInput from "./inputs/phoneNo";
import DefaultInput from "./inputs/default";
import PasswordInput from "./inputs/password";

export interface ValidatedInput {
  value?: string | number;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  handleBlur: {
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

  if (type === "select" && input.options) {
    return (
      <SelectInput
        {...input}
        name={name}
        value={value}
        handleChange={handleChange}
        handleBlur={handleBlur}
        key={name}
      />
    );
  }

  if (type === "radio" && input.options) {
    return (
      <RadioInput
        {...input}
        name={name}
        value={value}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />
    );
  }

  if (type === "phoneNumber") {
    return (
      <PhoneNoInput
        {...input}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={value}
        key={name}
      />
    );
  }

  if (type === "date") {
    return (
      <DateInput
        {...input}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={value}
        key={name}
      />
    );
  }

  if (type === "password") {
    return (
      <PasswordInput
        {...input}
        type={type}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={value}
        key={name}
      />
    );
  }

  return (
    <DefaultInput
      {...input}
      type={type}
      name={name}
      handleChange={handleChange}
      handleBlur={handleBlur}
      value={value}
      key={name}
    />
  );
};

export default InputComp;
