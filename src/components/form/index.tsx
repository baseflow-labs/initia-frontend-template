import React from "react";
import { Formik, FormikErrors } from "formik";
import Button from "../core/button";
import { useTranslation } from "react-i18next";
import InputComp from "./Input";

export interface InputProps {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string | number;
  prefixText?: string | number;
  postfixText?: string | number;
  aboveComp?: React.ReactNode;
  belowComp?: React.ReactNode;
  options?: {
    value: string | number;
    label?: string;
  }[];
}

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit?: (values: Record<string, any>) => void;
  inputs: InputProps[];
  submitText?: string;
}

const Form: React.FC<Props> = ({
  onFormSubmit,
  inputs,
  submitText,
  ...rest
}) => {
  const { t } = useTranslation();

  const initialValues = inputs.reduce<Record<string, any>>((acc, input) => {
    acc[input.name] = input.defaultValue ?? "";
    return acc;
  }, {});

  const validate = (values: Record<string, any>) => {
    const errors: FormikErrors<Record<string, any>> = {};
    inputs.forEach((input) => {
      if (input.required && !values[input.name]) {
        errors[input.name] = "Required";
      }

      if (input.type === "email" && values[input.name]) {
        const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!validEmail.test(values[input.name])) {
          errors[input.name] = "Invalid email address";
        }
      }
    });
    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit?.(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="text-start" {...rest}>
          {inputs.map((input) => {
            const FixElement = ({
              flip,
              content,
            }: {
              flip?: boolean;
              content?: string | number;
            }) =>
              content ? (
                <span
                  className={`input-group-text bg-white rounded-2 px-3 py-2 ${
                    flip ? "ms-2 me-0" : "ms-0 me-2"
                  }`}
                >
                  {content}
                </span>
              ) : (
                <></>
              );

            return (
              <div key={input.name} className="mb-3">
                <label className="form-label">{input.label}</label>

                {input.aboveComp}

                <div
                  className={`input-group ${
                    input.type === "phoneNumber" ? "phone-number-input" : ""
                  }`}
                >
                  <FixElement content={input.prefixText} flip />

                  <InputComp
                    value={values[input.name]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    {...input}
                  />

                  <FixElement content={input.postfixText} />
                </div>

                {input.belowComp}

                {errors[input.name] && touched[input.name] && (
                  <div className="text-danger">{errors[input.name] as any}</div>
                )}
              </div>
            );
          })}

          <Button type="submit" color="info" className="w-100 p-2" rounded={3}>
            {submitText}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
