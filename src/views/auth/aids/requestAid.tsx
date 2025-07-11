import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { getAidTypes } from "../../../utils/optionDataLists/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { getYesNo } from "../../../utils/optionDataLists/common";

interface Props {
  onSearch: (p: Object) => void;
  currentFilters: Object;
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
}

const RequestAid = ({
  onSearch,
  currentFilters,
  openModal,
  setOpenModal,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const aidTypes = getAidTypes(t);

  const requestAidInputs = () => [
    {
      type: "select",
      options: aidTypes,
      name: "type",
      label: t("Auth.Aids.AidType"),
      required: true,
    },
    {
      type: "text",
      name: "name",
      label: t("Auth.Aids.AidName"),
      required: true,
    },
    {
      type: "select",
      options: getYesNo(t),
      name: "urgent",
      label: t("Auth.Aids.Beneficiary.Urgent?"),
      required: true,
      halfCol: true,
    },
    {
      type: "file",
      name: "document",
      label: t("Global.Form.Labels.SupportingDocument"),
      required: false,
      halfCol: true,
    },
    {
      type: "textarea",
      name: "note",
      label: t("Auth.Aids.AidPurpose"),
      required: true,
    },
  ];

  return (
    <Modal
      title={t("Auth.Aids.Beneficiary.RequestAid")}
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Form
        inputs={requestAidInputs}
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e) => {
          AidApi.create(e)
            .then(() => {
              setOpenModal(false);
              onSearch({ filters: currentFilters, page: 1, capacity: 10 });
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Aids.Beneficiary.RequestAid"),
                    data: e.name,
                  }),
                })
              );
            })
            .catch(apiCatchGlobalHandler);
        }}
      />
    </Modal>
  );
};

export default RequestAid;
