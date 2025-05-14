import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Form from "../../../components/form";

const RegisterView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const formInputs = [
    {
      type: "text",
      name: "name",
      label: t("Public.Register.Labels.Name"),
      required: true,
    },
    {
      type: "phoneNumber",
      name: "phoneNo",
      label: t("Public.Register.Labels.PhoneNo"),
      required: true,
    },
    {
      type: "password",
      name: "password",
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

  const onSubmit = (values = {}) => {
    console.log({ values });

    navigate("/register/otp");
  };

  return (
    <div>
      <Form
        inputs={formInputs}
        submitText={t("Public.Register.Labels.Register")}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default RegisterView;
