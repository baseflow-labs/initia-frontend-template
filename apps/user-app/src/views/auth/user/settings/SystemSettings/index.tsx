import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Form from "@initia/shared/ui/components/form";

import { addNotification } from "../../../../../store/actions/notifications";
import {
  setFontSize,
  setTheme,
  setLayoutMode,
  setLayoutWidth,
  setColors,
  setTimezone,
  setDateFormat,
  setDefaultLanguage,
} from "../../../../../store/actions/settings";
import { useAppSelector } from "../../../../../store/hooks";

import { getCommonSettingInputs } from "./inputs";

const SystemSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    fontSize,
    theme,
    layoutMode,
    layoutWidth,
    primaryColor,
    secondaryColor,
    timezone,
    dateFormat,
    defaultLanguage,
  } = useAppSelector((state) => state.settings);

  return (
    <Form
      inputs={() => getCommonSettingInputs(t)}
      initialValues={{
        fontSize,
        theme,
        layoutMode,
        layoutWidth,
        primaryColor,
        secondaryColor,
        timezone,
        dateFormat,
        defaultLanguage,
      }}
      submitText={t("Global.Form.Labels.Save")}
      onFormSubmit={(values?: Record<string, unknown>) => {
        dispatch(setFontSize((values?.fontSize as unknown as number) || 0));
        dispatch(setTheme((values?.theme as "light" | "dark") || "light"));
        dispatch(setLayoutMode((values?.layoutMode as "horizontal" | "vertical") || "horizontal"));
        dispatch(setLayoutWidth((values?.layoutWidth as "boxed" | "full-width") || "full-width"));
        dispatch(setColors(values?.primaryColor as string, values?.secondaryColor as string));
        dispatch(setTimezone(values?.timezone as string));
        dispatch(setDateFormat(values?.dateFormat as string));
        dispatch(setDefaultLanguage(values?.defaultLanguage as string));
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Global.Form.Labels.Update"),
              data: t("Auth.Settings.User.System..Title"),
            }),
          })
        );
      }}
    />
  );
};

export default SystemSettingsTab;
