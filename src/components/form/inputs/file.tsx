import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useField } from "formik";
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
        {t("Global.Labels.UploadAttachment")}{" "}
        <FontAwesomeIcon icon={faUpload} />
      </button>

      <div
        className={`mt-1 small ${field.value ? "text-muted" : "text-white"}`}
      >
        {field.value instanceof File ? field.value.name : "."}
      </div>

      {meta.error && meta.touched && (
        <div className="text-danger small mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FileInput;
