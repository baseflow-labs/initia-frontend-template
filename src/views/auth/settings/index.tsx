import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import * as MetadataApi from "../../../api/metadata";
import Form from "../../../components/form";
import { addNotification } from "../../../store/actions/notifications";
import { setFontSize, setMetadata } from "../../../store/actions/settings";
import { useAppSelector } from "../../../store/hooks";
import { apiCatchGlobalHandler } from "../../../utils/function";

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

  const staffInputs = () => [
    {
      type: "range",
      name: "fontSize",
      min: 10,
      max: 25,
      label: t("Auth.Settings.FontSize"),
      defaultValue: 15,
    },
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
    {
      type: "selectMany",
      name: "provinces",
      options: [{ value: "" }],
      label: t("Auth.Settings.SocietyProvinces"),
    },
    {
      type: "selectMany",
      name: "governorate",
      options: [{ value: "" }],
      label: t("Auth.Settings.SocietyGovernorate"),
    },
    {
      type: "selectMany",
      name: "cities",
      options: [{ value: "" }],
      label: t("Auth.Settings.SocietyCities"),
    },
    {
      type: "selectMany",
      name: "districts",
      options: [{ value: "" }],
      label: t("Auth.Settings.SocietyDistricts"),
    },
    {
      type: "phoneNumber",
      name: "phoneNumber",
      label: t("Auth.Settings.SocietyPhoneNumber"),
    },
    {
      type: "location",
      name: "location",
      label: t("Auth.Settings.SocietyLocation"),
    },
    {
      type: "text",
      name: "address",
      label: t("Auth.Settings.SocietyAddress"),
    },
    {
      type: "url",
      name: "website",
      label: t("Auth.Settings.SocietyWebsite"),
    },
  ];

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 p-5">
      <h3 className="mb-5">{t("Auth.Settings.Title")}</h3>

      <Form
        inputs={user.role === "beneficiary" ? beneficiaryInputs : staffInputs}
        initialValues={{
          fontSize: fontSize,
          ...metadata,
        }}
        submitText={t("Global.Form.Labels.Save")}
        onFormSubmit={(values) => {
          onMetadataSubmit(values);
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
  );
};

export default SettingsPage;
