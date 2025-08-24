import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { getApplicantsRejectionInputs } from "../../../utils/formInputs/beneficiaries";
import { apiCatchGlobalHandler } from "../../../utils/function";

const RejectApplicant = ({
  beneficiaries,
  onGetData,
  openModal,
  setOpenModal,
}: {
  beneficiaries: { id: string; status: string; fullName: string }[];
  onGetData: (t: Object) => void;
  openModal: string | null;
  setOpenModal: (t: string | null) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={t("Auth.Beneficiaries.Profile.RejectApplication")}
      onClose={() => setOpenModal(null)}
      isOpen={!!openModal}
    >
      <Form
        inputs={() => getApplicantsRejectionInputs(t)}
        submitText={t("Auth.Beneficiaries.Profile.RejectApplication")}
        onFormSubmit={(e, resetForm) => {
          BeneficiaryApi.reject(openModal || "", e)
            .then(() => {
              resetForm();
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Beneficiaries.Profile.RejectApplication"),
                    data: beneficiaries.find((b) => b.id === openModal)
                      ?.fullName,
                  }),
                })
              );
              onGetData({});
              setOpenModal(null);
            })
            .catch(apiCatchGlobalHandler);
        }}
      />
    </Modal>
  );
};

export default RejectApplicant;
