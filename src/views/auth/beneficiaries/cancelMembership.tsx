import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  beneficiaries: { id: string; status: string; fullName: string }[];
  modelOpen: string | null;
  setModalOpen: (t: string | null) => void;
  onGetData: (t: Object) => void;
}

const CancelMembership = ({
  beneficiaries,
  modelOpen,
  setModalOpen,
  onGetData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={t("Auth.Beneficiaries.Profile.CancelMembership")}
      onClose={() => setModalOpen(null)}
      isOpen={!!modelOpen}
    >
      <Form
        inputs={() => [
          {
            label: t("Auth.Beneficiaries.Profile.CancelMembershipReason"),
            name: "reason",
            type: "textarea",
            required: true,
            belowComp: (
              <div>
                <small className="text-info">
                  {t("Auth.Beneficiaries.Profile.CancelMembershipNote")}
                </small>
              </div>
            ),
            rows: 3,
          },
        ]}
        customButtons={
          <Button outline onClick={() => setModalOpen(null)} className="w-50">
            Back
          </Button>
        }
        submitText={t("Auth.Beneficiaries.Profile.CancelMembership")}
        onFormSubmit={(e, resetForm) => {
          BeneficiaryApi.cancel(modelOpen || "", e)
            .then(() => {
              resetForm();
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Beneficiaries.Profile.CancelMembership"),
                    data: beneficiaries.find((b) => b.id === modelOpen)
                      ?.fullName,
                  }),
                })
              );
              onGetData({});
              setModalOpen(null);
            })
            .catch(apiCatchGlobalHandler);
        }}
      />
    </Modal>
  );
};

export default CancelMembership;
