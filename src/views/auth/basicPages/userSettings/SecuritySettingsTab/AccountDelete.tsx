import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as UserApi from "../../../../../api/users";
import Button from "../../../../../components/core/button";
import Modal from "../../../../../components/modal";
import { logout } from "../../../../../store/actions/auth";
import { addNotification } from "../../../../../store/actions/notifications";
import { useAppSelector } from "../../../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../../../utils/function";

const AccountDelete = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);

  const deleteUser = () => {
    UserApi.remove(user.id || "")
      .then(() => {
        setOpenModal(false);
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Users.Profile.DeleteData"),
              data: t("Global.Labels.YourOwn"),
            }),
          })
        );

        dispatch(logout());
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <Fragment>
      <Button
        onClick={() => setOpenModal(true)}
        color="danger"
        className="my-3 w-100"
      >
        {t("Auth.Users.Profile.DeleteData")}
      </Button>

      <Modal
        title={t("Auth.Users.Profile.DeleteData")}
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
      >
        <h3 className="text-center mb-3">
          {t("Auth.Users.Profile.SureToDeleteData")}
        </h3>

        <div className="btn-group w-100" role="group">
          <Button
            onClick={() => deleteUser()}
            disabled={process.env.REACT_APP_ENVIRONMENT === "staging"}
            color="danger"
            className="my-3 me-1"
          >
            {process.env.REACT_APP_ENVIRONMENT === "staging"
              ? t("Global.Form.Labels.UnAvailableForDemoMode")
              : t("Global.Form.Labels.Yes")}
          </Button>

          <Button
            outline
            onClick={() => setOpenModal(false)}
            color="primary"
            className="my-3 ms-1"
          >
            {t("Global.Form.Labels.No")}
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AccountDelete;
