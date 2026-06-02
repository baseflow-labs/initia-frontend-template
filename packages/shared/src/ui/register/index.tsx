import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// import { AuthResponse, login } from "../../../../user-app/src/store/actions/auth";
// import { addNotification } from "../../../../user-app/src/store/actions/notifications";
import * as authApi from "../..//api/auth";
import Form from "../..//ui/components/form";
import { apiCatchGlobalHandler } from "../..//utils/function";

import { formInputs } from "./inputs";

const RegisterView = () => {
  const { t } = useTranslation();
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  // const dispatch = useDispatch();

  useEffect(() => {
    authApi
      .getOAuthProvidersConfig()
      .then((res) => {
        setRegistrationEnabled(res.payload?.registrationEnabled ?? true);
      })
      .catch(() => {
        setRegistrationEnabled(true);
      });
  }, []);

  const onSubmit = (values?: Record<string, unknown>) => {
    authApi
      .register(values as unknown as authApi.registerProps)
      .then(() =>
        // res
        {
          // const apiData = res?.payload;
          // const payload = (apiData?.payload || apiData) as AuthResponse;
          // dispatch(
          //   addNotification({
          //     msg: t("Public.Register.Labels.Success", {
          //       name: payload?.user?.name,
          //     }),
          //   })
          // );
          // dispatch(login(payload));
        }
      )
      .catch(apiCatchGlobalHandler);
  };

  return (
    <div>
      {registrationEnabled ? (
        <Form
          inputs={() => formInputs(t)}
          submitText={t("Public.Register.Labels.Register")}
          onFormSubmit={onSubmit}
        />
      ) : (
        <p className="text-muted mb-0">
          {t("Public.Register.Labels.Disabled", "Registration is currently disabled.")}
        </p>
      )}
    </div>
  );
};

export default RegisterView;
