import React from "react";
import { Formik, FormikErrors } from "formik";
import Button from "../core/button";
import { useTranslation } from "react-i18next";

interface Input {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string | number;
  prefix?: string | number;
  postfix?: string | number;
  options?: {
    value: string | number;
    label?: string;
  }[];
}

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit?: (values: Record<string, any>) => void;
  inputs: Input[];
}

const Form: React.FC<Props> = ({ onFormSubmit, inputs, ...rest }) => {
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
            if (input.type === "select" && input.options) {
              return (
                <div key={input.name} className="mb-3">
                  <label className="form-label">{input.label}</label>

                  <select
                    name={input.name}
                    id={input.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[input.name]}
                    className="form-select"
                  >
                    <option value="">Select...</option>
                    {input.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label ?? option.value}
                      </option>
                    ))}
                  </select>

                  {errors[input.name] && touched[input.name] && (
                    <div className="text-danger">
                      {errors[input.name] as any}
                    </div>
                  )}
                </div>
              );
            }

            if (input.type === "phoneNumber") {
              return (
                <div key={input.name} className="mb-3">
                  <label className="form-label">{input.label}</label>

                  <div className="input-group phone-number-input">
                    <span className="input-group-text bg-white">
                      {input.prefix}
                    </span>

                    <input
                      type={input.type}
                      name={input.name}
                      id={input.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[input.name]}
                      className="form-control"
                    />
                  </div>

                  {errors[input.name] && touched[input.name] && (
                    <div className="text-danger">
                      {errors[input.name] as any}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={input.name} className="mb-3">
                <label className="form-label">{input.label}</label>

                <div className="input-group">
                  {input.prefix && (
                    <span className="input-group-text">{input.prefix}</span>
                  )}

                  <input
                    type={input.type}
                    name={input.name}
                    id={input.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[input.name]}
                    className="form-control"
                  />

                  {input.postfix && (
                    <span className="input-group-text">{input.postfix}</span>
                  )}
                </div>

                {errors[input.name] && touched[input.name] && (
                  <div className="text-danger">{errors[input.name] as any}</div>
                )}
              </div>
            );
          })}

          <Button type="submit" color="info" className="w-100">
            {t("Public.Login.Login")}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
