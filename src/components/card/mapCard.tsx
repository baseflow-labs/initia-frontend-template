import { useTranslation } from "react-i18next";
import Button from "../core/button";
import MapWithMarkers from "../googleMap";
import DashboardCard from "./dashboardCard";

export interface LocationProps {
  latitude: number;
  longitude: number;
  name: string;
  phoneNumber: string;
}

const MapCard = ({ locations }: { locations: LocationProps[] }) => {
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

      {locations.length > 0 ? (
        <MapWithMarkers locations={locations} />
      ) : (
        <h2 className="text-center mt-5">{t("Auth.Dashboard.NoVisits")}</h2>
      )}
    </DashboardCard>
  );
};

export default MapCard;
