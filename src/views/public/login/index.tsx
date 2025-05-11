import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import { useDispatch } from "react-redux";
import { login } from "../../../store/actions/auth";

const LoginView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formInputs = [
    {
      type: "phoneNumber",
      name: "phoneNo",
      label: t("Public.Login.Labels.PhoneNo"),
      prefixText: "+966",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: t("Public.Login.Labels.Password"),
      belowComp: (
        <div className="d-block">
          <Button
            color="ghost"
            route="/forgot-password"
            size="sm"
            onClick={() => navigate("/forgot-password")}
          >
            {t("Public.Login.Labels.DidUForgotPassword")}
          </Button>
        </div>
      ),
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
      <Form
        inputs={formInputs}
        submitText={t("Public.Login.Labels.Login")}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default LoginView;
