import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AidApi from "../../../api/aids/aids";
import Button from "../../../components/core/button";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

interface Props {
  openModal: boolean | string;
  setOpenModal: (s: boolean) => void;
  onGetData: (p: Object) => void;
}

const AccountantApproveAid = ({
  openModal,
  setOpenModal,
  onGetData,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const approveLabel = t("Auth.Aids.Statuses.Approved");

  const onSubmit = () => {
    AidApi.updateStatus(String(openModal), "Approved")
      .then(() => {
        setOpenModal(false);
        onGetData({});
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: approveLabel,
              data: "المستفيد",
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <Modal
      title={t("Auth.Aids.ApproveAid")}
      onClose={() => setOpenModal(false)}
      isOpen={!!openModal}
    >
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td colSpan={2}>
              <h5 className="mb-4">KHD123</h5>
            </td>
          </tr>

          <tr>
            <td>
              <h5>القيمة المطلوبة</h5>
              <h3>5000</h3>
            </td>

            <td>
              <h5>الرصيد المتبقي</h5>
              <h3>5000</h3>
            </td>
          </tr>

          <tr>
            <td colSpan={2}>
              <Button className="w-100" onClick={() => onSubmit()}>
                {t("Global.Form.Labels.Approve")}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default AccountantApproveAid;
