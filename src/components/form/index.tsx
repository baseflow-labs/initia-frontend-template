import {
  FormikErrors,
  Form as FormikForm,
  FormikProps,
  FormikProvider,
  useFormik,
} from "formik";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../store/hooks";
import Button from "../core/button";
import Spinner from "../core/spinner";
import InputComp from "./Input";

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
  defaultValue?: string | number;
  options?: {
    value: string | number;
    label?: string;
  }[];
}

interface InputSingleProps extends InputBasicProps {
  logo?: string;
  halfCol?: boolean;
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
  onFormSubmit?: (values: any) => void;
  inputs: (formik: FormikProps<Record<string, any>>) => InputProps[];
  submitText?: string;
  initialValues?: object;
  customButtons?: React.ReactNode;
}

const Form: React.FC<Props> = ({
  onFormSubmit,
  inputs,
  submitText,
  customButtons,
  initialValues,
  ...rest
}) => {
  const { t } = useTranslation();
  const { loading } = useAppSelector((state) => state.loading);

  const formik = useFormik<Record<string, any>>({
    initialValues: { ...initialValues },
    enableReinitialize: true,
    validate: (values: Record<string, any>) => {
      const errors: FormikErrors<Record<string, any>> = {};
      const dynamicInputs = inputs(formik);

      dynamicInputs.forEach((input) => {
        if (
          input.required &&
          ((input.type === "multipleEntries" && !values[input.name].length) ||
            !values[input.name])
        ) {
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
    },
    onSubmit: (values) => {
      onFormSubmit?.(values);
    },
  });

  formik.initialValues = inputs(formik).reduce<Record<string, any>>(
    (acc, input) => {
      if (input.defaultValue) {
        acc[input.name] = input.defaultValue;
        return acc;
      }

      switch (input.type) {
        case "radio":
          acc[input.name] = input.options?.[0]?.value;
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

  const LabelView = ({ labelNote, label, required }: InputProps) => (
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

  return (
    <FormikProvider value={formik}>
      <FormikForm className="text-start" {...rest}>
        <div className="row">
          {inputs(formik).map(
            ({
              prefixText,
              postfixText,
              aboveComp,
              belowComp,
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

                    <div className="col-md-6 mb-2">
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
                  className={`mb-2 ${
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
