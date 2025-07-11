import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { getAidTypes } from "../../../utils/optionDataLists/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  onSearch: (p: Object) => void;
  currentFilters: Object;
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
  selectOptions: {
    beneficiaries: {
      id: string;
      fullName: string;
      status: { status: string };
    }[];
  };
}

const SendAid = ({
  onSearch,
  currentFilters,
  openModal,
  setOpenModal,
  selectOptions,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const aidTypes = getAidTypes(t);

  const grantAidInputs = () => [
    {
      type: "select",
      options: selectOptions.beneficiaries
        .filter(({ status }) => status.status === "Accepted")
        .map(({ id, fullName }) => ({
          value: id,
          label: fullName,
        })),
      name: "beneficiary",
      label: t("Auth.Beneficiaries.BeneficiaryName"),
      required: true,
    },
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
      type: "textarea",
      name: "note",
      label: t("Global.Form.Labels.Notes"),
      required: false,
    },
  ];

  return (
    <Modal
      title={t("Auth.Aids.AddAid")}
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
    >
      <Form
        inputs={grantAidInputs}
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e) => {
          AidApi.grant(e)
            .then(() => {
              setOpenModal(false);
              onSearch({ filters: currentFilters, page: 1, capacity: 10 });
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Aids.AddAid"),
                    data: selectOptions.beneficiaries.find(
                      ({ id }) => id === e.beneficiary
                    )?.fullName,
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

export default SendAid;
