import { useTranslation } from "react-i18next";

const DemoWarning = () => {
  const { t } = useTranslation();

  return process.env.REACT_APP_DEMO_STATUS === "true" ? (
    <div className="bg-info w-100 text-white text-center py-2 fw-bold blink">
      {t("Global.Labels.DemoWarning")}
    </div>
  ) : (
    <></>
  );
};

export default DemoWarning;
