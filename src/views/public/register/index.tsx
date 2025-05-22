import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import * as authApi from "../../../api/auth";
import Form from "../../../components/form";

const RegisterView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState({ identifier: "" });

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
    },
  ];

  const otpInputs = () => [
    {
      type: "otp",
      name: "code",
      required: true,
    },
  ];

  const onRegisterSubmit = (values = { identifier: "" }) => {
    authApi.otpSend("+966" + values.identifier).then(() => {
      setData(values);
    });
  };

  const onOtpSubmit = (values: authApi.registerProps) => {
    authApi
      .register({ ...values, ...data, username: "+966" + data.identifier })
      .then((res: any) => {
        navigate("/");
      });
  };

  return (
    <div>
      {data.identifier ? (
        <Fragment>
          <h4>رمز التحقق OTP</h4>

          <div className="text-center mt-2 mb-5">
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
