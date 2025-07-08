import { useTranslation } from "react-i18next";
import Button from "../core/button";
import MapWithMarkers from "../googleMap";
import DashboardCard from "./dashboardCard";

const locations = [
  { lat: 29.3759, lng: 47.9774 },
  { lat: 24.7136, lng: 46.6753 },
];

const MapCard = () => {
  const { t } = useTranslation();

  return (
    <DashboardCard>
      <div className="row mb-4">
        <div className="col-6">
          <h3>{t("Auth.Dashboard.VisitsMap")}</h3>
        </div>

        <div className="col-6 text-end">
          <Button outline className="me-1">
            {t("Global.Labels.Today")}
          </Button>
          <Button outline>{t("Global.Labels.ThisWeek")}</Button>
        </div>
      </div>

      <MapWithMarkers locations={locations} />
    </DashboardCard>
  );
};

export default MapCard;
