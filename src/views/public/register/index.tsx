import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as authApi from "../../../api/auth";
import Form from "../../../components/form";
import { login } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "../../../utils/function";

const RegisterView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formInputs = () => [
    {
      type: "phoneNumber",
      name: "identifier",
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

  const onSubmit = (values: authApi.registerProps) => {
    authApi
      .register(values)
      .then((res: any) => {
        dispatch(
          addNotification({
            msg: t("Public.Register.Labels.Success", {
              name: res.payload.user.name,
            }),
          })
        );
        dispatch(login(res.payload));
      })
      .catch(apiCatchGlobalHandler);
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
