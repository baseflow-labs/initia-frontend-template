import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidCategoryApi from "../../../api/aids/aidCategories";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { AidCategory } from "../../../types/aids";
import { geAddAidCategoryInputs } from "../../../utils/formInputs/aids";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  onGetData: (p: Object) => void;
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
  crudData: AidCategory;
}

const AddAidCategory = ({
  onGetData,
  openModal,
  setOpenModal,
  crudData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={
        crudData.id
          ? t("Auth.AidCategories.EditAidCategory")
          : t("Auth.AidCategories.AddAidCategory")
      }
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
    >
      <Form
        inputs={(formik: FormikProps<Record<string, any>>) =>
          geAddAidCategoryInputs(t)
        }
        initialValues={crudData}
        submitText={t("Global.Form.Labels.SubmitApplication")}
        onFormSubmit={(e, resetForm) => {
          e.id
            ? AidCategoryApi.update(e.id, e)
                .then(() => {
                  setOpenModal(false);
                  onGetData({});
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.AidCategories.EditAidCategory"),
                        data: e.name,
                      }),
                    })
                  );
                })
                .catch(apiCatchGlobalHandler)
            : AidCategoryApi.create(e)
                .then(() => {
                  setOpenModal(false);
                  onGetData({});
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.AidCategories.AddAidCategory"),
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

export default AddAidCategory;
