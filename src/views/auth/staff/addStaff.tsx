import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as ResearcherApi from "../../../api/staff/researcher";
import Form from "../../../components/form";
import Modal from "../../../components/modal";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

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
        inputs={() => [
          {
            label: t("Auth.Researchers.ResearcherName"),
            name: "name",
            type: "text",
            required: true,
          },
          {
            label: t("Global.Form.Label.PhoneNumber"),
            name: "username",
            type: "phoneNumber",
            required: true,
          },
          {
            label: t("Auth.MembershipRegistration.Form.IdNumber"),
            name: "idNumber",
            type: "numberText",
            minLength: 10,
            maxLength: 10,
            required: true,
          },
          {
            label: t("Global.Form.Label.Email"),
            name: "email",
            type: "email",
            required: true,
          },
          // {
          //   label: t("Auth.Researchers.AddProfilePhoto"),
          //   name: "photo",
          //   type: "file",
          //   required: false,
          // },
        ]}
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
