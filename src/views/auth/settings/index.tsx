import { FormikProps } from "formik";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as AuthApi from "../../../api/auth/index";
import * as MetadataApi from "../../../api/metadata";
import Form from "../../../components/form";
import BoxedPage from "../../../layouts/auth/pages/boxedPage";
import { addNotification } from "../../../store/actions/notifications";
import { setFontSize, setMetadata } from "../../../store/actions/settings";
import { useAppSelector } from "../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../utils/function";
import AccountDelete from "./accountDelete";

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fontSize, ...metadata } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);

  const onMetadataSubmit = (values = {}) => {
    const data = Object.keys(values)
      .filter((key) => (values as any)[key])
      .reduce((final, key) => ({ ...final, [key]: (values as any)[key] }), {});

    MetadataApi.update(data)
      .then(() => {
        dispatch(setMetadata(data as any));

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
    AuthApi.resetMyPassword(values)
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

  const beneficiaryInputs = () => [
    {
      type: "range",
      name: "fontSize",
      min: 10,
      max: 25,
      label: t("Auth.Settings.FontSize"),
      defaultValue: 15,
    },
  ];

  const staffInputs = (formik: FormikProps<Record<string, any>>) => {
    const final = [
      {
        type: "text",
        name: "name",
        label: t("Auth.Settings.SocietyName"),
      },
      {
        type: "file",
        name: "logo",
        label: t("Auth.Settings.SocietyLogo"),
      },
      // {
      //   type: "selectMany",
      //   name: "provinces",
      //   options: [{ value: "All", label: t("Auth.Settings.AllProvinces") }, ... getProvinces(t)],
      //   label: t("Auth.Settings.SocietyProvinces"),
      // },
    ];

    // const allProvinces = formik?.values.provinces?.includes("All");
    // const allGovernorate = formik?.values.governorate?.includes("All");
    // const allCities = formik?.values.cities?.includes("All");

    // if (!allProvinces) {
    //   final.push({
    //     type: "selectMany",
    //     name: "governorate",
    //     options: [{ value: "All", label: t("Auth.Settings.AllGovernorate") }],
    //     label: t("Auth.Settings.SocietyGovernorate"),
    //   });
    // }

    // if (!allProvinces && !allGovernorate) {
    //   final.push({
    //     type: "selectMany",
    //     name: "cities",
    //     options: [{ value: "All", label: t("Auth.Settings.AllCities") }],
    //     label: t("Auth.Settings.SocietyCities"),
    //   });
    // }

    // if (!allProvinces && !allGovernorate && !allCities) {
    //   final.push({
    //     type: "selectMany",
    //     name: "districts",
    //     options: [{ value: "All", label: t("Auth.Settings.AllDistricts") }],
    //     label: t("Auth.Settings.SocietyDistricts"),
    //   });
    // }

    final.push({
      type: "phoneNumber",
      name: "phoneNumber",
      label: t("Auth.Settings.SocietyPhoneNumber"),
    });

    // final.push({
    //   type: "location",
    //   name: "location",
    //   label: t("Auth.Settings.SocietyLocation"),
    // });

    // final.push({
    //   type: "text",
    //   name: "address",
    //   label: t("Auth.Settings.SocietyAddress"),
    // });

    // final.push({
    //   type: "url",
    //   name: "website",
    //   label: t("Auth.Settings.SocietyWebsite"),
    // });

    return final;
  };

  return (
    <BoxedPage title={t("Auth.Settings.Title")}>
      <Fragment>
        <h5 className="text-info my-5">{t("Auth.Settings.System.Title")}</h5>

        <Form
          inputs={beneficiaryInputs}
          initialValues={{
            fontSize: fontSize,
            ...metadata,
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
          inputs={() => [
            {
              type: "password",
              name: "password",
              label: t("Public.ForgotPassword.ResetPassword.NewPassword"),
              required: true,
            },
            {
              type: "password",
              name: "passwordConfirmation",
              label: t(
                "Public.ForgotPassword.ResetPassword.NewPasswordConfirmation"
              ),
              required: true,
            },
          ]}
          submitText={t("Global.Form.Labels.Save")}
          onFormSubmit={(values) => {
            onPasswordResetSubmit(values);
          }}
        />

        {user.role !== "beneficiary" && user.role !== "researcher" && (
          <Fragment>
            <h5 className="text-info my-5">
              {t("Auth.Settings.Metadata.Title")}
            </h5>

            <Form
              inputs={staffInputs}
              initialValues={{
                fontSize: fontSize,
                ...metadata,
              }}
              submitText={t("Global.Form.Labels.Save")}
              onFormSubmit={(values) => {
                onMetadataSubmit(values);
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
