import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Form from "../../../components/form";
import BelowInputButton from "../../../components/button/belowInput";

const ForgotPasswordView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formInputs = () => [
    {
      type: "phoneNumber",
      name: "phoneNo",
      label: t("Public.Login.Labels.PhoneNo"),
      belowComp: (
        <BelowInputButton
          introText={t("Public.ForgotPassword.SendOtp.RememberPassword")}
          buttonText={t("Public.Login.Labels.Login")}
          action={() => navigate("/")}
        />
      ),
      required: true,
    },
  ];

  const onSubmit = (values = {}) => {
    console.log({ values });

    navigate("/otp");
  };

  return (
    <div>
      <Form
        inputs={formInputs}
        onFormSubmit={onSubmit}
        submitText={t("Public.ForgotPassword.SendOtp.SendOtp")}
      />
    </div>
  );
};

export default ForgotPasswordView;
