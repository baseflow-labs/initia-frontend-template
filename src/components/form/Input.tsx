// src/components/form/Input.tsx
import React from "react";
import { useField } from "formik";
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
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    bypassFormik?: boolean;
  };

function renderByType(type: any, props: any) {
  const input = props as any;
  if (type === "select" && input.options) return <SelectInput {...input} />;
  if (type === "selectMany" && input.options)
    return <SelectManyInput {...input} />;
  if (type === "radio" && input.options) return <RadioInput {...input} />;
  if (type === "range") return <RangeInput {...input} />;
  if (type === "phoneNumber") return <PhoneNoInput {...input} />;
  if (type === "date") return <DateInput {...input} />;
  if (type === "password") return <PasswordInput {...input} />;
  if (type === "file") return <FileInput {...input} />;
  if (type === "location") return <LocationInput {...input} />;
  if (type === "otp") return <OtpInput {...input} />;
  if (type === "textarea") return <TextareaInput {...input} />;
  if (type === "multipleEntries") return <MultipleEntriesInput {...input} />;
  if (type === "title")
    return <div className="h4 text-success">{input.defaultValue}</div>;
  return <DefaultInput type={type} {...input} />;
}

const FormikBoundInput: React.FC<FinalInput> = ({ name, type, ...rest }) => {
  const [field] = useField<string>(name);
  const props = { ...rest, ...field };
  return renderByType(type, props);
};

const RawInput: React.FC<FinalInput> = ({ type, ...rest }) => {
  return renderByType(type, rest);
};

const InputComp: React.FC<FinalInput> = ({ bypassFormik, ...props }) => {
  if (bypassFormik) {
    return <RawInput {...props} />;
  }
  return <FormikBoundInput {...props} />;
};

export default InputComp;
