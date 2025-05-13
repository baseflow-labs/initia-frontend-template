import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Form from "../../../components/form";

const OtpView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formInputs = [
    {
      type: "otp",
      name: "phoneNo",
      required: true,
    },
  ];

  const onSubmit = (values = {}) => {
    console.log({ values });

    navigate("/reset-password");
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

export default OtpView;
