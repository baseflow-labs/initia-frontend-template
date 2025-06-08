import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faFile,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import i18n from "../../i18next";
import { useTranslation } from "react-i18next";
import { viewDateFormat, viewTimeFormat } from "../../utils/consts";
import "moment/locale/ar";
import { splitOverNumberPlusLeftover } from "../../utils/function";

export interface TableProps {
  columns: {
    label: string;
    name: string;
    render?: (row: {}) => string | React.ReactNode;
    type?: string;
    timestampFormat?: string;
    options?: { value: string; label?: string }[];
  }[];
  data: { id?: string }[];
  onPageChange: (page: number, size: number) => void;
  actions?: {
    label: string;
    icon: IconProp;
    spread?: boolean;
    onClick: (data: string) => void;
  }[];
}

interface Props {
  row?: object;
  data: string;
  render?: (row: {}) => string | React.ReactNode;
  type?: string;
  timestampFormat?: string;
  options?: { value: string | number; label?: string }[];
}

export const dataRender = ({
  row,
  render,
  data,
  type,
  options,
  timestampFormat,
}: Props) => {
  if (!data) {
    return "-";
  }

  switch (type) {
    case "date":
      return moment(data)
        .locale(i18n.language)
        .format(timestampFormat || viewDateFormat);
    case "time":
      return moment("2025-06-08T" + data)
        .locale(i18n.language)
        .format(timestampFormat || viewTimeFormat);
    case "phoneNumber":
      return <span dir="ltr"> {data && "+966" + data}</span>;
    case "select":
    case "radio":
      const option = options?.find(({ value }) => value === data);
      return option?.label || option?.value;
    case "file":
      return (
        <FontAwesomeIcon
          icon={faFile}
          role="button"
          onClick={() => console.log({ data })}
        />
      );
    case "location":
      return (
        <FontAwesomeIcon
          icon={faLocationPin}
          role="button"
          onClick={() => console.log({ data })}
        />
      );
    case "custom":
      return render && row ? render(row) : data;
    default:
      return data;
  }
};

const DynamicTable = ({ columns, data, onPageChange, actions }: TableProps) => {
  const { t } = useTranslation();

  const [pageSize, setPageSize] = useState(10);

  const calculatePageCount = () =>
    splitOverNumberPlusLeftover(data.length, pageSize);

  const [pagesCount, setPagesCount] = useState(calculatePageCount());
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setPagesCount(calculatePageCount());
  }, [data]);

  const onPageNumberChange = (i = 0) => {
    onPageChange(i, pageSize);
    setPageNumber(i);
  };

  const onPageSizeChange = (i = 0) => {
    onPageChange(1, i);
    setPageNumber(1);
    setPageSize(i);
  };

  return (
    <table className="table mt-4 w-100">
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

          {actions?.length && (
            <th className="py-3" scope="col">
              {t("Global.Labels.Action")}
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {data
          .filter(
            (_, i) =>
              i >= pageSize * (pageNumber - 1) && i < pageSize * pageNumber
          )
          .map((row, i) => (
            <tr key={i}>
              <td className="py-3" scope="row">
                {i + pageSize * (pageNumber - 1) + 1}
              </td>

              {columns.map(
                ({ name, type, options, render, timestampFormat }, y) => (
                  <td className="py-3" key={y}>
                    {dataRender({
                      row,
                      data: (row as any)[name],
                      type,
                      render,
                      options,
                      timestampFormat,
                    })}
                  </td>
                )
              )}

              {actions?.length && (
                <td className="py-3 d-flex" scope="row">
                  {actions
                    .filter(({ spread }) => spread)
                    .map(({ icon, label, onClick }, y) => (
                      <FontAwesomeIcon
                        icon={icon}
                        // data-bs-toggle="tooltip"
                        // data-bs-placement="top"
                        // data-bs-custom-class="custom-tooltip"
                        // data-bs-title={label}
                        role="button"
                        onClick={() => onClick(row?.id || "")}
                        key={y}
                      />
                    ))}

                  <div className="dropdown ms-3">
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />

                    <ul className="dropdown-menu">
                      {actions
                        .filter(({ spread }) => !spread)
                        .map(({ icon, label, onClick }, y) => (
                          <li key={y}>
                            <button
                              className="dropdown-item"
                              onClick={() => onClick(row.id || "")}
                            >
                              <FontAwesomeIcon
                                icon={icon}
                                className="text-info"
                              />{" "}
                              {label}
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </td>
              )}
            </tr>
          ))}
      </tbody>

      <tfoot>
        <tr>
          <th colSpan={columns.length + 1}>
            <div className="d-flex">
              <nav className="my-auto me-2">
                <ul className="pagination">
                  <li className="page-item my-auto">
                    <button
                      className="page-link"
                      onClick={() => onPageNumberChange(pageNumber - 1)}
                      disabled={pageNumber === 1}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </li>

                  {Array(pagesCount)
                    .fill("")
                    .map((_, i) => (
                      <li className="page-item my-auto" key={i}>
                        <button
                          className={`page-link ${
                            pageNumber === i + 1 ? "active" : ""
                          }`}
                          onClick={() => onPageNumberChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                  <li className="page-item my-auto">
                    <button
                      className="page-link"
                      onClick={() => onPageNumberChange(pageNumber + 1)}
                      disabled={pageNumber === pagesCount}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  </li>
                </ul>
              </nav>

              <nav className="my-auto">
                <ul className="pagination">
                  <li className="page-item my-auto">
                    <span className="page-link border-0 d-flex">
                      <div className="my-auto">الصفحة رقم</div>

                      <input
                        value={pageNumber}
                        className="form-control ms-1"
                        style={{ width: "50px" }}
                        type="number"
                        min={1}
                        max={pagesCount}
                        onChange={(e) =>
                          onPageNumberChange(parseInt(e.target.value))
                        }
                      />
                    </span>
                  </li>

                  <li className="page-item my-auto">
                    <span className="page-link border-0 d-flex">
                      <div className="my-auto">حجم الصفحة</div>

                      <select
                        value={pageSize}
                        className="form-control ms-1"
                        onChange={(e) =>
                          onPageSizeChange(parseInt(e.target.value))
                        }
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
};

export default DynamicTable;
