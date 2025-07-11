import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as BeneficiaryApi from "../../../api/profile/beneficiary";
import Button from "../../../components/core/button";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";

const AccountDelete = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);

  const deleteBeneficiary = () => {
    BeneficiaryApi.removeByUser(user.id || "").then(() => {
      setOpenModal(false);
      dispatch(
        addNotification({
          msg: t("Global.Form.SuccessMsg", {
            action: t("Auth.Beneficiaries.Profile.DeleteData"),
            data: t("Global.Labels.YourOwn"),
          }),
        })
      );
    });
  };

  return (
    <Fragment>
      <Button
        onClick={() => setOpenModal(true)}
        color="danger"
        className="my-3 w-100"
      >
        {t("Auth.Beneficiaries.Profile.DeleteData")}
      </Button>

      <Modal
        title={t("Auth.Beneficiaries.Profile.DeleteData")}
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
      >
        <h3 className="text-center mb-3">
          {t("Auth.Beneficiaries.Profile.SureToDeleteData")}
        </h3>

        <div className="btn-group w-100" role="group">
          <Button
            onClick={() => deleteBeneficiary()}
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
            color="info"
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
