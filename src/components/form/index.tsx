import {
  FormikErrors,
  Form as FormikForm,
  FormikProvider,
  useFormik,
} from "formik";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Button from "../core/button";
import InputComp from "./Input";

export interface InputProps {
  name: string;
  label?: string;
  labelNote?: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  options?: {
    value: string | number;
    label?: string;
  }[];

  logo?: string;
  halfCol?: boolean;
  prefixText?: string | number;
  postfixText?: string | number;
  aboveComp?: React.ReactNode;
  belowComp?: React.ReactNode;
}

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit?: (values: Record<string, any>) => void;
  inputs: InputProps[];
  submitText?: string;
  customButtons?: React.ReactNode;
}

const Form: React.FC<Props> = ({
  onFormSubmit,
  inputs,
  submitText,
  customButtons,
  ...rest
}) => {
  const { t } = useTranslation();

  const initialValues = inputs.reduce<Record<string, any>>((acc, input) => {
    acc[input.name] =
      input.defaultValue ??
      (input.type === "radio" ? input.options?.[0]?.value ?? "" : "");
    return acc;
  }, {});

  const validate = (values: Record<string, any>) => {
    const errors: FormikErrors<Record<string, any>> = {};

    inputs.forEach((input) => {
      if (input.required && !values[input.name]) {
        errors[input.name] = t("Global.Form.Labels.Required");
      }

      if (input.type === "email" && values[input.name]) {
        const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!validEmail.test(values[input.name])) {
          errors[input.name] = t("Global.Form.Labels.InvalidEmail");
        }
      }
    });
    return errors;
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => {
      onFormSubmit?.(values);
    },
  });

  const InlineElement = ({
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
    ) : null;

  const LabelView = ({ labelNote, ...input }: InputProps) => (
    <label className={`form-label ${input.label ? "" : "text-white"}`}>
      {input.label ? input.label : "."}{" "}
      {labelNote && (
        <span className="text-muted">
          {"("}
          {labelNote}
          {")"}{" "}
        </span>
      )}
      {input.label && input.required ? (
        <span className="text-danger">*</span>
      ) : null}
    </label>
  );

  return (
    <FormikProvider value={formik}>
      <FormikForm className="text-start" {...rest}>
        <div className="row">
          {inputs.map(
            ({
              prefixText,
              postfixText,
              aboveComp,
              belowComp,
              labelNote,
              logo,
              halfCol,
              ...input
            }) => {
              const triggerError =
                formik.errors[input.name] && formik.touched[input.name];

              const prefixTexts =
                prefixText ||
                (input.type === "phoneNumber" ? "+966" : undefined);

              const ErrorView = () => (
                <small className={triggerError ? "text-danger" : "text-white"}>
                  {triggerError ? (formik.errors[input.name] as any) : "."}
                </small>
              );

              if (logo) {
                return (
                  <Fragment key={input.name}>
                    <div className="col-12">
                      <LabelView {...input} />
                    </div>

                    <div className="col-md-6 mb-3">
                      <button
                        type="button"
                        className="btn btn-outline-success p-2 w-100 rounded-3 no-interaction"
                      >
                        <img
                          alt={`${input.name}Logo`}
                          src={logo}
                          height="40px"
                        />
                      </button>
                    </div>

                    <div className="col-md-6 mb-3">
                      {aboveComp}

                      <div
                        className={`input-group ${
                          input.type === "phoneNumber"
                            ? "phone-number-input"
                            : ""
                        }`}
                      >
                        <InlineElement content={prefixTexts} flip />

                        <InputComp {...input} />

                        <InlineElement content={postfixText} />
                      </div>

                      {belowComp}

                      <ErrorView />
                    </div>
                  </Fragment>
                );
              }

              return (
                <div
                  className={`mb-3 ${
                    halfCol ? "col-md-6" : logo ? "col-6" : "col-md-12"
                  }`}
                  key={input.name}
                >
                  <LabelView {...input} />

                  {aboveComp}

                  <div
                    className={`input-group ${
                      input.type === "phoneNumber" ? "phone-number-input" : ""
                    }`}
                  >
                    <InlineElement content={prefixTexts} flip />

                    <InputComp {...input} />

                    <InlineElement content={postfixText} />
                  </div>

                  {belowComp}

                  <ErrorView />
                </div>
              );
            }
          )}
        </div>

        {customButtons}

        <Button
          type="submit"
          color="info"
          className={`w-${customButtons ? "50" : "100"} p-2`}
          rounded={3}
        >
          {submitText || t("Global.Form.Labels.Submit")}
        </Button>
      </FormikForm>
    </FormikProvider>
  );
};

export default Form;
