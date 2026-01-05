import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as authApi from "@initia/shared/api/auth";
import Form from "@initia/shared/ui/components/form";
import { AuthResponse, login } from "../../../store/actions/auth";
import { addNotification } from "../../../store/actions/notifications";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import { formInputs } from "./inputs";

const RegisterView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = (values?: Record<string, unknown>) => {
    authApi
      .register(values as unknown as authApi.registerProps)
      .then((res) => {
        const apiData = res?.payload;
        const payload = (apiData?.payload || apiData) as AuthResponse;
        dispatch(
          addNotification({
            msg: t("Public.Register.Labels.Success", {
              name: payload?.user?.name,
            }),
          })
        );
        dispatch(login(payload));
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
