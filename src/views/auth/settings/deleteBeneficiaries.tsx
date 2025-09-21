import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as UserApi from "../../../api/profile/user";
import Button from "../../../components/core/button";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { useAppSelector } from "../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../utils/function";
import Spinner from "../../../components/core/spinner";

const DeleteBeneficiaries = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useAppSelector((state) => state.loading);

  const [openModal, setOpenModal] = useState(false);

  const deleteBeneficiary = () => {
    UserApi.removeAllBeneficiaries()
      .then(() => {
        setOpenModal(false);
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Auth.Beneficiaries.Profile.DeleteData"),
              data: t("Auth.Settings.BulkDataInsertion.BeneficiariesData"),
            }),
          })
        );
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
        {t("Auth.Beneficiaries.DeleteAll")}
      </Button>

      <Modal
        title={t("Auth.Beneficiaries.DeleteAll")}
        onClose={() => setOpenModal(false)}
        isOpen={openModal}
      >
        <h3 className="text-center mb-3">
          {t("Auth.Beneficiaries.Profile.SureToDeleteData")}
        </h3>

        <div className="text-center">
          {loading.length > 0 && <Spinner color="danger" />}
        </div>

        <div className="btn-group w-100" role="group">
          <Button
            onClick={() => deleteBeneficiary()}
            disabled={
              process.env.REACT_APP_ENVIRONMENT === "stagging" ||
              loading.length > 0
            }
            color="danger"
            className="my-3 me-1"
          >
            {process.env.REACT_APP_ENVIRONMENT === "stagging"
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

export default DeleteBeneficiaries;
