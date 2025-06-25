import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsisVertical,
  faEye,
  faFile,
  faLocationPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import i18n from "../../i18next";
import { triggerFilePreview } from "../../layouts/auth/globalModal";
import { viewDateFormat, viewTimeFormat } from "../../utils/consts";
import { splitOverNumberPlusLeftover } from "../../utils/function";
import DropdownComp from "../dropdown";

export interface TableProps {
  size?: number;
  columns: {
    label: string;
    name: string;
    render?: (row: any) => string | React.ReactNode;
    type?: string;
    timestampFormat?: string;
    options?: { value: string; label?: string }[];
  }[];
  data: { id?: string }[];
  onPageChange: (page: number, size: number) => void;
  noPagination?: boolean;
  actions?: (id?: string) => {
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
          onClick={() => triggerFilePreview(data)}
        />
      );
    case "location":
      return (
        <a href={data} target="_blank">
          <FontAwesomeIcon icon={faLocationPin} />
        </a>
      );
    case "image":
      return (
        <FontAwesomeIcon
          icon={faEye}
          role="button"
          onClick={() => triggerFilePreview(data)}
        />
      );
    case "stars":
      const starsToDisplay = [1, 2, 3, 4, 5];

      return (
        <div className="d-flex">
          {starsToDisplay.map((i) => (
            <FontAwesomeIcon
              icon={faStar}
              className={i <= parseInt(data) ? "text-warning" : ""}
            />
          ))}
        </div>
      );

    case "custom":
      return render && row ? render(row) : data;
    default:
      return data;
  }
};

const DynamicTable = ({
  columns,
  data,
  onPageChange,
  actions,
  size = 10,
  noPagination,
}: TableProps) => {
  const { t } = useTranslation();

  const [pageSize, setPageSize] = useState(size);

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
    <div className="table-responsive">
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

            {actions && actions()?.length && (
              <th className="py-3" scope="col">
                {t("Global.Labels.Action")}
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length + 2} className="text-center py-4">
                {t("Global.Labels.NoData")}
              </td>
            </tr>
          )}

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

                {actions && actions()?.length && (
                  <td className="py-3 d-flex" scope="row">
                    {actions(row.id)
                      .filter(({ spread }) => spread)
                      .map(({ icon, label, onClick }, y) => (
                        <FontAwesomeIcon
                          icon={icon}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-custom-class="custom-tooltip"
                          data-bs-title={label}
                          role="button"
                          className="me-1"
                          onClick={() => onClick(row?.id || "")}
                          key={y}
                        />
                      ))}

                    {actions(row.id).filter(({ spread }) => !spread).length ? (
                      <DropdownComp
                        button={
                          <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            className="ms-1"
                          />
                        }
                        list={actions(row.id)
                          .filter(({ spread }) => !spread)
                          .map(({ icon, label, onClick }) => ({
                            onClick: () => onClick(row.id || ""),
                            label: (
                              <Fragment>
                                {" "}
                                <FontAwesomeIcon
                                  icon={icon}
                                  className="text-info"
                                />{" "}
                                {label}
                              </Fragment>
                            ),
                          }))}
                      />
                    ) : (
                      <span className="text-white">-</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
        </tbody>

        {!noPagination && (
          <tfoot>
            <tr>
              <th
                colSpan={
                  columns.length + 1 + (actions && actions()?.length ? 1 : 0)
                }
              >
                <div className="d-flex">
                  <nav className="my-auto me-2">
                    <ul className="pagination">
                      <li className="page-item my-auto">
                        <button
                          className="page-link text-info border-0 px-3"
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
                              className={`page-link border-0 bg-info ${
                                pageNumber === i + 1 ? "active rounded-2" : ""
                              }`}
                              onClick={() => onPageNumberChange(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}

                      <li className="page-item my-auto">
                        <button
                          className="page-link text-info border-0 px-3"
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
                          <small className="my-auto text-info">
                            {t("Global.Labels.PageNo")}
                          </small>

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
                          <small className="my-auto text-info">
                            {t("Global.Labels.PageSize")}
                          </small>

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
        )}
      </table>
    </div>
  );
};

export default DynamicTable;
