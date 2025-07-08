import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "../core/button";
import DashboardCard from "./dashboardCard";

interface Props {
  label: string;
  tasks: {
    icon: IconProp;
    color: string;
    label: string;
    count: number;
    route: string;
  }[];
}

const TasksCard = ({ label, tasks }: Props) => {
  return (
    <DashboardCard>
      <h3 className="mb-4">{label}</h3>

      <table className="table table-responsive align-middle">
        <tbody>
          {tasks.map(({ icon, color, label, count, route }, i) => (
            <tr
              className={i === tasks.length - 1 ? "border-white" : ""}
              key={i}
            >
              <td>
                <div className="d-flex py-2">
                  <div
                    className={`bg-${color} text-white p-3 me-4 rounded-4 h4`}
                  >
                    <FontAwesomeIcon icon={icon} className="m-0 p-0" />
                  </div>

                  <div className="my-auto">
                    <h5>
                      {count} {label}
                    </h5>
                  </div>
                </div>
              </td>

              <td className="text-end">
                <Button route={route} color="info">
                  التفاصيل
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardCard>
  );
};

export default TasksCard;
