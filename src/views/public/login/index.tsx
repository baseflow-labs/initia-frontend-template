import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as authApi from "../../../api/auth";
import BelowInputButton from "../../../components/button/belowInput";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import { login } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const LoginView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formInputs = () => [
    {
      type: "phoneNumber",
      name: "identifier",
      label: t("Public.Login.Labels.PhoneNo"),
      required: true,
      fullWidth: true
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
      fullWidth: true
    },
  ];

  const onSubmit = (values: authApi.loginCredentials) => {
    authApi
      .login(values)
      .then((res: any) => {
        dispatch(
          addNotification({
            msg: t("Public.Login.Labels.Success", {
              name: res.payload.user.name,
            }),
          })
        );
        dispatch(login(res.payload));
      })
      .catch(apiCatchGlobalHandler);
  };

  const onDummySubmit = () => {    
    dispatch(
      addNotification({
        msg: t("Public.Login.Labels.Success", {
          name: 'Dummy Admin User',
        }),
      })
    );
    dispatch(login({
      accessToken: 'thisIsDummyToken',
      refreshToken: 'thisIsDummyRefreshToken',
      user: {
        id: "1",
        name: "Suhaib Ahmad",
        email: "SuhaibAhmadAi@hotmail.com",
        username: "admin",
        status: "active",
        role: "admin"
      }
    }));
  };

  return (
    <div>
      <Form
        inputs={formInputs}
        submitText={t("Public.Login.Labels.Login")}
        onFormSubmit={onSubmit}
      />

      {process.env.REACT_APP_ENVIRONMENT === "staging" ? (
        <Button
          className="w-100 mt-3"
          onClick={() => onDummySubmit()}
        >
          {t("Public.Login.Labels.DummyLogin", { type: "User" })}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginView;
