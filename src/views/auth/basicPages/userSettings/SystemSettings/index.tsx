import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import Form from "@/components/form";
import { addNotification } from "@/store/actions/notifications";
import { setFontSize } from "@/store/actions/settings";
import { useAppSelector } from "@/store/hooks";
import { getCommonSettingInputs } from "./inputs";

const SystemSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { fontSize } = useAppSelector((state) => state.settings);

  return (
    <Form
      inputs={() => getCommonSettingInputs(t)}
      initialValues={{ fontSize }}
      submitText={t("Global.Form.Labels.Save")}
      onFormSubmit={(values) => {
        dispatch(setFontSize(values?.fontSize as number));
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
