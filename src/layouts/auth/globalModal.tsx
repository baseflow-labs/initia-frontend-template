import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../../components/core/button";
import Modal from "../../components/modal";

let show: (file: any) => void;

export const FilePreviewModal = () => {
  const { t } = useTranslation();

  const [file, setFile] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  show = (fileData) => {
    const fullPath =
      (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
        "https://pdt-bucket.s3.us-east-1.amazonaws.com") + fileData;

    setFile(fullPath);
    setShowModal(true);
  };

  const handleDownload = async () => {
    if (!file) return;

    try {
      const resp = await fetch(file, {
        mode: "cors",
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = (file.split("/").pop() || "download").split("?")[0];
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const onClose = () => setShowModal(false);

  const isImage = (file: string) => /\.(jpe?g|png)$/i.test(file);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => onClose()}
      className="modal-xl text-center p-5"
    >
      {file?.includes(".pdf") ? (
        <iframe src={file} width="100%" height="400px" title="PDF Preview" />
      ) : isImage(file) ? (
        <img src={file} className="img-fluid" alt="preview" />
      ) : (
        t("Global.Labels.FileCantBeReviewed")
      )}

      <div className="mt-4">
        <Button onClick={handleDownload}>{t("Global.Labels.Download")}</Button>

        <Button outline className="ms-2" onClick={() => onClose()}>
          {t("Global.Labels.Back")}
        </Button>
      </div>
    </Modal>
  );
};

export const triggerFilePreview = (file: any) => {
  if (typeof show === "function") show(file);
};
