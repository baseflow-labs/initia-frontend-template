import { Formik, FormikErrors } from "formik";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import Button from "../core/button";
import InputComp from "./Input";

export interface InputProps {
  type?: string;
  name: string;
  label?: string;
  logo?: string;
  required?: boolean;
  half?: boolean;
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

  const initialValues = inputs
    .map((input) =>
      input.type === "radio"
        ? {
            ...input,
            defaultValue: input.options ? input.options[0]?.value : "",
          }
        : input
    )
    .reduce<Record<string, any>>((acc, input) => {
      acc[input.name] = input.defaultValue ?? "";
      return acc;
    }, {});

  const validate = (values: Record<string, any>) => {
    const errors: FormikErrors<Record<string, any>> = {};
    inputs
      .map((input) =>
        input.type === "radio" ? { ...input, required: false } : input
      )
      .forEach((input) => {
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
      }) => {
        const InputView = (input: InputProps) => (
          <Fragment>
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
          </Fragment>
        );

        const LabelView = (input: InputProps) => (
          <label className={`form-label ${input.label ? "" : "text-white"}`}>
            {input.label ? input.label : "."}{" "}
            {input.label && input.required ? (
              <span className="text-danger">*</span>
            ) : (
              ""
            )}
          </label>
        );

        return (
          <form onSubmit={handleSubmit} className="text-start" {...rest}>
            <div className="row">
              {inputs.map((input) => {
                if (input.logo) {
                  return (
                    <Fragment key={input.name}>
                      <div className="col-12">
                        <LabelView {...input} />
                      </div>

                      <div className="col-md-6 mb-3">
                        <button
                          className="btn btn-outline-success p-2 w-100 rounded-3 no-interaction
                      "
                        >
                          <img src={input.logo} height="40px" />
                        </button>
                      </div>

                      <div className="col-md-6 mb-3">
                        <InputView {...input} />
                      </div>
                    </Fragment>
                  );
                }

                return (
                  <div
                    className={`mb-3 ${
                      input.half
                        ? "col-md-6"
                        : input.logo
                        ? "col-6"
                        : "col-md-12"
                    }`}
                  >
                    <LabelView {...input} />

                    <InputView {...input} key={input.name} />
                  </div>
                );
              })}
            </div>

            <Button
              type="submit"
              color="info"
              className="w-100 p-2"
              rounded={3}
            >
              {submitText || t("Global.Labels.Submit")}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default Form;
