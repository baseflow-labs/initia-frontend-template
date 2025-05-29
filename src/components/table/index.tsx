import moment from "moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
import { viewDateFormat } from "../../utils/consts";

export interface TableProps {
  columns: {
    label: string;
    name: string;
    render?: (row: {}) => string | React.ReactNode;
    type?: string;
    options?: { value: string; label?: string }[];
  }[];
  data: {}[];
}

interface Props {
  row: object;
  data: string;
  render?: (row: {}) => string | React.ReactNode;
  type?: string;
  options?: { value: string; label?: string }[];
}

const DynamicTable = ({ columns, data }: TableProps) => {
  const { i18n } = useTranslation();

  const dataRender = ({ row, render, data, type, options }: Props) => {
    switch (type) {
      case "date":
        return moment(data).locale(i18n.language).format(viewDateFormat);
      case "phoneNumber":
        return <span dir="ltr"> {"+966" + data}</span>;
      case "select":
        const option = options?.find(({ value }) => value === data);
        return option?.label || option?.value;
      case "custom":
        return render ? render(row) : data;
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

            {columns.map(({ name, type, options, render }, y) => (
              <td className="py-3" key={y}>
                {dataRender({
                  row,
                  data: (row as any)[name],
                  type,
                  render,
                  options,
                })}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
