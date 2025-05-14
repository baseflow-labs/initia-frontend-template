import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import Button from "../../core/button";

type FinalInput = InputProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const MultipleEntriesInput: React.FC<FinalInput> = (input) => {
  const { t } = useTranslation();

  const [rowsCount, setRowsCount] = useState(1);

  return (
    <Fragment>
      <div className="accordion w-100" id={input.name}>
        {Array(rowsCount)
          .fill(" ")
          ?.map((_, i) => (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header" id={"heading" + String(i)}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapse" + String(i)}
                  aria-expanded="true"
                  aria-controls={"collapse" + String(i)}
                >
                  <Button
                    onClick={() => setRowsCount((current) => current - 1)}
                    color="ghost"
                    text="danger"
                    size="sm"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>{" "}
                  التابع {i + 1}{" "}
                </button>
              </h2>

              <div
                id={"collapse" + String(i)}
                className="accordion-collapse collapse"
                aria-labelledby={"heading" + String(i)}
                data-bs-parent={"#" + input.name}
              >
                <div className="accordion-body">هنا ستظهر الخانات</div>
              </div>
            </div>
          ))}
      </div>

      <Button
        color="success"
        outline
        rounded={3}
        onClick={() => setRowsCount((current) => current + 1)}
      >
        {input.addLabel || t("Global.Labels.Addnew")}
      </Button>
    </Fragment>
  );
};

export default MultipleEntriesInput;
