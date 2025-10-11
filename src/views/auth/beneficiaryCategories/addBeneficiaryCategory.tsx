import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryCategoryApi from "../../../api/profile/beneficiaryCategory";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { BeneficiaryCategory } from "../../../types/beneficiaries";
import { getCategoryInputs } from "../../../utils/formInputs/beneficiaryProfile";
import { apiCatchGlobalHandler } from "../../../utils/function";

const AddBeneficiaryCategories = ({
  getData,
  openModal,
  setOpenModal,
}: {
  getData: (t: Object) => void;
  openModal: BeneficiaryCategory | null;
  setOpenModal: (s: BeneficiaryCategory | null) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const label = openModal?.id
    ? t("Auth.BeneficiaryCategories.EditBeneficiaryCategory")
    : t("Auth.BeneficiaryCategories.AddBeneficiaryCategory");

  return (
    <Modal
      title={label}
      onClose={() => setOpenModal(null)}
      isOpen={!!openModal}
    >
      <Form
        inputs={() =>
          getCategoryInputs(t).map((e) => ({
            ...e,
            label: t(e.label || "", { index: "" }),
          }))
        }
        submitText={label}
        onFormSubmit={(e, resetForm) => {
          BeneficiaryCategoryApi[e.id ? "update" : "create"](e)
            .then(() => {
              resetForm();
              dispatch(
                addNotification({
                  msg: t("Global.Form.SuccessMsg", {
                    action: t(
                      "Auth.BeneficiaryCategories.EditBeneficiaryCategory"
                    ),
                    data: e.name,
                  }),
                })
              );
              getData({});
              setOpenModal(null);
            })
            .catch(apiCatchGlobalHandler);
        }}
        initialValues={openModal?.id ? openModal : undefined}
      />
    </Modal>
  );
};

export default AddBeneficiaryCategories;
