import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const RejectApplicant = ({
  beneficiaries,
  onSearch,
  openModal,
  setOpenModal,
}: {
  beneficiaries: { id: string; status: string; fullName: string }[];
  onSearch: (t: Object) => void;
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
        inputs={() => [
          {
            label: t("Auth.Beneficiaries.Profile.ApplicationRejectReason"),
            name: "reason",
            type: "textarea",
            required: true,
            rows: 3,
          },
        ]}
        customButtons={
          <Button outline onClick={() => setOpenModal(null)} className="w-50">
            Back
          </Button>
        }
        submitText={t("Auth.Beneficiaries.Profile.RejectApplication")}
        onFormSubmit={(e) => {
          BeneficiaryApi.reject(openModal || "", e)
            .then(() => {
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Beneficiaries.Profile.RejectApplication"),
                    data: beneficiaries.find((b) => b.id === openModal)
                      ?.fullName,
                  }),
                })
              );
              onSearch({ filters: {}, page: 1, capacity: 10 });
              setOpenModal(null);
            })
            .catch(apiCatchGlobalHandler);
        }}
      />
    </Modal>
  );
};

export default RejectApplicant;
