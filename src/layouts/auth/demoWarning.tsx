import { useTranslation } from "react-i18next";

const DemoWarning = () => {
  const { t } = useTranslation();

  return process.env.REACT_APP_ENVIRONMENT === "staging" ? (
    <div className="bg-primary w-100 text-white text-center p-2 fw-bold blink">
      {t("Global.Labels.DemoWarning")}
    </div>
  ) : (
    <></>
  );
};

export default DemoWarning;
