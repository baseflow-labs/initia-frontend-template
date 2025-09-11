import { faFile, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as FileApi from "../../../api/files";
import Spinner from "../../../components/core/spinner";
import { addNotification } from "../../../store/actions/notifications";

interface FileUploadProps {
  accept?: string;
  fileSizeLimit?: number; // MB
  maxFiles?: number;
  storageBaseUrl?: string; // override env base URL if needed
}

type UploadedFileMeta = {
  id: string;
  path: string;
  name: string;
  type: string;
};

type FinalInput = React.InputHTMLAttributes<HTMLInputElement> &
  FileUploadProps & {
    name: string;
    /** Already-uploaded files to render (controlled from parent) */
    uploaded?: UploadedFileMeta[];
    /** Callback with the full uploaded list (after add/remove) */
    onUploaded?: (files: UploadedFileMeta[]) => void;
  };

const FileInput: React.FC<FinalInput> = ({
  name,
  accept,
  multiple = true,
  required,
  disabled,
  className,
  fileSizeLimit = 2,
  maxFiles = 3,
  storageBaseUrl,
  onChange,
  uploaded,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<UploadedFileMeta[]>([]);

  const baseUrl =
    storageBaseUrl ||
    process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
    "https://pdt-bucket.s3.us-east-1.amazonaws.com";

  // Sync from controlled prop `uploaded`
  useEffect(() => {
    if (uploaded && Array.isArray(uploaded)) {
      setFiles(
        uploaded.map((f) => ({
          id: f.id,
          path: f.path,
          name: f.name || f.path.split("/").pop() || "file",
          type:
            f.type ||
            (() => {
              const ext = (f.path.split(".").pop() || "").toLowerCase();
              return ext
                ? `application/${
                    ext === "jpg" || ext === "jpeg" ? "jpeg" : ext
                  }`
                : "application/octet-stream";
            })(),
        }))
      );
    }
  }, [uploaded]);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Pass raw files up if parent wants them (compat with your DefaultInput usage)
    onChange?.(e);

    const selectedFiles = Array.from(e.currentTarget.files || []);
    if (!selectedFiles.length) return;

    const remainingSlots = maxFiles - files.length;
    const filesToUpload = selectedFiles.slice(0, Math.max(0, remainingSlots));

    if (!filesToUpload.length) return;

    const oversizedFiles = filesToUpload.filter(
      (f) => f.size / (1024 * 1024) > fileSizeLimit
    );
    if (oversizedFiles.length) {
      dispatch(
        addNotification({
          type: "err",
          msg: t("Global.Form.Errors.FileTooLarge", { max: fileSizeLimit }),
        })
      );
      // Clear input so same files can be re-selected later if needed
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    try {
      setUploading(true);

      const newFilesMeta: UploadedFileMeta[] = [];
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("file", file);

        const res: any = await FileApi.create(formData);
        newFilesMeta.push({
          id: res.id,
          path: res.path,
          name: file.name,
          type: file.type,
        });
      }

      const next = [...files, ...newFilesMeta];
      setFiles(next);
      // Notify parent with the uploaded list
      if (typeof rest.onInput === "function") {
        // no-op: keep native prop reserved
      }
      if (typeof (rest as any).onUploaded === "function") {
        (rest as any).onUploaded(next);
      }
    } catch (error) {
      dispatch(
        addNotification({
          type: "err",
          msg: t("Global.Form.Errors.UploadFailed"),
        })
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemoveFile = async (index: number, id: string) => {
    try {
      await FileApi.remove(id);
    } catch {
      // Best-effort removal; you may want a toast here
    }
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    (rest as any).onUploaded?.(updated);
  };

  const generateFileIcon = (type: string) => {
    return <FontAwesomeIcon icon={faFile} className="text-success" />;
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled || files.length >= maxFiles}
        style={{ display: "none" }}
        onChange={handleFileChange}
        {...rest}
      />

      <div className="file-upload-container">
        {files.map((file, index) => (
          <div key={file.id} className="file-wrapper">
            <div className="file-row">
              <div className="icon-container">
                {generateFileIcon(file.type)}
              </div>
              <div className="file-count-badge">{index + 1}</div>
            </div>

            <div className="d-flex mt-2 justify-content-center align-items-center">
              <div className="text-truncate" style={{ maxWidth: 80 }}>
                <a href={baseUrl + file.path} target="_blank" rel="noreferrer">
                  {file.name}
                </a>
              </div>

              <button
                type="button"
                className="ms-2 remove-btn"
                onClick={() => handleRemoveFile(index, file.id)}
                aria-label="Remove file"
                disabled={disabled}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        ))}

        <div
          className={`upload-dropzone ${
            files.length >= maxFiles || disabled ? "disabled" : ""
          }`}
          onClick={
            files.length < maxFiles && !disabled ? handleClick : undefined
          }
        >
          {uploading ? (
            <Spinner />
          ) : files.length < maxFiles ? (
            t("Global.Form.Labels.AddFiles")
          ) : (
            t("Global.Form.Labels.FilesMaxReached")
          )}
        </div>
      </div>

      <style>{`
      .file-upload-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .file-wrapper { width: 80px; }
      .file-row {
        position: relative;
        display: flex; align-items: center; justify-content: center;
        width: 80px; height: 80px;
        border: 1px solid var(--bs-success);
        border-radius: 6px; box-sizing: border-box;
        background: #fafafa; text-align: center;
      }
      .icon-container { font-size: 1.5rem; line-height: 1; }
      .file-count-badge {
        position: absolute; top: 4px; right: 4px;
        border: 1px solid #666; color: #666;
        font-size: 0.65rem; font-weight: bold;
        width: 18px; height: 18px; border-radius: 5px;
        display: flex; align-items: center; justify-content: center;
        pointer-events: none; user-select: none;
      }
      .remove-btn {
        background: red; color: white; border: none;
        border-radius: 50%; width: 15px; height: 15px;
        font-size: 0.65rem; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      .upload-dropzone {
        display: flex; align-items: center; justify-content: center;
        width: 80px; height: 80px; min-width: 80px;
        border: 2px dashed var(--bs-info);
        border-radius: 6px; text-align: center; cursor: pointer;
        user-select: none; font-size: 0.9rem; color: var(--bs-info);
        padding: 0.5rem; box-sizing: border-box;
      }
      .upload-dropzone.disabled { cursor: not-allowed; opacity: 0.5; }
      .text-truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    `}</style>
    </div>
  );
};

export default FileInput;
