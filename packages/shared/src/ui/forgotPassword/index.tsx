import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as authApi from "@initia/shared/api/auth";
import BelowInputButton from "@initia/shared/ui/components/button/belowInput";
import Form from "@initia/shared/ui/components/form";
import { addNotification } from "../../../../user-app/src/store/actions/notifications";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import { forgotInputs, resetInputs } from "./inputs";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ identifier: "", code: "" });

  const onForgotSubmit = (values?: Record<string, unknown>) => {
    const identifier = (values?.identifier as string) || "";
    authApi
      .requestPasswordReset(identifier)
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Public.ForgotPassword.SendOtp.SendOtp"),
              data: "966" + identifier,
            }),
          })
        );
        setData({ identifier, code: "" });
      })
      .catch(apiCatchGlobalHandler);
  };

  const onOtpSubmit = (values?: Record<string, unknown>) => {
    setData((current) => ({ ...current, code: (values?.code as string) || "" }));
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

  const onResetSubmit = (values?: Record<string, unknown>) => {
    const password = (values?.password as string) || "";
    const passwordConfirmation = (values?.passwordConfirmation as string) || "";
    authApi
      .resetPassword({ password, passwordConfirmation, ...data })
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
