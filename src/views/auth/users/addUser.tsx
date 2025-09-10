import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as UserApi from "../../../api/staff/researcher";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { getUserCrudInputs } from "../../../utils/formInputs/users";

const AddUsers = ({
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
    ? t("Auth.Users.EditUser")
    : t("Auth.Users.AddUser");

  return (
    <Modal
      title={label}
      onClose={() => setOpenModal(undefined)}
      isOpen={!!openModal}
    >
      <Form
        inputs={() => getUserCrudInputs(t)}
        submitText={label}
        onFormSubmit={(e, resetForm) => {
          e.id
            ? UserApi.update({
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
                        action: t("Auth.Users.EditUser"),
                        data: e.name,
                      }),
                    })
                  );
                  getData({});
                  setOpenModal(undefined);
                })
                .catch(apiCatchGlobalHandler)
            : UserApi.create({
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
                        action: t("Auth.Users.AddUser"),
                        data: e.name,
                      }),
                    })
                  );
                  getData({});
                  setOpenModal(undefined);
                })
                .catch(apiCatchGlobalHandler);
        }}
        initialValues={openModal}
      />
    </Modal>
  );
};

export default AddUsers;
