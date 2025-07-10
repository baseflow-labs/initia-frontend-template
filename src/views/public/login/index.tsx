import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as authApi from "../../../api/auth";
import BelowInputButton from "../../../components/button/belowInput";
import Form from "../../../components/form";
import { login } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";
import Button from "../../../components/core/button";

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

  const demoLogin = [
    // {
    //   label: t("Public.Login.Labels.LoginAsAdmin"),
    //   credentials: {
    //     identifier: "590000000",
    //     password: "12345678",
    //   },
    // },
    // {
    //   label: t("Public.Login.Labels.LoginAsCeo"),
    //   credentials: {
    //     identifier: "540000000",
    //     password: "12345678",
    //   },
    // },
    {
      label: t("Public.Login.Labels.LoginAsHod"),
      credentials: {
        identifier: "580000000",
        password: "12345678",
      },
    },
    {
      label: t("Public.Login.Labels.LoginAsResearcher"),
      credentials: {
        identifier: "570000000",
        password: "12345678",
      },
    },
    {
      label: t("Public.Login.Labels.LoginAsApplicant"),
      credentials: {
        identifier: "560000000",
        password: "12345678",
      },
    },
    {
      label: t("Public.Login.Labels.LoginAsBeneficiary"),
      credentials: {
        identifier: "550000000",
        password: "12345678",
      },
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
          {demoLogin.map(({ label, credentials }, i) => (
            <div className="col-6" key={i}>
              <Button
                className="w-100 h-100"
                onClick={() => onSubmit(credentials)}
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
