import { useTranslation } from "react-i18next";

const DashboardView = () => {
  const { t } = useTranslation();

  return (
    <div className="text-success">
      <h1>{t("Auth.Dashboard.Welcome")}</h1>
    </div>
  );
};

export default DashboardView;
