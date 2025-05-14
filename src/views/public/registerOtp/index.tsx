import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import Form from "../../../components/form";
import { login } from "../../../store/actions/auth";

const RegistrationOtpView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formInputs = () => [
    {
      type: "otp",
      name: "phoneNo",
      required: true,
    },
  ];

  const onSubmit = (values = {}) => {
    console.log({ values });

    dispatch(
      login({
        jwt: "thisIsFakeToken",
        refreshToken: "thisIsFakeRefreshToken",
        user: {
          id: "1",
          name: "Suhaib Ahmad",
          email: "SuhaibAhmadAi@hotmail.com",
        },
      })
    );

    navigate("/");
  };

  return (
    <div>
      <h4>رمز التحقق OTP</h4>

      <div className="text-center mt-2 mb-5">
        <small>تحقق من رسائل هاتفك وادخل رقم التحقق (OTP)</small>
      </div>

      <Form
        inputs={formInputs}
        onFormSubmit={onSubmit}
        submitText={t("Public.ForgotPassword.SendOtp.ConfirmOTP")}
      />
    </div>
  );
};

export default RegistrationOtpView;
