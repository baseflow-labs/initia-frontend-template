import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const AssignResearcher = ({
  beneficiaries,
  researchers,
  onSearch,
  openModal,
  setOpenModal,
}: {
  beneficiaries: {
    id: string;
    status: string;
    fullName: string;
    staff?: { id: string };
  }[];
  researchers: { id: string; status: string; fullName: string }[];
  onSearch: (t: Object) => void;
  openModal: { beneficiary: string; staff: string } | undefined;
  setOpenModal: (t: { beneficiary: string; staff: string } | undefined) => void;
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
          inputs={() => [
            {
              label: t("Auth.Beneficiaries.BeneficiaryName"),
              name: "beneficiary",
              type: "select",
              required: true,
              options: beneficiaries?.map(({ id, fullName }) => ({
                value: id,
                label: fullName,
              })),
            },
            {
              label: t("Auth.Researchers.ResearcherName"),
              name: "staff",
              type: "select",
              required: true,
              options: researchers.map(({ id, fullName }) => ({
                value: id,
                label: fullName,
              })),
            },
          ]}
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
          onFormSubmit={(e) => {
            BeneficiaryApi.assignResearcher(e.beneficiary || "", e)
              .then(() => {
                dispatch(
                  addNotification({
                    msg: t("Global.Form.SuccessMsg", {
                      action: t("Auth.Beneficiaries.Profile.AssignResearcher", {
                        researcher: researchers.find(
                          ({ id }) => e.researcher === id
                        )?.fullName,
                      }),
                      data: beneficiaries.find((b) => b.id === e.beneficiary)
                        ?.fullName,
                    }),
                  })
                );
                onSearch({ filters: {}, page: 1, capacity: 10 });
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
