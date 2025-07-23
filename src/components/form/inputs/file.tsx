import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import React, { Fragment, useRef } from "react";
import { useTranslation } from "react-i18next";

import { InputProps } from "..";
import { attachmentIcon } from "../../../assets/icons/icons";
import IconWrapperComp from "../../../assets/icons/wrapper";
import { addNotification } from "../../../store/actions/notifications";
import { useDispatch } from "react-redux";

interface FileUploadProps {
  accept?: string;
  fileSizeLimit?: number;
}

type FinalInput = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  FileUploadProps;

const FileInput: React.FC<FinalInput> = ({
  name,
  accept,
  fileSizeLimit = 1,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [field, meta, helpers] = useField<File | null>(name);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] || null;

    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > fileSizeLimit) {
        helpers.setValue(null);
        helpers.setError(
          t("Global.Form.Errors.FileTooLarge", { max: fileSizeLimit })
        );
        dispatch(
          addNotification({
            type: "err",
            msg: t("Global.Form.Errors.FileTooLarge", { max: fileSizeLimit }),
          })
        );
        helpers.setTouched(true);

        if (inputRef.current) {
          inputRef.current.value = "";
        }

        return;
      }
    }

    helpers.setError(undefined);
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
        <IconWrapperComp icon={attachmentIcon} />
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
