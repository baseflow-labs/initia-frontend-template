import {
  FormikErrors,
  Form as FormikForm,
  FormikProps,
  FormikProvider,
  useFormik,
} from "formik";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { resetFilterIcon } from "../../assets/icons/icons";
import IconWrapperComp from "../../assets/icons/wrapper";
import { useAppSelector } from "../../store/hooks";
import Button from "../core/button";
import Spinner from "../core/spinner";
import { MoneyUnit } from "../table";
import InputComp from "./Input";
import DefaultInput from "./inputs/default";

interface InputBasicProps {
  name: string;
  label?: string;
  labelNote?: string;
  type?:
    | "text"
    | "email"
    | "number"
    | "textarea"
    | "date"
    | "file"
    | "radio"
    | "select"
    | "password"
    | "otp"
    | "title"
    | "location"
    | "numberText"
    | "selectMany"
    | "phoneNumber"
    | "multipleEntries"
    | string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  excludeInForm?: boolean;
  defaultValue?: string | number;
  placeholder?: string;
  fileSizeLimit?: number;
  maxFiles?: number;
  min?: string | number;
  max?: string | number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  options?: {
    value: string | number;
    label?: string;
  }[];
}

export interface InputSingleProps extends InputBasicProps {
  logo?: string;
  sizing?: string;
  halfCol?: boolean;
  hasFile?: boolean;
  hideFile?: boolean;
  moneyUnit?: boolean;
  prefixText?: string | number;
  postfixText?: string | number;
  aboveComp?: React.ReactNode;
  belowComp?: React.ReactNode;
}

export interface InputProps extends InputSingleProps {
  inputs?: InputSingleProps[];
  addLabel?: string | React.ReactNode;
  singleRecordLabel?: string;
  recordDynamicLabelKey?: string;
  logo?: string;
  halfCol?: boolean;
  onRecordSubmit?: (formik?: any) => any;
  recordSubmitButtonText?: string;
  prefixText?: string | number;
  postfixText?: string | number;
  aboveComp?: React.ReactNode;
  belowComp?: React.ReactNode;
}

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  onFormSubmit?: (values: any, reset: any) => void;
  inputs: (formik: FormikProps<Record<string, any>>) => InputProps[];
  submitText?: string;
  initialValues?: object;
  customButtons?: React.ReactNode;
  customValidate?: (
    values: Record<string, any>
  ) => FormikErrors<Record<string, any>>;
}

export const LabelView = ({
  labelNote,
  label,
  required,
}: Partial<InputSingleProps>) => (
  <label className={`form-label ${label ? "" : "text-white"}`}>
    <small>
      {label ? label : "."}{" "}
      {labelNote && (
        <span className="text-muted">
          {"("}
          {labelNote}
          {")"}{" "}
        </span>
      )}
      {label && required ? <span className="text-danger">*</span> : null}
    </small>
  </label>
);

