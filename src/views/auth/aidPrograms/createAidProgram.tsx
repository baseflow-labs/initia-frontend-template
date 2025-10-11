import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidProgramApi from "../../../api/aids/aidPrograms";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { AidCategory, AidProgram } from "../../../types/aids";
import { geAddAidProgramInputs } from "../../../utils/formInputs/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  onGetData: (p: Object) => void;
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
  aidCategories: AidCategory[];
  crudData: AidProgram;
}

const AddAidProgram = ({
  onGetData,
  openModal,
  setOpenModal,
  aidCategories,
  crudData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={
        crudData.id
          ? t("Auth.AidPrograms.EditAidProgram")
          : t("Auth.AidPrograms.AddAidProgram")
      }
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
    >
      <Form
        inputs={(formik: FormikProps<Record<string, any>>) =>
          geAddAidProgramInputs(t, aidCategories, formik)
        }
        submitText={t("Global.Form.Labels.SubmitApplication")}
        initialValues={crudData.id ? crudData : undefined}
        onFormSubmit={(e, resetForm) => {
          e.id
            ? AidProgramApi.update(e.id, e)
                .then(() => {
                  setOpenModal(false);
                  onGetData({});
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.AidPrograms.EditAidProgram"),
                        data: e.name,
                      }),
                    })
                  );
                })
                .catch(apiCatchGlobalHandler)
            : AidProgramApi.create(e)
                .then(() => {
                  setOpenModal(false);
                  onGetData({});
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.AidPrograms.AddAidProgram"),
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

export default AddAidProgram;
