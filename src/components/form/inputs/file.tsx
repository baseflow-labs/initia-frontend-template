import { faFile, faFilePdf, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as FileApi from "@/api/files";
import { addNotification } from "@/store/actions/notifications";
import Spinner from "../../core/spinner";

interface FileUploadProps {
  accept?: string;
  fileSizeLimit?: number;
  maxFiles?: number;
}

type FinalInput = React.InputHTMLAttributes<HTMLInputElement> &
  FileUploadProps & {
    name: string;
  };

interface UploadedFile {
  path: string;
  id: string;
}

const FileInput: React.FC<FinalInput> = ({
  name,
  accept,
  fileSizeLimit = 2,
  maxFiles = 3,
  // ...rest
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [field, , helpers] =
    useField<{ name: string; type: string; id: string; path: string }[]>(name);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<{ name: string; type: string; id: string; path: string }[]>(
    []
  );

  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (field.value && field.value.length) {
      const restoredFiles = field.value.map((pathOrObj: UploadedFile) => {
        const path = typeof pathOrObj === "string" ? pathOrObj : pathOrObj.path;

        const name = path.split("/").pop() || "file";
        const ext = name.split(".").pop()?.toLowerCase() || "";
        const type = ext
          ? `application/${ext === "jpg" || ext === "jpeg" ? "jpeg" : ext}`
          : "application/octet-stream";

        return {
          id: typeof pathOrObj === "string" ? path : pathOrObj.id,
          path,
          name,
          type,
        };
      });

      setFiles(restoredFiles);
    }
  }, [field.value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.currentTarget.files || []);
    const remainingSlots = maxFiles - files.length;
    const filesToUpload = selectedFiles.slice(0, remainingSlots);

    const oversizedFiles = filesToUpload.filter((f) => f.size / (1024 * 1024) > fileSizeLimit);
    if (oversizedFiles.length) {
      dispatch(
        addNotification({
          type: "err",
          msg: t("Global.Form.Errors.FileTooLarge", { max: fileSizeLimit }),
        })
      );
      return;
    }

    try {
      setUploading(true);

      // Prepare new files and IDs arrays
      const newFilesMeta: {
        name: string;
        type: string;
        id: string;
        path: string;
      }[] = [];
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await FileApi.create(formData);
        const uploadedFile: UploadedFile = res.payload;

        newFilesMeta.push({
          name: file.name,
          type: file.type,
          id: uploadedFile.id,
          path: uploadedFile.path,
        });
      }

      // Update React state and Formik field once
      setFiles((prev) => [...prev, ...newFilesMeta]);
      helpers.setValue([...(field.value || []), ...newFilesMeta]);
    } catch {
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

  const handleRemoveFile = (index: number, id: string) => {
    FileApi.remove(id).then(() => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      helpers.setValue(updatedFiles);
    });
  };

  const generateFileIcon = (type: string) => {
    return <FontAwesomeIcon icon={type === "pdf" ? faFilePdf : faFile} className="text-dark" />;
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="file-upload-container">
        {files.map((file, index) => (
          <div key={file.id} className="file-wrapper">
            <div className="file-row">
              <div className="icon-container">{generateFileIcon(file.type)}</div>

              <div className="file-count-badge">{index + 1}</div>
            </div>

            <div className="d-flex mt-2 justify-content-center align-items-center">
              <div className="text-truncate" style={{ maxWidth: 80 }}>
                <a href={file.path} target="_blank" rel="noreferrer">
                  {file.name}
                </a>
              </div>

              <button
                type="button"
                className="ms-2 remove-btn"
                onClick={() => handleRemoveFile(index, file.id)}
                aria-label="Remove file"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        ))}

        <div
          className={`upload-dropzone ${files.length >= maxFiles ? "disabled" : ""}`}
          onClick={files.length < maxFiles ? handleClick : undefined}
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

      .file-wrapper {
        width: 80px;
      }

      .file-row {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: 1px solid var(--bs-dark);
        border-radius: 6px;
        box-sizing: border-box;
        background: #fafafa;
        text-align: center;
      }

      .icon-container {
        font-size: 1.5rem;
        line-height: 1;
      }

      .file-count-badge {
        position: absolute;
        top: 4px;
        right: 4px;
        border: 1px solid #666;
        color: #666;
        font-size: 0.65rem;
        font-weight: bold;
        width: 18px;
        height: 18px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        user-select: none;
      }

      .remove-btn {
        background: red;
        color: white;
        border: none;
        border-radius: 50%;
        width: 15px;
        height: 15px;
        font-size: 0.65rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .upload-dropzone {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: 2px dashed var(--bs-primary);
        border-radius: 6px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        font-size: 0.9rem;
        color: var(--bs-primary);
        padding: 0.5rem;
        box-sizing: border-box;
        min-width: 80px;
      }
      .upload-dropzone.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .text-truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}</style>
    </div>
  );
};

export default FileInput;
