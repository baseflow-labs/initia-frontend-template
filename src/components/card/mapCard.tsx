import { useTranslation } from "react-i18next";
import Button from "../core/button";
import MapWithMarkers from "../googleMap";
import DashboardCard from "./dashboardCard";

const MapCard = ({
  locations,
}: {
  locations: { latitude: number; longitude: number }[];
}) => {
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

      <MapWithMarkers
        locations={locations.map(({ latitude, longitude }) => ({
          lat: latitude,
          lng: longitude,
        }))}
      />
    </DashboardCard>
  );
};

export default MapCard;
