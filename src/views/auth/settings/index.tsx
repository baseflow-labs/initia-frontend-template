import { FormikErrors } from "formik";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AuthApi from "../../../api/auth/index";
import * as MetadataApi from "../../../api/metadata";
import Form, { LabelView } from "../../../components/form";
import DefaultInput from "../../../components/form/inputs/default";
import BoxedPage from "../../../layouts/auth/pages/boxedPage";
import { addNotification } from "../../../store/actions/notifications";
import { setFontSize } from "../../../store/actions/settings";
import { useAppSelector } from "../../../store/hooks";
import {
  getCommonSettingInputs,
  getPasswordResetSettingInputs,
  metadataSettingInputs,
} from "../../../utils/formInputs/settings";
import { apiCatchGlobalHandler } from "../../../utils/function";
import AccountDelete from "./accountDelete";

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fontSize } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.loading);
  const [formMetadata, setFormMetadata] = useState({});

  const onMetadataSubmit = (values = {}) => {
    const data = Object.keys(values)
      .filter((key) => (values as any)[key])
      .reduce((final, key) => ({ ...final, [key]: (values as any)[key] }), {});

    MetadataApi.update(data)
      .then(() => {
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Global.Form.Labels.Update"),
              data: t("Auth.Settings.Title"),
            }),
          })
        );

        window.location.reload();
      })
      .catch(apiCatchGlobalHandler);
  };

  const onPasswordResetSubmit = (values = {}) => {
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

  useLayoutEffect(() => {
    MetadataApi.get()
      .then((res: any) => {
        setFormMetadata(res.payload);
      })
      .catch(apiCatchGlobalHandler);
  }, []);

  return (
    <BoxedPage title={t("Auth.Settings.Title")}>
      <Fragment>
        <h5 className="text-info my-5">{t("Auth.Settings.System.Title")}</h5>

        <Form
          inputs={() => getCommonSettingInputs(t)}
          initialValues={{
            fontSize: fontSize,
          }}
          submitText={t("Global.Form.Labels.Save")}
          onFormSubmit={(values) => {
            dispatch(setFontSize(values.fontSize));
            dispatch(
              addNotification({
                msg: t("Global.Form.SuccessMsg", {
                  action: t("Global.Form.Labels.Update"),
                  data: t("Auth.Settings.Title"),
                }),
              })
            );
          }}
        />

        <h5 className="text-info my-5">
          {t("Auth.Settings.PasswordReset.Title")}
        </h5>

        <Form
          inputs={() => getPasswordResetSettingInputs(t)}
          submitText={t("Global.Form.Labels.Save")}
          onFormSubmit={(values) => {
            onPasswordResetSubmit(values);
          }}
          customValidate={validatePasswords}
        />

        {user.role === "admin" && (
          <Fragment>
            <h5 className="text-info my-5">
              {t("Auth.Settings.Metadata.Title")}
            </h5>

            <Form
              inputs={() => metadataSettingInputs(t)}
              initialValues={{
                fontSize: fontSize,
                ...formMetadata,
              }}
              submitText={t("Global.Form.Labels.Save")}
              onFormSubmit={(values) => {
                onMetadataSubmit(values);
              }}
            />

            <h5 className="text-info my-5">
              {t("Auth.Settings.BulkDataInsertion.Title")}
            </h5>

            <div>
              <LabelView
                labelNote={t(
                  "Auth.Settings.BulkDataInsertion.AllowedFileTypes"
                )}
                label={t("Auth.Settings.BulkDataInsertion.BeneficiariesData")}
                required
              />

              <DefaultInput
                name="beneficiariesFile"
                type="file"
                className="form-control"
                accept=".xlsx,.csv"
                disabled={loading.length > 0}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    MetadataApi.bulkBeneficiariesDataInsert(file)
                      .then(() => {
                        dispatch(
                          addNotification({
                            msg: t("Global.Form.SuccessMsg", {
                              action: t("Global.Form.Labels.Upload"),
                              data: t(
                                "Auth.Settings.BulkDataInsertion.BeneficiariesData"
                              ),
                            }),
                          })
                        );
                      })
                      .catch(apiCatchGlobalHandler);
                }}
              />
            </div>

            <div className="mt-5">
              <LabelView
                labelNote={t(
                  "Auth.Settings.BulkDataInsertion.AllowedFileTypes"
                )}
                label={t("Auth.Settings.BulkDataInsertion.DependentsData")}
                required
              />

              <DefaultInput
                name="dependentsFile"
                type="file"
                className="form-control"
                disabled={loading.length > 0}
                accept=".xlsx,.csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    MetadataApi.bulkDependentsDataInsert(file)
                      .then(() => {
                        dispatch(
                          addNotification({
                            msg: t("Global.Form.SuccessMsg", {
                              action: t("Global.Form.Labels.Upload"),
                              data: t(
                                "Auth.Settings.BulkDataInsertion.DependentsData"
                              ),
                            }),
                          })
                        );
                      })
                      .catch(apiCatchGlobalHandler);
                }}
              />
            </div>
          </Fragment>
        )}

        {user.role === "beneficiary" ? <AccountDelete /> : ""}
      </Fragment>
    </BoxedPage>
  );
};

export default SettingsPage;
