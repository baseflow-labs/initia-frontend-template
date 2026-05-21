import { FormikErrors } from "formik";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as AuthApi from "@initia/shared/api/auth";
import Form from "@initia/shared/ui/components/form";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";

import { addNotification } from "../../../../../store/actions/notifications";
import { useAppSelector } from "../../../../../store/hooks";

import AccountDelete from "./AccountDelete";
import { getPasswordResetSettingInputs } from "./inputs";

const SecuritySettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    passwordMinLength,
    passwordRequireUppercase,
    passwordRequireLowercase,
    passwordRequireNumber,
    passwordRequireSpecialChar,
  } = useAppSelector((state) => state.settings);

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
    const password = String(values.password || "");
    if (password.length < passwordMinLength)
      errors.password = `Password must be at least ${passwordMinLength} characters`;
    if (passwordRequireUppercase && !/[A-Z]/.test(password))
      errors.password = "Password must include an uppercase letter";
    if (passwordRequireLowercase && !/[a-z]/.test(password))
      errors.password = "Password must include a lowercase letter";
    if (passwordRequireNumber && !/[0-9]/.test(password))
      errors.password = "Password must include a number";
    if (passwordRequireSpecialChar && !/[^A-Za-z0-9]/.test(password))
      errors.password = "Password must include a special character";
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
