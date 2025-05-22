import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as authApi from "../../../api/auth";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import { login } from "../../../store/actions/auth";

const LoginView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formInputs = () => [
    {
      type: "phoneNumber",
      name: "identifier",
      label: t("Public.Login.Labels.PhoneNo"),
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: t("Public.Login.Labels.Password"),
      belowComp: (
        <div className="d-block">
          <Button
            color="ghost"
            route="/forgot-password"
            size="sm"
            onClick={() => navigate("/forgot-password")}
          >
            {t("Public.Login.Labels.DidUForgotPassword")}
          </Button>
        </div>
      ),
      required: true,
    },
  ];

  const onSubmit = (values: authApi.loginCredentials) => {
    authApi
      .login({ ...values, identifier: "+966" + values.identifier })
      .then((res: any) => {
        console.log({ res });

        dispatch(
          login({
            jwt: res.payload.token,
            refreshToken: "thisIsFakeRefreshToken",
            user: res.payload.user || {
              id: "1",
              name: "Suhaib Ahmad",
              email: "SuhaibAhmadAi@hotmail.com",
            },
          })
        );
      });
  };

  return (
    <div>
      <Form
        inputs={formInputs}
        submitText={t("Public.Login.Labels.Login")}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default LoginView;
