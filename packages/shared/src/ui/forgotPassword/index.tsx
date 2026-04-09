// import { addNotification } from "../../user-app/src/store/actions/notifications";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

import * as authApi from "../../api/auth";
import Form from "../../ui/components/form";
import { apiCatchGlobalHandler } from "../../utils/function";

import { forgotInputs, resetInputs } from "./inputs";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", token: searchParams.get("token") || "" });

  const onForgotSubmit = (values?: Record<string, unknown>) => {
    const email = (values?.email as string) || "";
    authApi
      .requestPasswordReset(email)
      .then(() => {
        setData({ email, token: "" });
      })
      .catch(apiCatchGlobalHandler);
  };

  const onResetSubmit = (values?: Record<string, unknown>) => {
    const newPassword = (values?.newPassword as string) || "";
    const newPasswordConfirmation = (values?.newPasswordConfirmation as string) || "";

    if (newPassword !== newPasswordConfirmation) {
      apiCatchGlobalHandler(new Error("Passwords do not match"));
      return;
    }

    authApi
      .resetPassword({ email: data.email, newPassword, token: data.token })
      .then(() => {
        navigate("/");
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <div>
      {data.token ? (
        <Form
          inputs={() => resetInputs(t)}
          submitText={t("Public.ForgotPassword.ResetPassword.ResetPassword")}
          onFormSubmit={onResetSubmit}
        />
      ) : data.email ? (
        <Fragment>
          <h4>{t("Public.Otp.Title")}</h4>
          <div className="text-center mt-2">
            <small>{t("Public.Otp.CheckSms")}</small>
          </div>
          <p className="text-center mt-2">Check your email for a password reset link with token.</p>
        </Fragment>
      ) : (
        <Form inputs={() => forgotInputs(t)} onFormSubmit={onForgotSubmit} />
      )}
    </div>
  );
};

export default ForgotPassword;
