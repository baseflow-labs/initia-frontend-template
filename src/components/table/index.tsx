import moment from "moment";
import { viewDateFormat } from "../../utils/consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";

export interface TableProps {
  columns: {
    label: string;
    name: string;
    type?: string;
    options?: { value: string; label?: string }[];
  }[];
  data: {}[];
}

interface Props {
  data: string;
  type?: string;
  options?: { value: string; label?: string }[];
}

const DynamicTable = ({ columns, data }: TableProps) => {
  const { i18n } = useTranslation();

  const statusColorRender = (status = "") => {
    switch (status) {
      case "Reject":
      case "Rejected":
        return "danger";
      case "Accept":
      case "Accepted":
        return "success";
      default:
        return "primary";
    }
  };

  const dataRender = ({ data, type, options }: Props) => {
    switch (type) {
      case "date":
        return moment(data).locale(i18n.language).format(viewDateFormat);
      case "phoneNumber":
        return <span dir="ltr"> {"+966" + data}</span>;
      case "select":
        const option = options?.find(({ value }) => value === data);
        return option?.label || option?.value;
      case "status":
        return (
          <span>
            {" "}
            <FontAwesomeIcon
              icon={faCircle}
              className={`text-${statusColorRender(data)}`}
            />{" "}
            {data}
          </span>
        );
      default:
        return data;
    }
  };

  return (
    <table className="table mt-4">
      <thead className="table-light">
        <tr>
          <th className="py-3" scope="col">
            #
          </th>
          {columns.map(({ label }, i) => (
            <th className="py-3 fw-bold" scope="col" key={i}>
              {label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td className="py-3" scope="row">
              {i + 1}
            </td>

            {columns.map(({ name, type, options }, y) => (
              <td className="py-3" key={y}>
                {dataRender({ data: (row as any)[name], type, options })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
