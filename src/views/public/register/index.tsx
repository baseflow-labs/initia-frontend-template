import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { useDispatch } from "react-redux";
import * as authApi from "../../../api/auth";
import BelowInputButton from "../../../components/button/belowInput";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/fucntions";

const RegisterView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ identifier: "" });

  const onRegisterSubmit = (values = { identifier: "" }) => {
    authApi
      .otpSend("+966" + values.identifier)
      .then(() => {
        setData(values);
      })
      .catch(apiCatchGlobalHandler);
  };

  const onOtpSubmit = (values: authApi.registerProps) => {
    authApi
      .register({ ...values, ...data, username: "+966" + data.identifier })
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
        <BelowInputButton
          introText={t("Public.Register.Labels.ByClickYouAccept")}
          buttonText={t("Public.Register.Labels.PrivacyPolicyTermsConditions")}
          action={() => navigate("/terms-conditions")}
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