const Form: React.FC<Props> = ({
  onFormSubmit,
  inputs,
  submitText,
  customButtons,
  initialValues,
  customValidate,
  ...rest
}) => {
  const { t } = useTranslation();
  const { loading } = useAppSelector((state) => state.loading);

  const dummyFormik = useFormik<Record<string, any>>({
    initialValues: {},
    enableReinitialize: true,
    onSubmit: async () => {},
  });

  const dynamicInputs = inputs(dummyFormik).filter((i) => !i.excludeInForm);

  const generatedInitialValues = dynamicInputs.reduce<Record<string, any>>(
    (acc, input) => {
      if (input.defaultValue) {
        acc[input.name] = input.defaultValue;
        return acc;
      }

      switch (input.type) {
        case "radio":
          acc[input.name] = input.options?.[0]?.value ?? "";
          break;
        case "multipleEntries":
          acc[input.name] = [];
          break;
        default:
          acc[input.name] = "";
          break;
      }

      return acc;
    },
    {}
  );

  const formik = useFormik<Record<string, any>>({
    initialValues: { ...generatedInitialValues, ...initialValues },
    enableReinitialize: true,
    validate: (values: Record<string, any>) => {
      const errors: FormikErrors<Record<string, any>> = {};
      const dynamicInputs = inputs(formik).filter((i) => !i.excludeInForm);

      dynamicInputs.forEach((input) => {
        const { name, required, type, min, max, minLength, maxLength } = input;
        const value = values[name];

        if (
          required &&
          (value === undefined ||
            value === null ||
            value === "" ||
            (type === "multipleEntries" &&
              Array.isArray(value) &&
              value.length === 0))
        ) {
          errors[name] = t("Global.Form.Errors.Required");
          return;
        }

        if (value && value !== null && value !== "") {
          if (type === "phoneNumber") {
            if (String(value).length !== 9) {
              errors[name] = t("Global.Form.Errors.PhoneNumberLength");
            }

            if (
              !String(value).startsWith("50") &&
              !String(value).startsWith("53") &&
              !String(value).startsWith("54") &&
              !String(value).startsWith("55") &&
              !String(value).startsWith("56") &&
              !String(value).startsWith("57") &&
              !String(value).startsWith("58") &&
              !String(value).startsWith("59")
            ) {
              errors[name] = t("Global.Form.Errors.InvalidPhoneNumber");
            }
          }

          if (type === "email") {
            const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!validEmail.test(value)) {
              errors[name] = t("Global.Form.Errors.InvalidEmail");
            }
          }

          if (type === "number" || type === "range") {
            const numeric = Number(value);
            if (isNaN(numeric)) {
              errors[name] = t("Global.Form.Errors.InvalidNumber");
            } else {
              if (min && numeric < Number(min)) {
                errors[name] = `${t("Global.Form.Errors.Min")}: ${min}`;
              }
              if (max && numeric > Number(max)) {
                errors[name] = `${t("Global.Form.Errors.Max")}: ${max}`;
              }
            }
          }

          if (minLength && String(value).length < minLength) {
            errors[name] = `${t("Global.Form.Errors.MinLength")}: ${minLength}`;
          }

          if (maxLength && String(value).length > maxLength) {
            errors[name] = `${t("Global.Form.Errors.MaxLength")}: ${maxLength}`;
          }
        }
      });

      const customErrors = customValidate?.(values) ?? {};
      return { ...errors, ...customErrors };
    },
    onSubmit: async (values, formikHelpers) => {
      const errors = await formikHelpers.validateForm();

      if (Object.keys(errors).length > 0) {
        const touchedFields = Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as Record<string, boolean>);

        formikHelpers.setTouched(touchedFields, true);
        return;
      }

      onFormSubmit?.(values, formikHelpers.resetForm);
    },
  });

  const InlineElement = ({
    flip,
    content,
  }: {
    flip?: boolean;
    content?: string | number | React.ReactNode;
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

  return (
    <FormikProvider value={formik}>
      <FormikForm className="text-start" {...rest}>
        <div className="row">
          {inputs(formik)
            .filter((i) => !i.excludeInForm)
            .map(
              (
                {
                  prefixText,
                  postfixText,
                  aboveComp,
                  belowComp,
                  logo,
                  halfCol,
                  type,
                  required,
                  min,
                  max,
                  minLength,
                  moneyUnit,
                  ...input
                },
                i
              ) => {
                const triggerError =
                  formik.errors[input.name] && formik.touched[input.name];

                const prefixTexts =
                  prefixText || (type === "phoneNumber" ? "+966" : undefined);

                const ErrorView = () => (
                  <small
                    className={triggerError ? "text-danger" : "text-white"}
                  >
                    {triggerError ? (formik.errors[input.name] as any) : "."}
                  </small>
                );

                if (logo) {
                  return (
                    <Fragment key={i}>
                      <div className="col-12">
                        <LabelView required={required} {...input} />
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

                      <div className="col-md-6 mb-2">
                        {aboveComp}

                        <div
                          className={`input-group ${
                            type === "phoneNumber" ? "phone-number-input" : ""
                          }`}
                        >
                          <InlineElement content={prefixTexts} flip />

                          <InputComp id={input.name} type={type} {...input} />

                          <InlineElement
                            content={moneyUnit ? <MoneyUnit /> : postfixText}
                          />
                        </div>

                        {belowComp}

                        <ErrorView />
                      </div>
                    </Fragment>
                  );
                }

                return (
                  <div
                    className={`mb-2 ${
                      halfCol ? "col-md-6" : logo ? "col-6" : "col-md-12"
                    }`}
                    key={i}
                  >
                    <LabelView required={required} {...input} />

                    {aboveComp}

                    <div
                      className={`input-group ${
                        type === "phoneNumber" ? "phone-number-input" : ""
                      }`}
                    >
                      <InlineElement content={prefixTexts} flip />

                      <InputComp id={input.name} type={type} {...input} />

                      <InlineElement
                        content={moneyUnit ? <MoneyUnit /> : postfixText}
                      />
                    </div>

                    <ErrorView />

                    {belowComp}

                    {type === "range" && (
                      <Fragment>
                        <div className={`input-group`}>
                          <DefaultInput
                            name={input.name}
                            className="form-control-md"
                            value={formik.values[input.name]}
                          />

                          <InlineElement
                            flip
                            content={
                              <IconWrapperComp
                                icon={resetFilterIcon}
                                role="button"
                                onClick={() =>
                                  formik.setFieldValue(
                                    input.name,
                                    input.defaultValue
                                  )
                                }
                              />
                            }
                          />
                        </div>

                        {input.name === "fontSize" && (
                          <div className="row mt-3">
                            <h4 className="col-md-12 mb-3">
                              {t("Auth.Settings.Samples.Title")}
                            </h4>

                            <h3
                              className="col-md-6"
                              style={{
                                fontSize: 1.75 * formik.values.fontSize,
                              }}
                            >
                              {t("Auth.Settings.Samples.H3Sample")}
                            </h3>

                            <h4
                              className="col-md-6"
                              style={{ fontSize: 1.5 * formik.values.fontSize }}
                            >
                              {t("Auth.Settings.Samples.H4Sample")}
                            </h4>

                            <h5
                              className="col-md-6"
                              style={{
                                fontSize: 1.25 * formik.values.fontSize,
                              }}
                            >
                              {t("Auth.Settings.Samples.H5Sample")}
                            </h5>

                            <label
                              className="form-label col-md-6"
                              style={{ fontSize: 1 * formik.values.fontSize }}
                            >
                              {t("Auth.Settings.Samples.LabelSample")}
                            </label>

                            <div
                              className="col-md-6"
                              style={{
                                fontSize: 0.875 * formik.values.fontSize,
                              }}
                            >
                              <small>
                                {t("Auth.Settings.Samples.SmallSample")}
                              </small>
                            </div>
                          </div>
                        )}
                      </Fragment>
                    )}
                  </div>
                );
              }
            )}
        </div>

        {customButtons}

        <Button
          type="submit"
          disabled={loading.length > 0}
          color="info"
          className={`w-${customButtons ? "50" : "100"} p-2`}
        >
          {loading.length > 0 ? (
            <small>
              <Spinner />
            </small>
          ) : (
            <div className="my-auto">
              {submitText || t("Global.Form.Labels.Submit")}
            </div>
          )}
        </Button>
      </FormikForm>
    </FormikProvider>
  );
};

export default Form;
