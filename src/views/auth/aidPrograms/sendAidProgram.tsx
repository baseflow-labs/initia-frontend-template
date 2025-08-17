import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidProgramApi from "../../../api/aids/aidPrograms";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { geAddAidProgramInputs } from "../../../utils/formInputs/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { getAidProgramTypes } from "../../../utils/optionDataLists/aids";

interface Props {
  onGetData: (p: Object) => void;
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

const SendAidProgram = ({
  onGetData,
  currentFilters,
  openModal,
  setOpenModal,
  selectOptions,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={t("Auth.AidPrograms.AddAidProgram")}
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
    >
      <Form
        inputs={() =>
          geAddAidProgramInputs(t, getAidProgramTypes(t), selectOptions)
        }
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e, resetForm) => {
          AidProgramApi.grant(e)
            .then(() => {
              setOpenModal(false);
              onGetData({});
              resetForm();
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.AidPrograms.AddAidProgram"),
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

export default SendAidProgram;
