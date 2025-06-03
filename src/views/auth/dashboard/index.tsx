import { useTranslation } from "react-i18next";

const DashboardView = () => {
  const { t } = useTranslation();

  return (
    <div className="text-info text-center">
      <h1 className="display-1">{t("Auth.Dashboard.Welcome")}</h1>
    </div>
  );
};

export default DashboardView;
