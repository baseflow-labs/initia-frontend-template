import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/hooks";

const DashboardView = () => {
  const { t } = useTranslation();
  const { name } = useAppSelector((state) => state.settings);

  return (
    <div className="text-info text-center">
      <h1 className="display-1">{t("Auth.Dashboard.Welcome")}</h1>

      <h4 className="display-4 mt-5">{name}</h4>
    </div>
  );
};

export default DashboardView;
