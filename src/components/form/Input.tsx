import React, { ChangeEvent, FocusEvent } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from ".";
import DateInput from "./inputs/date";
import DefaultInput from "./inputs/default";
import FileInput from "./inputs/file";
import LocationInput from "./inputs/location";
import OtpInput from "./inputs/otp";
import PasswordInput from "./inputs/password";
import PhoneNoInput from "./inputs/phoneNo";
import RadioInput from "./inputs/radio";
import SelectInput from "./inputs/select";
import SelectManyInput from "./inputs/selectMany";

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

  if (type === "selectMany" && input.options) {
    return (
      <SelectManyInput
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

  if (type === "file") {
    return (
      <FileInput
        {...input}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={value}
        key={name}
      />
    );
  }

  if (type === "location") {
    return (
      <LocationInput
        {...input}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={value}
        key={name}
      />
    );
  }

  if (type === "otp") {
    return (
      <OtpInput
        {...input}
        name={name}
        handleChange={handleChange}
        handleBlur={handleBlur}
        value={value}
        key={name}
      />
    );
  }

  if (type === "title") {
    return <div {...input}>{input.defaultValue}</div>;
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
