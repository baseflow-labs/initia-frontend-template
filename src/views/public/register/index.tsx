import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as authApi from "@/api/auth";
import Form from "@/components/form";
import { login } from "@/store/actions/auth";
import { addNotification } from "@/store/actions/notifications";
import { apiCatchGlobalHandler } from "@/utils/function";
import { formInputs } from "./inputs";

const RegisterView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
        inputs={() => formInputs(t)}
        submitText={t("Public.Register.Labels.Register")}
        onFormSubmit={onSubmit}
      />
    </div>
  );
};

export default RegisterView;
