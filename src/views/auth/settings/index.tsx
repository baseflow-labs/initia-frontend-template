import { FormikErrors } from "formik";
import { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AuthApi from "../../../api/auth/index";
import * as MetadataApi from "../../../api/metadata";
import Form from "../../../components/form";
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

  const onBulkDataInsertionSubmit = (values = {}) => {
    MetadataApi.bulkDataInsert(values)
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
        console.log({ res });
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

            <Form
              inputs={() => [
                {
                  type: "file",
                  fileSizeLimit: 5,
                  maxFiles: 1,
                  name: "beneficiariesData",
                  accept: ".xlsx,.xls,.json",
                  labelNote: t(
                    "Auth.Settings.BulkDataInsertion.AllowedFileTypes"
                  ),
                  label: t("Auth.Settings.BulkDataInsertion.BeneficiariesData"),
                  halfCol: true,
                  required: false,
                },
                {
                  type: "file",
                  fileSizeLimit: 5,
                  accept: ".xlsx,.xls,.json",
                  maxFiles: 1,
                  name: "dependentsData",
                  labelNote: t(
                    "Auth.Settings.BulkDataInsertion.AllowedFileTypes"
                  ),
                  label: t("Auth.Settings.BulkDataInsertion.DependentsData"),
                  halfCol: true,
                  required: false,
                },
              ]}
              submitText={t("Global.Form.Labels.Save")}
              onFormSubmit={(values) => {
                onBulkDataInsertionSubmit(values);
              }}
            />
          </Fragment>
        )}

        {user.role === "beneficiary" ? <AccountDelete /> : ""}
      </Fragment>
    </BoxedPage>
  );
};

export default SettingsPage;
