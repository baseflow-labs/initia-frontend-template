import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import React, { Fragment, useRef } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";

interface FileUploadProps {
  accept?: string;
}

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  FileUploadProps;

const FileInput: React.FC<FinalInput> = ({ name, accept, ...rest }) => {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField<File | null>(name);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;
    helpers.setValue(file);
  };

  const handleRemoveFile = () => {
    helpers.setValue(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const RemoveButton = () => (
    <div
      role="button"
      className="bg-danger text-white p-1 align-items-center justify-content-center text-center"
      style={{
        borderRadius: "50%",
        display: "inline-flex",
        fontSize: 8,
        width: "20px",
      }}
      onClick={handleRemoveFile}
    >
      <FontAwesomeIcon icon={faXmark} />
    </div>
  );

  return (
    <div className="w-100">
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        style={{ display: "none" }}
        onChange={handleFileChange}
        onBlur={field.onBlur}
      />

      <button
        type="button"
        className="btn btn-outline-success p-3 w-100 rounded-3"
        onClick={handleClick}
      >
        {t("Global.Form.Labels.UploadAttachment")}{" "}
        <FontAwesomeIcon icon={faUpload} />
      </button>

      <div
        className={`mt-1 small ${field.value ? "text-muted" : "text-white"}`}
      >
        {field.value instanceof File ? (
          <Fragment>
            {field.value.name} <RemoveButton />
          </Fragment>
        ) : (
          "."
        )}
      </div>

      {meta.error && meta.touched && (
        <div className="text-danger small mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FileInput;
