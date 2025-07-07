import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { columnsWidth } from "../../utils/function";

interface Props {
  statistics: {
    label: string;
    count: number;
    color: string; // "primary" | "success" | "warning" | "danger" | "info";
    icon: IconProp;
    details: {
      label: string;
      count: number;
    }[];
  }[];
}

const StatisticCards = ({ statistics }: Props) => {
  return (
    <div className="row">
      {statistics.map(({ label, count, icon, color, details }, i) => (
        <div className={`col-md-${columnsWidth(statistics.length)}`} key={i}>
          <div className="card rounded-4 p-3">
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <h6 className="card-title">{label}</h6>
                  <h1 className="card-title my-3 fw-bold">{count}</h1>
                </div>

                <div className="col-6 h2 text-end">
                  <span className={`bg-opacity-${color} rounded-4 px-3 py-0`}>
                    <FontAwesomeIcon icon={icon} className={`text-${color}`} />
                  </span>
                </div>
              </div>

              <p className="card-text d-flex">
                {details.map(({ label, count }, y) => (
                  <div className="me-1" key={y}>
                    <span className={`text-${color} fw-bold`}>{count}</span>{" "}
                    <span className="text-secondary">{label}</span>
                  </div>
                ))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticCards;
