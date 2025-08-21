import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  openModal: boolean | string;
  setOpenModal: (s: boolean) => void;
  onGetData: (p: Object) => void;
}

const AccountantRejectAid = ({ openModal, setOpenModal, onGetData }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rejectLabel = t("Auth.Aids.Statuses.Rejected");

  return (
    <Modal
      title={t("Auth.Aids.RejectAid")}
      onClose={() => setOpenModal(false)}
      isOpen={!!openModal}
    >
      <Form
        inputs={() => [
          {
            type: "textarea",
            name: "note",
            label: t("Auth.AidCategories.AidRejectReason"),
            required: true,
          },
        ]}
        onFormSubmit={(e, resetForm) => {
          AidApi.updateStatus(String(openModal), "Denied", e.note)
            .then(() => {
              setOpenModal(false);
              resetForm();
              onGetData({});
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: rejectLabel,
                    data: "المستفيد",
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

export default AccountantRejectAid;
