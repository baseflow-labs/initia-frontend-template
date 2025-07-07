import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as authApi from "../../../api/auth";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ identifier: "", code: "" });

  const onForgotSubmit = (values = { identifier: "" }) => {
    authApi
      .requestPasswordReset(values.identifier)
      .then(() => {
        setData({ ...values, code: "" });
      })
      .catch(apiCatchGlobalHandler);
  };

  const onOtpSubmit = (values: { code: "" }) => {
    setData((current) => ({ ...current, ...values }));
  };

  const forgotInputs = () => [
    {
      type: "phoneNumber",
      name: "identifier",
      label: t("Public.Register.Labels.PhoneNo"),
      required: true,
    },
  ];

  const otpInputs = () => [
    {
      type: "otp",
      name: "code",
      required: true,
    },
  ];

  const resetInputs = () => [
    {
      type: "password",
      name: "password",
      label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
      required: true,
    },
    {
      type: "password",
      name: "passwordConfirmation",
      label: t("Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"),
      required: true,
    },
  ];

  const onResetSubmit = (
    values = { password: "", passwordConfirmation: "" }
  ) => {
    authApi
      .resetPassword({ ...values, ...data })
      .then((res) => {
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
          inputs={resetInputs}
          submitText={t("Public.ForgotPassword.ResetPassword.ResetPassword")}
          onFormSubmit={onResetSubmit}
        />
      ) : data.identifier ? (
        <Fragment>
          <h4>رمز التحقق OTP</h4>

          <div className="text-center mt-2">
            <small>تحقق من رسائل هاتفك وادخل رقم التحقق (OTP)</small>
          </div>

          <Form
            inputs={otpInputs}
            submitText={t("Public.ForgotPassword.SendOtp.ConfirmOTP")}
            onFormSubmit={onOtpSubmit}
          />
        </Fragment>
      ) : (
        <Form inputs={forgotInputs} onFormSubmit={onForgotSubmit} />
      )}
    </div>
  );
};

export default ForgotPassword;
