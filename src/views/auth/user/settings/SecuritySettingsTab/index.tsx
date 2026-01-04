import { FormikErrors } from "formik";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AuthApi from "@/api/auth";
import Form from "@/components/form";
import { addNotification } from "@/store/actions/notifications";
import { useAppSelector } from "@/store/hooks";
import { apiCatchGlobalHandler } from "@/utils/function";
import AccountDelete from "./AccountDelete";
import { getPasswordResetSettingInputs } from "./inputs";

const SecuritySettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onPasswordResetSubmit = (values?: Record<string, unknown>) => {
    if (import.meta.env.VITE_APP_ENVIRONMENT === "staging") {
      dispatch(
        addNotification({
          type: "err",
          msg: t("Global.Form.Labels.UnAvailableForDemoMode"),
        })
      );
    } else {
      AuthApi.resetMyPassword(values || {})
        .then(() => {
          dispatch(
            addNotification({
              msg: t("Global.Form.SuccessMsg", {
                action: t("Global.Form.Labels.Update"),
                data: t("Auth.Settings.User.Security.Title"),
              }),
            })
          );
        })
        .catch(apiCatchGlobalHandler);
    }
  };

  const validatePasswords = (values: Record<string, unknown>) => {
    const errors: FormikErrors<Record<string, unknown>> = {};
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = t("Global.Form.Errors.PasswordMatch");
    }
    return errors;
  };

  return (
    <Fragment>
      <Form
        inputs={() => getPasswordResetSettingInputs(t)}
        submitText={t("Global.Form.Labels.Save")}
        onFormSubmit={onPasswordResetSubmit}
        customValidate={validatePasswords}
      />

      {user.role !== "admin" && <AccountDelete />}
    </Fragment>
  );
};

export default SecuritySettingsTab;
