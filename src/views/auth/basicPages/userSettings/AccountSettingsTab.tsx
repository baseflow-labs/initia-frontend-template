import { FormikErrors } from "formik";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as MetadataApi from "../../../../api/metadata";
import Button from "../../../../components/core/button";
import Spinner from "../../../../components/core/spinner";
import Form, { LabelView } from "../../../../components/form";
import DefaultInput from "../../../../components/form/inputs/default";
import { addNotification } from "../../../../store/actions/notifications";
import { setFontSize } from "../../../../store/actions/settings";
import { useAppSelector } from "../../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../../utils/function";
import {
  getCommonSettingInputs,
  metadataSettingInputs,
} from "./inputs";

const AccountSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { fontSize } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.loading);

  const [formMetadata, setFormMetadata] = useState<Record<string, any>>({});

  const isLoading = loading.length > 0;

  useLayoutEffect(() => {
    MetadataApi.get()
      .then((res: any) => setFormMetadata(res.payload))
      .catch(apiCatchGlobalHandler);
  }, []);

  const onMetadataSubmit = (values: Record<string, any> = {}) => {
    const data = Object.keys(values)
      .filter((key) => (values as any)[key])
      .reduce(
        (final, key) => ({ ...final, [key]: (values as any)[key] }),
        {}
      );

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

  const downloadTemplate = async (filename: string) => {
    const url =
      process.env.REACT_APP_STORAGE_DIRECTORY_URL +
      "/samples/dataTemplates/" +
      filename;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Fragment>
      {/* System settings (includes font size) */}
      <div className="card mb-4">
        <div className="card-header border-bottom">
          <h5 className="card-title mb-0">
            {t("Auth.Settings.System.Title")}
          </h5>
        </div>
        <div className="card-body">
          <Form
            inputs={() => getCommonSettingInputs(t)}
            initialValues={{ fontSize }}
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
        </div>
      </div>

      {/* Admin-only metadata & bulk insertion */}
      {user.role === "admin" && (
        <Fragment>
          <div className="card mb-4">
            <div className="card-header border-bottom">
              <h5 className="card-title mb-0">
                {t("Auth.Settings.Metadata.Title")}
              </h5>
            </div>
            <div className="card-body">
              <Form
                inputs={() => metadataSettingInputs(t)}
                initialValues={{
                  fontSize,
                  ...formMetadata,
                }}
                submitText={t("Global.Form.Labels.Save")}
                onFormSubmit={onMetadataSubmit}
              />
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header border-bottom">
              <h5 className="card-title mb-0">
                {t("Auth.Settings.BulkDataInsertion.Title")}
              </h5>
            </div>
            <div className="card-body">
              <div className="text-danger lh-lg mb-3">
                <h5 className="text-justify lh-lg">
                  <span className="fw-bold">
                    {t(
                      "Auth.Settings.BulkDataInsertion.PleaseCheck.Highlight"
                    )}
                  </span>
                </h5>

                <h6 className="text-justify lh-lg">
                  {t(
                    "Auth.Settings.BulkDataInsertion.PleaseCheck.Clarification"
                  )}
                </h6>

                <ul className="lh-lg">
                  <li>
                    {t(
                      "Auth.Settings.BulkDataInsertion.PleaseCheck.Eg1"
                    )}
                  </li>
                  <li>
                    {t(
                      "Auth.Settings.BulkDataInsertion.PleaseCheck.Eg2"
                    )}
                  </li>
                  <li>
                    {t(
                      "Auth.Settings.BulkDataInsertion.PleaseCheck.Eg4"
                    )}
                  </li>
                  <li>
                    {t(
                      "Auth.Settings.BulkDataInsertion.PleaseCheck.Eg3"
                    )}
                  </li>
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
                {isLoading && <Spinner color="danger" />}
              </div>

              {/* Users file */}
              <div className="mb-4">
                <LabelView
                  labelNote={t(
                    "Auth.Settings.BulkDataInsertion.AllowedFileTypes"
                  )}
                  label={t("Auth.Settings.BulkDataInsertion.UsersData")}
                  required
                />

                <div className="mb-3">
                  <Button onClick={() => downloadTemplate("template.xlsx")}>
                    {t(
                      "Auth.Settings.BulkDataInsertion.UsersDataTemplate"
                    )}
                  </Button>
                </div>

                <DefaultInput
                  name="usersFile"
                  type="file"
                  className="form-control"
                  accept=".xlsx,.csv"
                  disabled={isLoading}
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

              {/* Dependents file */}
              <div className="mt-4">
                <LabelView
                  labelNote={t(
                    "Auth.Settings.BulkDataInsertion.AllowedFileTypes"
                  )}
                  label={t(
                    "Auth.Settings.BulkDataInsertion.DependentsData"
                  )}
                  required
                />

                <div className="mb-3">
                  <Button onClick={() => downloadTemplate("template.xlsx")}>
                    {t(
                      "Auth.Settings.BulkDataInsertion.DependentsDataTemplate"
                    )}
                  </Button>
                </div>

                <DefaultInput
                  name="dependentsFile"
                  type="file"
                  className="form-control"
                  disabled={isLoading}
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
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AccountSettingsTab;
