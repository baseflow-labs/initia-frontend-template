import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import Button from "../../../components/core/button";
import Form from "../../../components/form";

const ForgotPasswordView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formInputs = () => [
    {
      type: "phoneNumber",
      name: "phoneNo",
      label: t("Public.Login.Labels.PhoneNo"),
      belowComp: (
        <div className="d-block">
          <Button color="ghost" route="/" size="sm">
            {t("Public.ForgotPassword.SendOtp.RememberPassword")}
          </Button>
        </div>
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
