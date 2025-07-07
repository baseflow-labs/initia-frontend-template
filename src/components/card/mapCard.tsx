import { Fragment } from "react/jsx-runtime";
import Button from "../core/button";
import MapWithMarkers from "../googleMap";
import DashboardCard from "./dashboardCard";

const locations = [
  { lat: 29.3759, lng: 47.9774 },
  { lat: 24.7136, lng: 46.6753 },
];

const MapCard = () => {
  return (
    <DashboardCard>
      <div className="row mb-4">
        <div className="col-6">
          <h3>خريطة الزيارات</h3>
        </div>

        <div className="col-6 text-end">
          <Button outline className="me-1">
            هذا اليوم
          </Button>
          <Button outline>هذا الأسبوع</Button>
        </div>
      </div>

      <MapWithMarkers locations={locations} />
    </DashboardCard>
  );
};

export default MapCard;
