import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Form from "../../../components/form";

const ResetPasswordView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formInputs = () => [
    {
      type: "password",
      name: "password",
      label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
      required: true,
    },
    {
      type: "password",
      name: "passwordConfirmation",
      label: t("Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"),
      required: true,
    },
  ];

  const onSubmit = (values = {}) => {
    navigate("/");
  };

  return (
    <div>
      <Form
        inputs={formInputs}
        submitText={t("Public.ForgotPassword.ResetPassword.ResetPassword")}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default ResetPasswordView;
