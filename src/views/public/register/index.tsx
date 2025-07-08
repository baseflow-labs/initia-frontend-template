import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import * as authApi from "../../../api/auth";
import BelowInputButton from "../../../components/button/belowInput";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const RegisterView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ username: "" });

  const onRegisterSubmit = (values = { username: "" }) => {
    authApi
      .otpSend(values.username)
      .then(() => {
        setData(values);
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Public.ForgotPassword.SendOtp.SendOtp"),
              data: "966" + values.username,
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  const onOtpSubmit = (values: authApi.registerProps) => {
    authApi
      .register({ ...values, ...data })
      .then((res: any) => {
        dispatch(addNotification({ msg: t("Public.Register.Labels.Success") }));
        navigate("/");
      })
      .catch(apiCatchGlobalHandler);
  };

  const registerInputs = () => [
    {
      type: "text",
      name: "name",
      label: t("Public.Register.Labels.Name"),
      required: true,
    },
    {
      type: "phoneNumber",
      name: "username",
      label: t("Public.Register.Labels.PhoneNo"),
      required: true,
    },
    {
      type: "password",
      name: "password",
      minLength: 8,
      label: t("Public.Register.Labels.Password"),
      required: true,
    },
    {
      type: "password",
      name: "passwordConfirmation",
      label: t("Public.Register.Labels.PasswordConfirmation"),
      required: true,
      belowComp: (
        <BelowInputButton
          introText={t("Public.Register.Labels.ByClickYouAccept")}
          buttonText={t("Public.Register.Labels.PrivacyPolicyTermsConditions")}
          route="/terms-conditions"
        />
      ),
    },
  ];

  const otpInputs = () => [
    {
      type: "otp",
      name: "code",
      required: true,
      belowComp: (
        <BelowInputButton
          introText={t("Public.Register.Labels.DidNotGetOtp")}
          buttonText={t("Public.Register.Labels.ResendOtp")}
          action={() => onRegisterSubmit(data)}
        />
      ),
    },
  ];

  return (
    <div>
      {data.username ? (
        <Fragment>
          <h4>{t("Public.Otp.Title")}</h4>

          <div className="text-center mt-2">
            <small>{t("Public.Otp.CheckSms")}</small>
          </div>

          <Form
            inputs={otpInputs}
            submitText={t("Public.ForgotPassword.SendOtp.ConfirmOTP")}
            onFormSubmit={onOtpSubmit}
          />
        </Fragment>
      ) : (
        <Form
          inputs={registerInputs}
          submitText={t("Public.Register.Labels.Register")}
          onFormSubmit={onRegisterSubmit}
        />
      )}
    </div>
  );
};

export default RegisterView;
