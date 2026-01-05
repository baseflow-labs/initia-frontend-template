import * as authApi from "@initia/shared/api/auth";
import BelowInputButton from "@initia/shared/ui/components/button/belowInput";
import Button from "@initia/shared/ui/components/core/button";
import Form from "@initia/shared/ui/components/form";
import { login } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const LoginView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
        dispatch(
          addNotification({
            msg: t("Public.Login.Labels.Success", {
              name: res.payload?.user?.name || res.payload?.user?.role || "",
            }),
          })
        );

        if (res.payload) {
          dispatch(login(res.payload));
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
