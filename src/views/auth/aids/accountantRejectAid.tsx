import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
}

const AccountantRejectAid = ({ openModal, setOpenModal }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={t("Auth.Aids.RejectAid")}
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
    >
      <Form
        inputs={() => [
          {
            type: "textarea",
            name: "reason",
            label: t("Auth.AidCategories.AidRejectReason"),
          },
        ]}
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e, resetForm) => {
          AidApi.grant(e)
            .then(() => {
              setOpenModal(false);
              resetForm();
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Aids.RejectAid"),
                    data: "",
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
