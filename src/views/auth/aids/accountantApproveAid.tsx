import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as AidApi from "../../../api/aids/aids";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";
import Button from "../../../components/core/button";

interface Props {
  openModal: boolean;
  setOpenModal: (s: boolean) => void;
}

const AccountantApproveAid = ({ openModal, setOpenModal }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={t("Auth.Aids.ApproveAid")}
      onClose={() => setOpenModal(false)}
      isOpen={openModal}
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
            {" "}
            <td colSpan={2}>
              <Button className="w-100">موافقة</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  );
};

export default AccountantApproveAid;
