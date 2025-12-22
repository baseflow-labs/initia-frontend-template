import { commaNumbers } from "@/utils/function";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Activity from "../activity";
import DashboardCard from "./dashboardCard";
import { Fragment } from "react/jsx-runtime";

interface Props {
  statistics: {
    label: string;
    count: number;
    color: string; // "primary" | "dark" | "warning" | "danger" | "info";
    icon: IconProp;
    unit?: React.ReactNode | string;
    details?: {
      label: string;
      count: number;
      unit?: React.ReactNode | string;
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
          <DashboardCard className="bg-white">
            <Fragment>
              <div className="row">
                <div className="col-lg-9">
                  <h5 className="card-title">{label}</h5>
                </div>

                <div className="col-lg-3 text-end">
                  <span className={`bg-${color} rounded-2 px-3 py-2`}>
                    <FontAwesomeIcon icon={icon} className="text-white" />
                  </span>
                </div>
              </div>

              <h2 className="card-title my-3 fw-bold">{commaNumbers(String(count))}</h2>

              <Activity condition={!!unit}>
                <p className="mb-2">{unit}</p>
              </Activity>

              <Activity condition={(details && details?.length > 0) || false}>
                <p className="card-text d-flex">
                  {details?.map(({ label, count, unit }, y) => (
                    <div className="me-1" key={y}>
                      <span className={`text-${color} fw-bold`}>
                        {count} {unit}
                      </span>{" "}
                      <span className="text-secondary">{label}</span>
                    </div>
                  ))}
                </p>
              </Activity>
            </Fragment>
          </DashboardCard>
        </div>
      ))}
    </div>
  );
};

export default StatisticCards;
