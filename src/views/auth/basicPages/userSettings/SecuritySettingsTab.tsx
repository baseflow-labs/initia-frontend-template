import { FormikErrors } from "formik";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AuthApi from "../../../../api/auth";
import Form from "../../../../components/form";
import { addNotification } from "../../../../store/actions/notifications";
import { useAppSelector } from "../../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../../utils/function";
import { getPasswordResetSettingInputs } from "./inputs";
import AccountDelete from "./accountDelete";

const SecuritySettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onPasswordResetSubmit = (values: Record<string, any> = {}) => {
    process.env.REACT_APP_ENVIRONMENT === "staging"
      ? dispatch(
          addNotification({
            type: "err",
            msg: t("Global.Form.Labels.UnAvailableForDemoMode"),
          })
        )
      : AuthApi.resetMyPassword(values)
          .then(() => {
            dispatch(
              addNotification({
                msg: t("Global.Form.SuccessMsg", {
                  action: t("Global.Form.Labels.Update"),
                  data: t("Auth.Settings.Title"),
                }),
              })
            );
          })
          .catch(apiCatchGlobalHandler);
  };

  const validatePasswords = (values: Record<string, any>) => {
    const errors: FormikErrors<Record<string, any>> = {};
    if (values.password !== values.passwordConfirmation) {
      errors.passwordConfirmation = t("Global.Form.Errors.PasswordMatch");
    }
    return errors;
  };

  return (
    <Fragment>
      <div className="card mb-4">
        <div className="card-header border-bottom">
          <h5 className="card-title mb-0">
            {t("Auth.Settings.PasswordReset.Title")}
          </h5>
        </div>
        <div className="card-body">
          <Form
            inputs={() => getPasswordResetSettingInputs(t)}
            submitText={t("Global.Form.Labels.Save")}
            onFormSubmit={onPasswordResetSubmit}
            customValidate={validatePasswords}
          />
        </div>
      </div>

      {user.role !== "admin" && (
        <div className="card">
          <div className="card-header border-bottom">
            <h5 className="card-title mb-0 text-danger">
              {t("Auth.Settings.DeleteAccount.Title", {
                defaultValue: "Delete Account",
              })}
            </h5>
          </div>
          <div className="card-body">
            <AccountDelete />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SecuritySettingsTab;
