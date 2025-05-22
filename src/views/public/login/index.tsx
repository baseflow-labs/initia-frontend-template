import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as authApi from "../../../api/auth";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import { login } from "../../../store/actions/auth";
import BelowInputButton from "../../../components/button/belowInput";
import { addNotification } from "../../../store/actions/notifications";

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
        <BelowInputButton
          introText=""
          buttonText={t("Public.Login.Labels.DidUForgotPassword")}
          action={() => navigate("/forgot-password")}
        />
      ),
      required: true,
    },
  ];

  const onSubmit = (values: authApi.loginCredentials) => {
    authApi
      .login({ ...values, identifier: "+966" + values.identifier })
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
      .catch((err) => console.log({ err }));
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
