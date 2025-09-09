import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { AidCategory, AidProgram } from "../../../types/aids";
import { getGrantAidInputs } from "../../../utils/formInputs/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  onGetData: (p: Object) => void;
  currentFilters: Object;
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
  selectOptions: {
    beneficiaries: {
      id: string;
      fileNo: string;
      fullName: string;
      status: { status: string };
    }[];
    aidPrograms: AidProgram[];
    aidCategories: AidCategory[];
  };
}

const SendAid = ({
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
      title={t("Auth.Aids.AddAid")}
      className="modal-xl"
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
    >
      <Form
        inputs={(formik: FormikProps<Record<string, any>>) =>
          getGrantAidInputs(t, selectOptions, formik)
        }
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e, resetForm) => {
          AidApi.grant(e)
            .then(() => {
              setOpenModal(false);
              onGetData({});
              resetForm();
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Aids.AddAid"),
                    data: selectOptions.beneficiaries.find(
                      ({ id }) => id === e.beneficiary
                    )?.fileNo,
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
