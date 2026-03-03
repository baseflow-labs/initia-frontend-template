import { useTranslation } from "react-i18next";

import * as authApi from "../../api/auth";
import type { AuthResponse } from "../../types/auth";
import BelowInputButton from "../../ui/components/button/belowInput";
import Button from "../../ui/components/core/button";
import Form from "../../ui/components/form";
import { apiCatchGlobalHandler } from "../../utils/function";

interface LoginViewProps {
  onLoginSuccess?: (auth: AuthResponse) => void;
}

const LoginView = ({ onLoginSuccess }: LoginViewProps) => {
  const { t } = useTranslation();

  const formInputs = () => [
    {
      type: "email",
      name: "identifier",
      label: t("Public.Login.Labels.Email"),
      required: true,
      fullWidth: true,
    },
    {
      type: "password",
      name: "password",
      label: t("Public.Login.Labels.Password"),
      belowComp: (
        <BelowInputButton
          introText=""
          buttonText={t("Public.Login.Labels.DidUForgotPassword")}
          route="/forgot-password"
        />
      ),
      required: true,
      fullWidth: true,
    },
  ];

  const onSubmit = (values?: Record<string, unknown>) => {
    const credentials = {
      identifier: (values?.identifier as string) || "",
      password: (values?.password as string) || "",
    };
    authApi
      .login(credentials)
      .then((res) => {
        if (res.payload) {
          onLoginSuccess?.(res.payload);
        }
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <div>
      <Form
        inputs={formInputs}
        submitText={t("Public.Login.Labels.Login")}
        onFormSubmit={onSubmit}
      />

      {import.meta.env.VITE_APP_ENVIRONMENT === "staging" ? (
        <Button
          className="w-100 mt-3"
          onClick={() =>
            onSubmit({
              identifier: "example@example.com",
              password: "s5Rsa2?#sd1154",
            })
          }
        >
          {t("Public.Login.Labels.DummyLogin")}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginView;
