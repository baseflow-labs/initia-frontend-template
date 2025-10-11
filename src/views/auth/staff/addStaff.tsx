import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as ResearcherApi from "../../../api/staff/researcher";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { getStaffCrudInputs } from "../../../utils/formInputs/staff";
import { apiCatchGlobalHandler } from "../../../utils/function";

const AddStaff = ({
  getData,
  openModal,
  setOpenModal,
}: {
  getData: (t: Object) => void;
  openModal:
    | {
        id?: string;
        name?: string;
        email?: string;
        username?: string;
        idNumber?: string;
        image?: string;
        beneficiariesCount?: number;
        visitsCount?: number;
      }
    | undefined;
  setOpenModal: (s: Object | undefined) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const label = openModal?.id
    ? t("Auth.Researchers.EditResearcher")
    : t("Auth.Researchers.AddResearcher");

  return (
    <Modal
      title={label}
      onClose={() => setOpenModal(undefined)}
      isOpen={!!openModal}
    >
      <Form
        inputs={() => getStaffCrudInputs(t)}
        submitText={label}
        onFormSubmit={(e, resetForm) => {
          e.id
            ? ResearcherApi.update({
                ...e,
                role: "researcher",
                password: e.username,
                passwordConfirmation: e.username,
                code: "654321",
              })
                .then(() => {
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.Researchers.EditResearcher"),
                        data: e.name,
                      }),
                    })
                  );
                  getData({});
                  setOpenModal(undefined);
                })
                .catch(apiCatchGlobalHandler)
            : ResearcherApi.create({
                ...e,
                role: "researcher",
                password: e.username,
                passwordConfirmation: e.username,
                code: "654321",
              })
                .then(() => {
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.Researchers.AddResearcher"),
                        data: e.name,
                      }),
                    })
                  );
                  getData({});
                  setOpenModal(undefined);
                })
                .catch(apiCatchGlobalHandler);
        }}
        initialValues={openModal?.id ? openModal : undefined}
      />
    </Modal>
  );
};

export default AddStaff;
