import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Form from "../../../components/form";
import { setFontSize } from "../../../store/actions/settings";
import { useAppSelector } from "../../../store/hooks";

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fontSize } = useAppSelector((state) => state.settings);

  const inputs = () => [
    {
      type: "range",
      name: "fontSize",
      min: 10,
      max: 25,
      label: t("Auth.Settings.FontSize"),
      defaultValue: 15,
    },
  ];

  return (
    <div className="border border-3 border-dark rounded-5 mx-auto w-50 p-5">
      <h3 className="mb-5">{t("Auth.Settings.Title")}</h3>

      <Form
        inputs={inputs}
        initialValues={{
          fontSize: fontSize,
        }}
        submitText={t("Global.Form.Labels.SaveData")}
        onFormSubmit={(values) => dispatch(setFontSize(values.fontSize))}
      />
    </div>
  );
};

export default SettingsPage;
