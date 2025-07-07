import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Button from "../core/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="card p-4 my-4 rounded-4">
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
                  <div className={`bg-${color} p-3 me-4 rounded-4 h4`}>
                    <FontAwesomeIcon icon={icon} className="m-0 p-0" />
                  </div>

                  <div>
                    <h5>
                      {count} {label}
                    </h5>

                    <div className="text-secondary">{"مستفيد"}</div>
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
    </div>
  );
};

export default TasksCard;
