import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputProps } from "..";
import { useField } from "formik";

interface FileUploadProps {
  accept?: string;
  label?: string;
}

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  FileUploadProps;

const FileInput: React.FC<FinalInput> = ({ name, ...input }) => {
  const { t } = useTranslation();
  const [field, , helpers] = useField(name);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setSelectedFile(file);
    helpers.setValue(file);
  };

  return (
    <div className="w-100">
      <input
        {...input}
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
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
        className={`mt-1 small ${
          selectedFile?.name ? "text-muted" : "text-white"
        }`}
      >
        {selectedFile?.name || "."}
      </div>
    </div>
  );
};

export default FileInput;
