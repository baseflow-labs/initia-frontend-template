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
    setFile(
      (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
        "https://pdt-bucket.s3.us-east-1.amazonaws.com") + fileData
    );
    setShowModal(true);
  };

  const handleDownload = () => {
    if (!file) return;

    const link = document.createElement("a");
    link.href = file;
    link.download = file.split("/").pop() || "download";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      className="modal-xl text-center p-5"
    >
      {file?.includes(".pdf") ? (
        <iframe src={file} width="100%" height="400px" title="PDF Preview" />
      ) : (
        <img src={file} className="img-fluid" alt="preview" />
      )}

      <Button onClick={() => handleDownload()}>
        {t("Global.Labels.Download")}
      </Button>
    </Modal>
  );
};

export const triggerFilePreview = (file: any) => {
  if (typeof show === "function") show(file);
};
