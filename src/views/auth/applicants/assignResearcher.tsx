import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { getAssignResearcherInputs } from "../../../utils/formInputs/beneficiaries";
import { apiCatchGlobalHandler } from "../../../utils/function";

const AssignResearcher = ({
  beneficiaries,
  researchers,
  onGetData,
  openModal,
  setOpenModal,
}: {
  beneficiaries: {
    id: string;
    status: string;
    fullName: string;
    fileNo: string;
    staff?: { id: string };
  }[];
  researchers: { id: string; status: string; fullName: string }[];
  onGetData: (t: Object) => void;
  openModal: { beneficiary: string[]; staff: string } | undefined;
  setOpenModal: (
    t: { beneficiary: string[]; staff: string } | undefined
  ) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={t("Auth.Beneficiaries.Profile.AssignResearcher")}
      onClose={() => setOpenModal(undefined)}
      isOpen={!!openModal}
    >
      {openModal && (
        <Form
          inputs={() =>
            getAssignResearcherInputs(t, beneficiaries, researchers)
          }
          // customButtons={
          //   <Button
          //     outline
          //     onClick={() => setOpenModal(null)}
          //     className="w-50"
          //   >
          //     Back
          //   </Button>
          // }
          initialValues={openModal}
          submitText={t("Auth.Researchers.Assign")}
          onFormSubmit={(e, resetForm) => {
            BeneficiaryApi.assignResearcher(e)
              .then(() => {
                resetForm();
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Beneficiaries.Profile.AssignResearcher", {
                        researcher: researchers.find(
                          ({ id }) => e.researcher === id
                        )?.fullName,
                      }),
                      data: beneficiaries.find((b) => b.id === e.beneficiary)
                        ?.fileNo,
                    }),
                  })
                );
                onGetData({});
                setOpenModal(undefined);
              })
              .catch(apiCatchGlobalHandler);
          }}
        />
      )}
    </Modal>
  );
};

export default AssignResearcher;
