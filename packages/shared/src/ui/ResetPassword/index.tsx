import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Form from "../../ui/components/form";
import { formInputs } from "./inputs";

const ResetPasswordView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = (_values?: Record<string, unknown>) => {
    navigate("/");
  };

  return (
    <div>
      <Form
        inputs={() => formInputs(t)}
        submitText={t("Public.ForgotPassword.ResetPassword.ResetPassword")}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default ResetPasswordView;
