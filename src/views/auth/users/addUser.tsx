import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as UserApi from "../../../api/staff/researcher";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { getUserCrudInputs } from "../../../utils/formInputs/users";
import { User } from "../../../types/beneficiaries";

const AddUsers = ({
  getData,
  openModal,
  setOpenModal,
}: {
  getData: (t: Object) => void;
  openModal: User | null;
  setOpenModal: (s: User | null) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const label = openModal?.id
    ? t("Auth.Users.EditUser")
    : t("Auth.Users.AddUser");

  return (
    <Modal
      title={label}
      onClose={() => setOpenModal(null)}
      isOpen={!!openModal}
    >
      <Form
        inputs={() => getUserCrudInputs(t)}
        submitText={label}
        onFormSubmit={(e, resetForm) => {
          const { id, ...formData } = e;
          id?.length
            ? UserApi.update(e)
                .then(() => {
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.Users.EditUser"),
                        data: e.name,
                      }),
                    })
                  );
                  getData({});
                  setOpenModal(null);
                })
                .catch(apiCatchGlobalHandler)
            : UserApi.create({
                ...formData,
                password: e.idNumber,
                passwordConfirmation: e.idNumber,
                code: "654321",
              })
                .then(() => {
                  resetForm();
                  dispatch(
                    addNotification({
                      msg: t("Global.Form.SuccessMsg", {
                        action: t("Auth.Users.AddUser"),
                        data: e.name,
                      }),
                    })
                  );
                  getData({});
                  setOpenModal(null);
                })
                .catch(apiCatchGlobalHandler);
        }}
        initialValues={openModal as object}
      />
    </Modal>
  );
};

export default AddUsers;
