import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { InputProps } from "..";
import { attachmentIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import { addNotification } from "../../../store/actions/notifications";

interface FileUploadProps {
  accept?: string;
  fileSizeLimit?: number;
  maxFiles?: number;
}

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  FileUploadProps;

const FileInput: React.FC<FinalInput> = ({
  name,
  accept,
  fileSizeLimit = 2,
  maxFiles = 3,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [field, meta, helpers] = useField<File[]>(name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.currentTarget.files || []);
    const currentFiles = Array.isArray(field.value) ? field.value : [];

    const remainingSlots = maxFiles - currentFiles.length;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    const validFiles: File[] = [];
    const rejectedFiles: File[] = [];

    filesToAdd.forEach((file) => {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB <= fileSizeLimit) {
        validFiles.push(file);
      } else {
        rejectedFiles.push(file);
      }
    });

    if (rejectedFiles.length > 0) {
      dispatch(
        addNotification({
          type: "err",
          msg: t("Global.Form.Errors.FileTooLarge", {
            max: fileSizeLimit,
          }),
        })
      );
    }

    if (selectedFiles.length > filesToAdd.length) {
      dispatch(
        addNotification({
          type: "err",
          msg: t("Global.Form.Errors.FileLimitExceeded", {
            max: maxFiles,
          }),
        })
      );
    }

    if (validFiles.length > 0) {
      helpers.setValue([...currentFiles, ...validFiles]);
      helpers.setTouched(true);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...(field.value || [])];
    updatedFiles.splice(index, 1);
    helpers.setValue(updatedFiles);
  };

  const RemoveButton = ({ index }: { index: number }) => (
    <div
      role="button"
      className="bg-danger text-white p-1 align-items-center justify-content-center text-center"
      style={{
        borderRadius: "50%",
        display: "inline-flex",
        fontSize: 8,
        width: "20px",
      }}
      onClick={() => handleRemoveFile(index)}
    >
      <FontAwesomeIcon icon={faXmark} className="p-0" />
    </div>
  );

  return (
    <div className="w-100">
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
        onBlur={field.onBlur}
      />

      <button
        type="button"
        className="btn btn-outline-success p-3 w-100 rounded-3"
        onClick={handleClick}
      >
        {t("Global.Form.Labels.UploadAttachments")}{" "}
        <IconWrapperComp icon={attachmentIcon} />
      </button>

      <div className="mt-1 small text-muted">
        {Array.isArray(field.value) && field.value.length > 0 ? (
          field.value.map((file, index) => (
            <div key={index} className="d-flex justify-content-between">
              <span className="me-2">{file.name}</span>
              <RemoveButton index={index} />
            </div>
          ))
        ) : (
          <span className="text-white">.</span>
        )}
      </div>

      {meta.error && meta.touched && (
        <div className="text-danger small mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FileInput;
