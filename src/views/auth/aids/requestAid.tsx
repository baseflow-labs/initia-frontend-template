import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { AidProgram } from "../../../types/aids";
import { getRequestAidInputs } from "../../../utils/formInputs/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  onGetData: (p: Object) => void;
  currentFilters: Object;
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
  selectOptions: {
    aidPrograms: AidProgram[];
  };
}

const RequestAid = ({
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
      title={t("Auth.Aids.Beneficiary.RequestAid")}
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Form
        inputs={(formik: FormikProps<Record<string, any>>) =>
          getRequestAidInputs(t, selectOptions, formik)
        }
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e, resetForm) => {
          AidApi.create({ ...e, requestedValue: e.value })
            .then(() => {
              setOpenModal(false);
              resetForm();
              onGetData({ page: 1, capacity: 10 });
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t("Auth.Aids.Beneficiary.RequestAid"),
                    data: e.name,
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

export default RequestAid;
