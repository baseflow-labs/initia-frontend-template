import moment from "moment";
import { Dispatch } from "react";
import { useTranslation } from "react-i18next";

import Modal from "../../../components/modal";
import { dataRender } from "../../../components/table";
import { viewDayDateFormat } from "../../../utils/consts";
import { inputsData } from "../../../utils/formInputs/beneficiaryProfileMapping";
import { ReviewProps } from "./review";

const ViewDataArchive = ({
  openModal,
  setOpenModal,
}: {
  openModal: ReviewProps[];
  setOpenModal: Dispatch<React.SetStateAction<ReviewProps[]>>;
}) => {
  const { t } = useTranslation();

  const fieldsToShow = inputsData(t);

  return (
    <Modal
      title={t("Auth.Beneficiaries.Profile.Archive", {
        property: fieldsToShow[openModal[0]?.table || ""]?.find(
          (field) => field.name === openModal[0]?.property
        )?.label,
      })}
      onClose={() => setOpenModal([])}
      isOpen={!!openModal[0]?.property}
    >
      <ul>
        {openModal
          .sort((a, b) =>
            moment(a.dataUpdate?.createdAt).isBefore(
              moment(b.dataUpdate?.createdAt)
            )
              ? -1
              : 1
          )
          .map((row, i) => {
            const propertySpecs = fieldsToShow[row.table || ""].find(
              (field) => field.name === row.property
            );

            return (
              <li key={i}>
                {dataRender({
                  data: row.dataUpdate?.data || "",
                  type: propertySpecs?.type,
                  options: propertySpecs?.options,
                })}
                <small className="float-end">
                  {moment(row.dataUpdate?.createdAt).format(viewDayDateFormat)}
                </small>
              </li>
            );
          })}
      </ul>
    </Modal>
  );
};

export default ViewDataArchive;
