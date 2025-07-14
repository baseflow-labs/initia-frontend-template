import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as ResearcherApi from "../../../api/staff/researcher";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";
import { getStaffCrudInputs } from "../../../utils/formInputs/staff";

const AddStaff = ({
  getData,
  openModal,
  setOpenModal,
}: {
  getData: (t: Object) => void;
  openModal: Object | undefined;
  setOpenModal: (s: Object | undefined) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      title={t("Auth.Researchers.AddResearcher")}
      onClose={() => setOpenModal(undefined)}
      isOpen={!!openModal}
    >
      <Form
        inputs={() => getStaffCrudInputs(t)}
        submitText={t("Auth.Researchers.AddResearcher")}
        onFormSubmit={(e) => {
          ResearcherApi.create({
            ...e,
            role: "researcher",
            password: e.username,
            passwordConfirmation: e.username,
            code: "654321",
          })
            .then(() => {
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
        initialValues={openModal}
      />
    </Modal>
  );
};

export default AddStaff;
