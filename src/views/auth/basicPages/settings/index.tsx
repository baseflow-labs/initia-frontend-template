import { FormikErrors } from "formik";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AuthApi from "../../../../api/auth/index";
import * as MetadataApi from "../../../../api/metadata";
import Button from "../../../../components/core/button";
import Spinner from "../../../../components/core/spinner";
import Form, { LabelView } from "../../../../components/form";
import DefaultInput from "../../../../components/form/inputs/default";
import BoxedPage from "../../../../layouts/auth/pages/boxedPage";
import { addNotification } from "../../../../store/actions/notifications";
import { setFontSize } from "../../../../store/actions/settings";
import { useAppSelector } from "../../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../../utils/function";
import AccountDelete from "./accountDelete";
import DeleteUsers from "./deleteUsers";
import { getCommonSettingInputs, getPasswordResetSettingInputs, metadataSettingInputs } from "./inputs";

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

  const downloadTemplate = async (filename: string) => {
    const url =
      process.env.REACT_APP_STORAGE_DIRECTORY_URL +
      "/samples/dataTemplates/" +
      filename;

    window.open(url, "_blank", "noopener,noreferrer");
  };

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
            <h4 className="text-info my-5">
              {t("Auth.Settings.Metadata.Title")}
            </h4>

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

            <h4 className="text-info my-5">
              {t("Auth.Settings.BulkDataInsertion.Title")}
            </h4>

            <div className="text-danger lh-lg">
              <h5 className="text-justify lh-lg">
                <span className="fw-bold">
                  {t("Auth.Settings.BulkDataInsertion.PleaseCheck.Highlight")}
                </span>
              </h5>

              <h6 className="text-justify lh-lg">
                {t("Auth.Settings.BulkDataInsertion.PleaseCheck.Clarification")}
              </h6>

              <ul className="lh-lg">
                <li>{t("Auth.Settings.BulkDataInsertion.PleaseCheck.Eg1")}</li>

                <li>{t("Auth.Settings.BulkDataInsertion.PleaseCheck.Eg2")}</li>

                <li>{t("Auth.Settings.BulkDataInsertion.PleaseCheck.Eg4")}</li>

                <li>{t("Auth.Settings.BulkDataInsertion.PleaseCheck.Eg3")}</li>
              </ul>

              <h5 className="text-justify lh-lg">
                <span className="fw-bold">
                  {t(
                    "Auth.Settings.BulkDataInsertion.PleaseCheck.WarningTitle"
                  )}
                </span>
              </h5>

              <h6 className="text-justify lh-lg">
                {t(
                  "Auth.Settings.BulkDataInsertion.PleaseCheck.WarningContent"
                )}
              </h6>

              <h5 className="text-justify lh-lg">
                <span className="fw-bold">
                  {t(
                    "Auth.Settings.BulkDataInsertion.PleaseCheck.WarningTitle"
                  )}
                </span>
              </h5>

              <h6 className="text-justify lh-lg">
                {t(
                  "Auth.Settings.BulkDataInsertion.PleaseCheck.DataReviewWarningContent"
                )}
              </h6>
            </div>

            <div className="my-3 text-center">
              {loading.length > 0 && <Spinner color="danger" />}
            </div>

            <div>
              <LabelView
                labelNote={t(
                  "Auth.Settings.BulkDataInsertion.AllowedFileTypes"
                )}
                label={t("Auth.Settings.BulkDataInsertion.UsersData")}
                required
              />

              <div className="mb-3">
                <Button onClick={() => downloadTemplate("template.xlsx")}>
                  {t("Auth.Settings.BulkDataInsertion.UsersDataTemplate")}
                </Button>
              </div>

              <DefaultInput
                name="usersFile"
                type="file"
                className="form-control"
                accept=".xlsx,.csv"
                disabled={loading.length > 0}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    MetadataApi.bulkUsersDataInsert(file)
                      .then(() => {
                        dispatch(
                          addNotification({
                            msg: t("Global.Form.SuccessMsg", {
                              action: t("Global.Form.Labels.Upload"),
                              data: t(
                                "Auth.Settings.BulkDataInsertion.UsersData"
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

              <div className="mb-3">
                <Button onClick={() => downloadTemplate("template.xlsx")}>
                  {t("Auth.Settings.BulkDataInsertion.DependentsDataTemplate")}
                </Button>
              </div>

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

        {user.role === "admin" ? <DeleteUsers /> : <AccountDelete />}
      </Fragment>
    </BoxedPage>
  );
};

export default SettingsPage;
