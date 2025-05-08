import { useTranslation } from "react-i18next";
import Form from "../../../components/form";

const LoginView = () => {
  const { t } = useTranslation();

  const formInputs = [
    {
      type: "phoneNumber",
      name: "phoneNo",
      label: t("Public.Login.Labels.PhoneNo"),
      prefix: "+966",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: t("Public.Login.Labels.Password"),
      required: true,
    },
  ];

  return (
    <div>
      <Form inputs={formInputs} submitText={t("Public.Login.Labels.Login")} />
    </div>
  );
};

export default LoginView;
