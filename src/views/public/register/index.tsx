import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import * as authApi from "../../../api/auth";
import Form from "../../../components/form";
import Button from "../../../components/core/button";

const RegisterView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState({ identifier: "" });

  const onRegisterSubmit = (values = { identifier: "" }) => {
    authApi
      .otpSend("+966" + values.identifier)
      .then(() => {
        setData(values);
      })
      .catch((err) => console.log({ err }));
  };

  const onOtpSubmit = (values: authApi.registerProps) => {
    authApi
      .register({ ...values, ...data, username: "+966" + data.identifier })
      .then((res: any) => {
        navigate("/");
      })
      .catch((err) => console.log({ err }));
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
      name: "identifier",
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
        <div className="pb-0 mb-0 mt-3">
          <small className="pt-2">
            {t("Public.Register.Labels.ByClickYouAccept")}{" "}
            <span
              role="button"
              onClick={() => navigate("/terms-conditions")}
              className="text-decoration-underline text-info"
            >
              {t("Public.Register.Labels.PrivacyPolicyTermsConditions")}
            </span>
          </small>
        </div>
      ),
    },
  ];

  const otpInputs = () => [
    {
      type: "otp",
      name: "code",
      required: true,
      belowComp: (
        <div className="d-block">
          <small className="pt-2">
            {t("Public.Register.Labels.DidNotGetOtp")}{" "}
            <span
              role="button"
              onClick={() => onRegisterSubmit(data)}
              className="text-decoration-underline text-info"
            >
              {t("Public.Register.Labels.ResendOtp")}
            </span>
          </small>
        </div>
      ),
    },
  ];

  return (
    <div>
      {data.identifier ? (
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
