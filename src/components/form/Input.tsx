import { useField } from "formik";
import React from "react";

import { InputProps } from ".";
import DateInput from "./inputs/date";
import DefaultInput from "./inputs/default";
import FileInput from "./inputs/file";
import LocationInput from "./inputs/location";
import MultipleEntriesInput from "./inputs/multipleEntries";
import OtpInput from "./inputs/otp";
import PasswordInput from "./inputs/password";
import PhoneNoInput from "./inputs/phoneNo";
import RangeInput from "./inputs/range";
import SelectInput from "./inputs/select";
import CheckboxesInput from "./inputs/selection/checkbox";
import RadioInput from "./inputs/selection/radio";
import SelectManyInput from "./inputs/selectMany";
import TextareaInput from "./inputs/textarea";
import BooleanInput from "./inputs/boolean";
import RatingInput from "./inputs/rating";

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.SelectHTMLAttributes<HTMLSelectElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    bypassFormik?: boolean;
  };

const renderByType = (type: any, props: any) => {
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
  if (type === "checkboxes") return <CheckboxesInput {...input} />;
  if (type === "boolean") return <BooleanInput {...input} />;
  if (type === "title")
    return <div className="h4 text-dark">{input.defaultValue}</div>;
  if (type === "rating")
    return (
      <RatingInput type={type} className="form-control-color" {...input} />
    );
  if (type === "color")
    return (
      <DefaultInput type={type} className="form-control-color" {...input} />
    );
  return <DefaultInput type={type} {...input} />;
};

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
