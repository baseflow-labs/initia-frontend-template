import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DashboardCard from "./dashboardCard";
import { commaNumbers } from "../../utils/function";

interface Props {
  statistics: {
    label: string;
    count: number;
    color: string; // "primary" | "success" | "warning" | "danger" | "info";
    icon: IconProp;
    unit?: React.ReactNode | string;
    details?: {
      label: string;
      count: number;
    }[];
  }[];
}

const columnsLgWidth = (count: number) => {
  switch (count) {
    case 1:
      return 12;
    case 2:
      return 6;
    case 3:
      return 4;
    case 4:
      return 3;
    default:
      return 2;
  }
};

const columnsMdWidth = (count: number) => {
  switch (count) {
    case 1:
      return 12;
    default:
      return 6;
  }
};

const StatisticCards = ({ statistics }: Props) => {
  return (
    <div className="row align-items-stretch">
      {statistics.map(({ label, count, icon, color, unit, details }, i) => (
        <div
          className={`col-sm-${columnsMdWidth(
            statistics.length
          )} col-xl-${columnsLgWidth(statistics.length)} d-flex`}
          key={i}
        >
          <DashboardCard>
            <div className="card-body w-100">
              <div className="row">
                <div className="col-lg-9">
                  <h6 className="card-title">{label}</h6>
                </div>

                <div className="col-lg-3 h3 text-end">
                  <span className={`bg-opacity-${color} rounded-4 px-3 py-0`}>
                    <FontAwesomeIcon icon={icon} className={`text-${color}`} />
                  </span>
                </div>
              </div>

              <h1 className="card-title mt-2 mb-4 fw-bold">
                {commaNumbers(String(count))} {unit}
              </h1>

              {details && (
                <p className="card-text d-flex">
                  {details.map(({ label, count }, y) => (
                    <div className="me-1" key={y}>
                      <span className={`text-${color} fw-bold`}>{count}</span>{" "}
                      <span className="text-secondary">{label}</span>
                    </div>
                  ))}
                </p>
              )}
            </div>
          </DashboardCard>
        </div>
      ))}
    </div>
  );
};

export default StatisticCards;
