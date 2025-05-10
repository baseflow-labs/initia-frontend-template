import { useTranslation } from "react-i18next";
import Form from "../../../components/form";

const RegisterView = () => {
  const { t } = useTranslation();

  const formInputs = [
    {
      type: "text",
      name: "name",
      label: t("Public.Register.Labels.Name"),
      required: true,
    },
    {
      type: "phoneNumber",
      name: "phoneNo",
      label: t("Public.Register.Labels.PhoneNo"),
      prefixText: "+966",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: t("Public.Register.Labels.Password"),
      required: true,
    },
    {
      type: "password",
      name: "passwordConfirmation",
      label: t("Public.Register.Labels.PasswordConfirmation"),
      required: true,
    },
  ];

  return (
    <div>
      <Form
        inputs={formInputs}
        submitText={t("Public.Register.Labels.Register")}
      />
    </div>
  );
};

export default RegisterView;
