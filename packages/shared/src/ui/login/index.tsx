import { faApple, faGoogle, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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
  const [enabledOAuthProviders, setEnabledOAuthProviders] = useState<authApi.OAuthProvider[]>([
    "google",
    "apple",
    "microsoft",
  ]);
  const [emailLoginEnabled, setEmailLoginEnabled] = useState(true);

  const formInputs = () => [
    {
      type: "email",
      name: "email",
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
      email: (values?.email as string) || "",
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

  const onOAuthLogin = (provider: authApi.OAuthProvider) => {
    const popupUrl = authApi.getOAuthPopupStartUrl(provider, window.location.origin);
    const popup = window.open(
      popupUrl,
      `oauth_${provider}`,
      "width=520,height=720,left=100,top=100,resizable=yes,scrollbars=yes"
    );

    if (!popup) {
      apiCatchGlobalHandler(new Error("Popup blocked by browser"));
      return;
    }

    const closeInterval = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(closeInterval);
        window.removeEventListener("message", onMessage);
      }
    }, 400);

    const onMessage = (event: MessageEvent<authApi.OAuthPopupMessage>) => {
      if (event.source !== popup || !event.data || event.data.source !== "initia-oauth") {
        return;
      }

      window.clearInterval(closeInterval);
      window.removeEventListener("message", onMessage);
      popup.close();

      if (event.data.success && event.data.payload) {
        onLoginSuccess?.(event.data.payload);
        return;
      }

      apiCatchGlobalHandler(new Error(event.data.message || "OAuth login failed"));
    };

    window.addEventListener("message", onMessage);
  };

  useEffect(() => {
    authApi
      .getOAuthProvidersConfig()
      .then((res) => {
        const enabled = res.payload?.enabledProviders || [];
        setEmailLoginEnabled(res.payload?.emailLoginEnabled ?? true);
        if (enabled.length || (res.payload?.providers || []).length) {
          setEnabledOAuthProviders(enabled);
        }
      })
      .catch(() => {
        setEmailLoginEnabled(true);
        setEnabledOAuthProviders(["google", "apple", "microsoft"]);
      });
  }, []);

  const providerMeta: Record<
    authApi.OAuthProvider,
    { label: string; icon: typeof faGoogle | typeof faApple | typeof faMicrosoft }
  > = {
    google: { label: "Continue with Google", icon: faGoogle },
    apple: { label: "Continue with Apple", icon: faApple },
    microsoft: { label: "Continue with Microsoft", icon: faMicrosoft },
  };

  return (
    <div>
      {enabledOAuthProviders.length ? (
        <div className="d-flex flex-column gap-2 mb-3">
          {enabledOAuthProviders.map((provider) => (
            <Button
              key={provider}
              className="w-100"
              outline
              color="dark"
              onClick={() => onOAuthLogin(provider)}
            >
              <FontAwesomeIcon icon={providerMeta[provider].icon} className="me-2" />
              {providerMeta[provider].label}
            </Button>
          ))}
        </div>
      ) : null}

      {emailLoginEnabled ? (
        <Form
          inputs={formInputs}
          submitText={t("Public.Login.Labels.Login")}
          onFormSubmit={onSubmit}
        />
      ) : null}

      {emailLoginEnabled && import.meta.env.VITE_APP_ENVIRONMENT === "staging" ? (
        <Button
          className="w-100 mt-3"
          onClick={() =>
            onSubmit({
              email: "example@example.com",
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
