import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faEllipsisVertical,
  faEnvelope,
  faEye,
  faFile,
  faLocationPin,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import i18n from "../../i18next";
import { triggerFilePreview } from "../../layouts/auth/globalModal";
import { addNotification } from "../../store/actions/notifications";
import { viewDateFormat, viewTimeFormat } from "../../utils/consts";
import DropdownComp from "../dropdown";
import TooltipComp from "../tooltip";

export interface actionProps {
  label: string;
  icon: IconProp;
  spread?: boolean;
  disabled?: boolean;
  disabledMsg?: string;
  color?: string;
  onClick: (data: string) => void;
}

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
  fitHeight?: boolean;
  actions?: (id?: string) => actionProps[];
  paginationMeta?: {
    page: number;
    capacity: number;
    count: number;
    pagesCount: number;
  };
}

interface Props {
  row?: object;
  data: string;
  render?: (row: {}) => string | React.ReactNode;
  type?: string;
  timestampFormat?: string;
  options?: { value: string | number; label?: string }[];
  name: string;
}

export const dataRender = ({
  row,
  render,
  data,
  type,
  options,
  timestampFormat,
  name,
}: Props) => {
  if (!data && !render && type !== "file") {
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
      return (
        <span dir="ltr">
          {data && "+966" + data}{" "}
          <a
            href={"https://wa.me/966" + data}
            target="_blank"
            className="h4 align-middle"
          >
            <FontAwesomeIcon
              className="text-success"
              icon={faWhatsapp as IconProp}
            />
          </a>{" "}
          <a href={"tel:966" + data} target="_blank">
            <FontAwesomeIcon className="text-success" icon={faPhone} />
          </a>
        </span>
      );
    case "email":
      return (
        <span dir="ltr">
          <a href={"mailto:" + data} target="_blank">
            <FontAwesomeIcon className="text-success" icon={faEnvelope} />
          </a>{" "}
          {data}
        </span>
      );
    case "select":
    case "radio":
      const option = options?.find(({ value }) => value === data);
      return option?.label || option?.value;
    case "file":
      const files = (row as any)?.files[name]?.map(({ path = "" }) => path);

      return files
        ? files?.map((file = "") => (
            <FontAwesomeIcon
              icon={faFile}
              role="button"
              className="me-1"
              onClick={() => triggerFilePreview(file)}
            />
          ))
        : "-";
    case "location":
      return (
        <a href={data} target="_blank" rel="noreferrer">
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
              className={
                i <= parseInt(data) ? "text-warning" : "text-secondary"
              }
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
  fitHeight,
  paginationMeta,
}: TableProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(size);

  const pageNumber = paginationMeta?.page || 1;
  const pagesCount = paginationMeta?.pagesCount || 1;

  const onPageNumberChange = (i = 0) => {
    onPageChange(i, pageSize);
  };

  const onPageSizeChange = (i = 0) => {
    onPageChange(1, i);
    setPageSize(i);
  };

  return (
    <div
      className="overflow-x-auto mx-auto"
      style={{ maxWidth: "90vw", minHeight: fitHeight ? undefined : "60vh" }}
    >
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

            {data.map((row, i) => (
              <tr className="align-middle" key={i}>
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
                        name,
                      })}
                    </td>
                  )
                )}

                {actions && actions()?.length && (
                  <td className="py-3" scope="row">
                    <div className="d-flex">
                      {actions(row.id)
                        .filter(({ spread }) => spread)
                        .map(
                          (
                            {
                              icon,
                              label,
                              onClick,
                              color,
                              disabled,
                              disabledMsg,
                            },
                            y
                          ) => (
                            <h4 key={y}>
                              <TooltipComp label={label}>
                                <FontAwesomeIcon
                                  icon={icon}
                                  role="button"
                                  className={
                                    "me-1" +
                                    (" text-" +
                                      (disabled
                                        ? "secondary"
                                        : color || "secondary"))
                                  }
                                  onClick={
                                    disabled
                                      ? () => {
                                          dispatch(
                                            addNotification({
                                              type: "err",
                                              msg:
                                                disabledMsg ||
                                                t("Global.Form.CantDoIt"),
                                            })
                                          );
                                        }
                                      : () => onClick(row?.id || "")
                                  }
                                />
                              </TooltipComp>
                            </h4>
                          )
                        )}

                      {actions(row.id).filter(({ spread }) => !spread)
                        .length ? (
                        <DropdownComp
                          start
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
                        ""
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>

          {!noPagination && data.length !== 0 && (
            <tfoot>
              <tr>
                <th
                  colSpan={
                    columns.length + 1 + (actions && actions()?.length ? 1 : 0)
                  }
                >
                  <div className="d-flex justify-content-between">
                    <div className="my-auto text-muted me-3">
                      <small>
                        {t("Global.Labels.Showing")}{" "}
                        {data.length > 0
                          ? `${(pageNumber - 1) * pageSize + 1} – ${Math.min(
                              pageNumber * pageSize,
                              paginationMeta?.count || data.length
                            )}`
                          : 0}{" "}
                        {t("Global.Labels.Of")}{" "}
                        {paginationMeta?.count || data.length}{" "}
                        {t("Global.Labels.Results")}
                      </small>
                    </div>

                    <div className="d-flex my-auto">
                      <nav className="my-auto me-2">
                        <ul className="pagination">
                          <li className="page-item my-auto">
                            <button
                              className={`page-link text-${
                                pageNumber === 1 ? "secondary" : "info"
                              } border-0 px-3`}
                              onClick={() => onPageNumberChange(1)}
                              disabled={pageNumber === 1}
                            >
                              <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                          </li>

                          <li className="page-item my-auto">
                            <button
                              className={`page-link text-${
                                pageNumber === 1 ? "secondary" : "info"
                              } border-0 px-3`}
                              onClick={() => onPageNumberChange(pageNumber - 1)}
                              disabled={pageNumber === 1}
                            >
                              <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                          </li>

                          {Array.from(
                            { length: Math.min(5, pagesCount) },
                            (_, i) => {
                              let pageOffset = Math.max(
                                0,
                                Math.min(pageNumber - 3, pagesCount - 5)
                              );
                              const page = i + 1 + pageOffset;

                              return (
                                <li className="page-item my-auto" key={i}>
                                  <button
                                    className={`page-link border-0 rounded-2 me-1 ${
                                      pageNumber === page
                                        ? "bg-info"
                                        : "border-info text-info"
                                    }`}
                                    onClick={() => onPageNumberChange(page)}
                                  >
                                    {page}
                                  </button>
                                </li>
                              );
                            }
                          )}

                          <li className="page-item my-auto">
                            <button
                              className={`page-link text-${
                                pageNumber === pagesCount ? "secondary" : "info"
                              } border-0 px-3`}
                              onClick={() => onPageNumberChange(pageNumber + 1)}
                              disabled={pageNumber === pagesCount}
                            >
                              <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                          </li>

                          <li className="page-item my-auto">
                            <button
                              className={`page-link text-${
                                pageNumber === pagesCount ? "secondary" : "info"
                              } border-0 px-3`}
                              onClick={() => onPageNumberChange(pagesCount)}
                              disabled={pageNumber === pagesCount}
                            >
                              <FontAwesomeIcon icon={faAnglesLeft} />
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
                                style={{ width: "55px" }}
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
                                style={{ width: "55px" }}
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
                  </div>
                </th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
