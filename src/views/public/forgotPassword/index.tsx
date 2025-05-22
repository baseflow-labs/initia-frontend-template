import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

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
        <div className="d-block mt-3 mb-0 pb-0">
          {t("Public.ForgotPassword.SendOtp.RememberPassword")}{" "}
          <small
            role="button"
            onClick={() => navigate("/")}
            className="text-decoration-underline text-info"
          >
            {t("Public.Login.Labels.Login")}
          </small>
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
