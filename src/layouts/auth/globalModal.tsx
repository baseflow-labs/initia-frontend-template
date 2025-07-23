import { useState } from "react";
import Modal from "../../components/modal";

let show: (file: any) => void;

export const FilePreviewModal = () => {
  const [file, setFile] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  show = (fileData) => {
    setFile(fileData);
    setShowModal(true);
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      className="modal-xl text-center p-5"
    >
      {file?.includes(".pdf") ? (
        <iframe
          src={
            (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
              "https://pdt-bucket.s3.us-east-1.amazonaws.com") + file
          }
          width="100%"
          height="400px"
          title="PDF Preview"
        />
      ) : (
        <img
          src={
            (process.env.REACT_APP_STORAGE_DIRECTORY_URL ||
              "https://pdt-bucket.s3.us-east-1.amazonaws.com") + file
          }
          className="img-fluid"
          alt="preview"
        />
      )}
    </Modal>
  );
};

export const triggerFilePreview = (file: any) => {
  if (typeof show === "function") show(file);
};
