import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, useField, useFormikContext } from "formik";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import Form, { InputProps } from "..";
import Button from "../../core/button";

type FinalInput = InputProps & React.InputHTMLAttributes<HTMLInputElement>;

const MultipleEntriesInput: React.FC<FinalInput> = (input) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<Record<string, any>>();
  const [, , helpers] = useField(input.name);

  const dependents = values[input.name] || [];

  return (
    <FieldArray name={input.name}>
      {({ remove, push }) => (
        <Fragment>
          <div className="accordion w-100" id={input.name}>
            {dependents.map((_: any, i: number) => (
              <div className="accordion-item" key={i}>
                <h2 className="accordion-header" id={"heading" + String(i)}>
                  <div className="d-flex align-items-center justify-content-between">
                    <button
                      className="btn btn-ghost p-4 w-100 text-start collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapse" + String(i)}
                      aria-expanded="false"
                      type="button"
                      aria-controls={"collapse" + String(i)}
                      onClick={() => {}}
                    >
                      {input.singleRecordLabel ||
                        t("Global.Form.Labels.Record")}{" "}
                      {i + 1}{" "}
                      {
                        (input.value as [])[i][
                          input.recordDynamicLabelKey || ""
                        ]
                      }
                    </button>

                    <Button
                      color="ghost"
                      text="danger"
                      size="sm"
                      type="button"
                      onClick={() => remove(i)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </h2>

                <div
                  id={`collapse${i}`}
                  className="accordion-collapse show"
                  aria-labelledby={`heading${i}`}
                >
                  <div className="accordion-body">
                    <Form
                      inputs={(formik) =>
                        (input.inputs || []).map((childInput) => ({
                          ...childInput,
                          name: `${input.name}[${i}].${childInput.name}`,
                        }))
                      }
                      submitText={
                        input.recordSubmitButtonText ||
                        t("Global.Form.Labels.SaveData")
                      }
                      onFormSubmit={(values) => {
                        helpers.setValue([...(input.value as []), values]);
                        input.onRecordSubmit && input.onRecordSubmit(values);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            color="success"
            outline
            type="button"
            rounded={3}
            className="mt-4"
            onClick={() => push({})}
          >
            {input.addLabel || t("Global.Form.Labels.AddNew")}
          </Button>
        </Fragment>
      )}
    </FieldArray>
  );
};

export default MultipleEntriesInput;
