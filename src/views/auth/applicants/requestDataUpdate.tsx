import { useTranslation } from "react-i18next";

import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { Dispatch } from "react";
import { ReviewProps } from "./review";
import { getRequestDataUpdateInputs } from "../../../utils/formInputs/beneficiaries";

interface Props {
  openModal: ReviewProps;
  setOpenModal: (t: ReviewProps) => void;
  dataReview: ReviewProps[];
  setDataReview: Dispatch<React.SetStateAction<ReviewProps[]>>;
}

const RequestDataUpdate = ({
  openModal,
  setOpenModal,
  dataReview,
  setDataReview,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("Auth.Beneficiaries.Profile.RequestDataUpdate", {
        property: openModal.label,
      })}
      onClose={() => setOpenModal({})}
      isOpen={!!openModal.property}
    >
      <Form
        initialValues={dataReview}
        inputs={() => getRequestDataUpdateInputs(t)}
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e, resetForm) => {
          setDataReview((current: ReviewProps[]) =>
            current.map((row: ReviewProps) => {
              const isSameRow =
                row.property === openModal.property &&
                row.table === openModal.table &&
                ((row.table !== "housing" && row.table !== "dependents") ||
                  row.row === openModal.row);

              return isSameRow
                ? {
                    ...row,
                    note: e.note,
                    needUpdate: true,
                    new: true,
                    confirm: false,
                  }
                : row;
            })
          );

          setOpenModal({});
          resetForm();
        }}
      />
    </Modal>
  );
};

export default RequestDataUpdate;
