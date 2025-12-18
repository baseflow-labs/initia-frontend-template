import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as authApi from "@/api/auth";
import BelowInputButton from "@/components/button/belowInput";
import Form from "@/components/form";
import { addNotification } from "@/store/actions/notifications";
import { apiCatchGlobalHandler } from "@/utils/function";
import { forgotInputs, resetInputs } from "./inputs";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ identifier: "", code: "" });

  const onForgotSubmit = (values = { identifier: "" }) => {
    authApi
      .requestPasswordReset(values.identifier)
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Public.ForgotPassword.SendOtp.SendOtp"),
              data: "966" + values.identifier,
            }),
          })
        );
        setData({ ...values, code: "" });
      })
      .catch(apiCatchGlobalHandler);
  };

  const onOtpSubmit = (values: { code: "" }) => {
    setData((current) => ({ ...current, ...values }));
  };

  const otpInputs = () => [
    {
      type: "otp",
      name: "code",
      required: true,
      fullWidth: true,
      belowComp: (
        <BelowInputButton
          introText={t("Public.Register.Labels.DidNotGetOtp")}
          buttonText={t("Public.Register.Labels.ResendOtp")}
          action={() => onForgotSubmit(data)}
        />
      ),
    },
  ];

  const onResetSubmit = (
    values = { password: "", passwordConfirmation: "" }
  ) => {
    authApi
      .resetPassword({ ...values, ...data })
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Public.ForgotPassword.ResetPassword.ResetPassword"),
              data: "+966" + data.identifier,
            }),
          })
        );
        navigate("/");
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <div>
      {data.code ? (
        <Form
          inputs={() => resetInputs(t)}
          submitText={t("Public.ForgotPassword.ResetPassword.ResetPassword")}
          onFormSubmit={onResetSubmit}
        />
      ) : data.identifier ? (
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
        <Form inputs={() => forgotInputs(t)} onFormSubmit={onForgotSubmit} />
      )}
    </div>
  );
};

export default ForgotPassword;
