import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AuthApi from "../../../api/auth";
import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { getApplicantsRegistrationInputs } from "../../../utils/formInputs/beneficiaries";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { useAppSelector } from "../../../store/hooks";

const RegisterApplicant = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (t: boolean) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Modal
      title={t("Auth.Beneficiaries.AddBeneficiary")}
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
    >
      <Form
        inputs={() => getApplicantsRegistrationInputs(t)}
        submitText={t("Auth.Beneficiaries.AddBeneficiary")}
        onFormSubmit={(e, resetForm) => {
          AuthApi.register({
            ...e,
            password: e.idNumber,
            passwordConfirmation: e.idNumber,
            code: e.idNumber,
            role: "beneficiary",
          })
            .then((res: any) => {
              if (user.role === "researcher") {
                BeneficiaryApi.assignResearcher({
                  beneficiary: res.payload.id,
                  staffUser: user.id,
                })
                  .then(() => {
                    resetForm();
                    dispatch(
                      addNotification({
                        msg: t("Global.Form.SuccessMsg", {
                          action: t("Auth.Beneficiaries.AddBeneficiary"),
                          data: e.name,
                        }),
                      })
                    );
                    setOpenModal(false);
                  })
                  .catch(apiCatchGlobalHandler);
              } else {
                resetForm();
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Beneficiaries.AddBeneficiary"),
                      data: e.name,
                    }),
                  })
                );
                setOpenModal(false);
              }
            })
            .catch(apiCatchGlobalHandler);
        }}
      />
    </Modal>
  );
};

export default RegisterApplicant;
