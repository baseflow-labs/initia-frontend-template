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

  const inputs = () => [
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
      type: "phoneNumber",
      name: "phoneNumber",
      label: t("Auth.Settings.SocietyPhoneNumber"),
    },
  ];

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 p-5">
      <h3 className="mb-5">{t("Auth.Settings.Title")}</h3>

      <Form
        inputs={inputs}
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
