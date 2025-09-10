import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as authApi from "../../../api/auth";
import BelowInputButton from "../../../components/button/belowInput";
import Button from "../../../components/core/button";
import Form from "../../../components/form";
import { login } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const LoginView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formInputs = () => [
    {
      type: "phoneNumber",
      name: "identifier",
      label: t("Public.Login.Labels.PhoneNo"),
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: t("Public.Login.Labels.Password"),
      belowComp: (
        <BelowInputButton
          introText=""
          buttonText={t("Public.Login.Labels.DidUForgotPassword")}
          route="/forgot-password"
        />
      ),
      required: true,
    },
  ];

  const onSubmit = (values: authApi.loginCredentials) => {
    authApi
      .login(values)
      .then((res: any) => {
        dispatch(
          addNotification({
            msg: t("Public.Login.Labels.Success", {
              name: res.payload.user.name,
            }),
          })
        );
        dispatch(login(res.payload));
      })
      .catch(apiCatchGlobalHandler);
  };

  const onDummySubmit = (values: { type: string }) => {
    authApi
      .dummyLogin(values)
      .then((res: any) => {
        dispatch(
          addNotification({
            msg: t("Public.Login.Labels.Success", {
              name: res.payload.user.name,
            }),
          })
        );
        dispatch(login(res.payload));
      })
      .catch(apiCatchGlobalHandler);
  };

  const demoLogin = [
    {
      label: t("Public.Login.Labels.LoginAsAdmin"),
      type: "admin",
    },
    {
      label: t("Public.Login.Labels.LoginAsCeo"),
      type: "ceo",
    },
    {
      label: t("Public.Login.Labels.LoginAsAccountant"),
      type: "accountant",
    },
    {
      label: t("Public.Login.Labels.LoginAsHod"),
      type: "hod",
    },
    {
      label: t("Public.Login.Labels.LoginAsResearcher"),
      type: "researcher",
    },
    {
      label: t("Public.Login.Labels.LoginAsBeneficiary"),
      type: "beneficiary",
    },
    {
      label: t("Public.Login.Labels.LoginAsApplicant"),
      type: "applicant",
    },
  ];

  return (
    <div>
      <Form
        inputs={formInputs}
        submitText={t("Public.Login.Labels.Login")}
        onFormSubmit={onSubmit}
      />

      {process.env.REACT_APP_ENVIRONMENT === "staging" ? (
        <div className="row g-2 mt-3">
          {demoLogin.map(({ label, type }, i) => (
            <div className="col-6" key={i}>
              <Button
                className="w-100 h-100"
                onClick={() => onDummySubmit({ type })}
              >
                {label}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginView;
