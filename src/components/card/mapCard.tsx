import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "../core/button";
import MapWithMarkers from "../googleMap";
import DashboardCard from "./dashboardCard";

export interface LocationProps {
  location: {
    latitude: number;
    longitude: number;
  };
  name: string;
  phoneNumber: string;
  date: string;
  time: string;
}

const MapCard = ({ locations }: { locations: LocationProps[] }) => {
  const { t } = useTranslation();
  const [period, setPeriod] = useState("Today");

  const periods = [
    {
      label: t("Global.Labels.Today"),
      key: "Today",
    },
    {
      label: t("Global.Labels.ThisWeek"),
      key: "ThisWeek",
    },
    {
      label: t("Global.Labels.All"),
      key: "All",
    },
  ];

  const filteredLocations = locations.filter((loc) => {
    const locDate = new Date(loc.date);

    if (period === "Today") {
      const now = new Date();
      return (
        locDate.getFullYear() === now.getFullYear() &&
        locDate.getMonth() === now.getMonth() &&
        locDate.getDate() === now.getDate()
      );
    }

    if (period === "ThisWeek") {
      const now = new Date();
      const startOfWeek = new Date(now);
      const endOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      startOfWeek.setHours(0, 0, 0, 0);
      endOfWeek.setHours(23, 59, 59, 999);

      return locDate >= startOfWeek && locDate <= endOfWeek;
    }

    return true;
  });

  return (
    <DashboardCard>
      <div className="row mb-4">
        <div className="col-6">
          <h3>{t("Auth.Dashboard.VisitsMap")}</h3>
        </div>

        <div className="col-6 text-end">
          {periods.map(({ label, key }, i) => (
            <Button
              outline={period !== key}
              className="me-1"
              onClick={() => setPeriod(key)}
              key={i}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {filteredLocations.length > 0 ? (
        <MapWithMarkers locations={filteredLocations} />
      ) : (
        <h2 className="text-center mt-5">{t("Auth.Dashboard.NoVisits")}</h2>
      )}
    </DashboardCard>
  );
};

export default MapCard;
