import { useTranslation } from "react-i18next";

const DemoLoginNote = () => {
  const { t } = useTranslation();

  return process.env.REACT_APP_ENVIRONMENT === "staging" ? (
    <div className="bg-primary w-100 text-white text-center p-2 fw-bold blink my-3 rounded-3">
      {t("Global.Labels.DemoLoginNote")}
    </div>
  ) : (
    <></>
  );
};

export default DemoLoginNote;
