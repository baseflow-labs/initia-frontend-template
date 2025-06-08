import { useField } from "formik";
import React from "react";
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
import MultipleEntriesInput from "./inputs/multipleEntries";
import TextareaInput from "./inputs/textarea";
import RangeInput from "./inputs/range";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const InputComp: React.FC<FinalInput> = ({ name, type, ...input }) => {
  const [field] = useField<string>(name);

  if (type === "select" && input.options) {
    return <SelectInput {...input} {...field} />;
  }

  if (type === "selectMany" && input.options) {
    return <SelectManyInput {...input} {...field} />;
  }

  if (type === "radio" && input.options) {
    return <RadioInput {...input} {...field} />;
  }

  if (type === "range") {
    return <RangeInput {...input} {...field} />;
  }

  if (type === "phoneNumber") {
    return <PhoneNoInput {...input} {...field} />;
  }

  if (type === "date") {
    return <DateInput {...input} {...field} />;
  }

  if (type === "password") {
    return <PasswordInput {...input} {...field} />;
  }

  if (type === "file") {
    return <FileInput {...input} {...field} />;
  }

  if (type === "location") {
    return <LocationInput {...input} {...field} />;
  }

  if (type === "otp") {
    return <OtpInput {...input} {...field} />;
  }

  if (type === "textarea") {
    return <TextareaInput {...input} {...field} />;
  }

  if (type === "multipleEntries") {
    return <MultipleEntriesInput {...input} {...field} />;
  }

  if (type === "title") {
    return <div className="h4 text-success">{input.defaultValue}</div>;
  }

  return <DefaultInput type={type} {...input} {...field} />;
};

export default InputComp;
