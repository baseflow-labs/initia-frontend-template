import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "..";
import { ValidatedInput } from "../Input";

interface FileUploadProps {
  accept?: string;
  label?: string;
}

type FinalInput = ValidatedInput &
  InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  FileUploadProps;

const FileInput: React.FC<FinalInput> = ({
  name,
  value,
  handleChange,
  handleBlur,
  type,
  ...input
}) => {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log({ file });

    setSelectedFile(file);
    handleChange(e);
  };

  return (
    <div className="w-100" dir="rtl">
      <input
        type="file"
        ref={inputRef}
        name={name}
        style={{ display: "none" }}
        onChange={handleFileChange}
        {...input}
      />

      <button
        type="button"
        className="btn btn-outline-success p-3 w-100"
        onClick={handleClick}
      >
        {t("Global.Labels.UploadAttachment")}
        {"  "}
        <img src="/upload-icon.svg" />
      </button>

      <div className="mt-3 small text-muted">{selectedFile?.name}</div>
    </div>
  );
};

export default FileInput;
