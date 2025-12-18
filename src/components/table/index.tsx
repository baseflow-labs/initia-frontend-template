import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faColumns,
  faDollar,
  faEdit,
  faEllipsisVertical,
  faEnvelope,
  faEye,
  faFile,
  faFileDownload,
  faGripVertical,
  faLocationPin,
  faPhone,
  faSort,
  faSortDown,
  faSortUp,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { customFilterProps } from "@/api";
import i18n from "@/i18next";
import { triggerFilePreview } from "@/layouts/auth/globalModal";
import { addNotification } from "@/store/actions/notifications";
import { viewDateFormat, viewTimeFormat } from "@/utils/consts";
import { commaNumbers } from "@/utils/function";
import DropdownComp from "../dropdown";
import CustomItemsDropdownComp from "../dropdown/customItems";
import { InputProps } from "../form";
import InputComp from "../form/Input";
import TooltipComp from "../tooltip";
import Button from "../core/button";
import ExportModal from "./exportModal";

export interface actionProps {
  label: string;
  icon: IconProp;
  spread?: boolean;
  disabled?: boolean;
  disabledMsg?: string;
  color?: string;
  onClick: (data: string) => void;
}

export interface SelectOption {
  value: string | number;
  label?: string;
}

export interface TableColumn extends InputProps {
  label: string;
  name: string;
  render?: (row: any) => string | React.ReactNode;
  type?: string;
  timestampFormat?: string;
  options?: SelectOption[];
  moneyUnit?: boolean;
  sortable?: boolean;
}

export interface TableProps {
  size?: number;
  columns: TableColumn[];
  fitHeight?: boolean;
  extraActions?: (id?: string) => actionProps[];
  includeView?: boolean;
  includeUpdate?: boolean;
  includeDelete?: boolean;
  searchProp?: string;
  searchPlaceholder?: string;
}

interface DataRenderProps {
  row?: object;
  data: string;
  render?: (row: {}) => string | React.ReactNode;
  type?: string;
  timestampFormat?: string;
  options?: { value: string | number; label?: string }[];
  name: string;
  hasFile?: boolean;
  money?: boolean;
  withoutWrap?: boolean;
}

export const MoneyUnit = ({ big }: { big?: boolean }) => (
  <FontAwesomeIcon icon={faDollar} height={big ? 25 : 15} className="ms-1" />
);

const withMoneyUnit = (content: React.ReactNode, money?: boolean) => {
  return money ? (
    <>
      {content} <MoneyUnit />
    </>
  ) : (
    <>{content}</>
  );
};

export const dataRender = ({
  row,
  render,
  data,
  type,
  options,
  timestampFormat,
  name,
  hasFile,
  money,
  withoutWrap,
}: DataRenderProps) => {
  const wrap = (content: React.ReactNode) =>
    withoutWrap ? content : withMoneyUnit(content, money);

  if (!data && money) {
    return wrap(0);
  }

  if (!data && !render && type !== "file") {
    return "-";
  }

  if (hasFile) {
    const files = (row as any)[`${name}File`]?.map(({ path = "" }) => path);

    return files
      ? wrap(
          <>
            {files?.map((file = "", idx: number) => (
              <FontAwesomeIcon
                key={file + idx}
                icon={faFile}
                role="button"
                className="me-1"
                onClick={() => triggerFilePreview(file)}
              />
            ))}{" "}
            {(row as any)[name]}
          </>
        )
      : "-";
  }

  switch (type) {
    case "number":
      return wrap(commaNumbers(String(data)));
    case "date":
      return wrap(
        moment(data)
          .locale(i18n.language)
          .format(timestampFormat || viewDateFormat)
      );
    case "time":
      return wrap(
        moment("2025-06-08T" + data)
          .locale(i18n.language)
          .format(timestampFormat || viewTimeFormat)
      );
    case "phoneNumber":
      return (
        <span dir="ltr">
          {data && "+966" + data}{" "}
          <a
            href={"https://wa.me/966" + data}
            target="_blank"
            rel="noreferrer"
            className="h4 align-middle"
          >
            <FontAwesomeIcon
              className="text-dark"
              icon={faWhatsapp as IconProp}
            />
          </a>{" "}
          <a href={"tel:966" + data} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="text-dark" icon={faPhone} />
          </a>
        </span>
      );
    case "email":
      return (
        <span dir="ltr">
          <a href={"mailto:" + data} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="text-dark" icon={faEnvelope} />
          </a>{" "}
          {data}
        </span>
      );
    case "select":
    case "radio": {
      const option = options?.find(({ value }) => value === data);
      return wrap(option?.label || option?.value || data);
    }
    case "file": {
      const files = (row as any)[name]?.map(({ path = "" }) => path);
      return wrap(
        files
          ? files?.map((file = "", idx: number) => (
              <FontAwesomeIcon
                key={file + idx}
                icon={faFile}
                role="button"
                className="me-1"
                onClick={() => triggerFilePreview(file)}
              />
            ))
          : "-"
      );
    }
    case "location":
      return wrap(
        <a href={data} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLocationPin} />
        </a>
      );
    case "image":
      return wrap(
        <FontAwesomeIcon
          icon={faEye}
          role="button"
          onClick={() => triggerFilePreview(data)}
        />
      );
    case "stars": {
      const starsToDisplay = [1, 2, 3, 4, 5];
      return wrap(
        <div className="d-flex">
          {starsToDisplay.map((i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={
                i <= parseInt(data) ? "text-warning" : "text-secondary"
              }
            />
          ))}
        </div>
      );
    }
    case "custom":
      return wrap(render && row ? render(row) : data);
    default:
      return wrap(data);
  }
};

interface Props extends TableProps {
  data: { id: string }[];
  onRowClick: (rowData?: object, action?: string) => void;

  // pagination state from parent
  paginationMeta: {
    page: number;
    capacity: number;
    count: number;
    pagesCount: number;
  };
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;

  // search
  currentSearch?: string;
  onSearchChange?: (value: string) => void;

  // sorting
  sortField?: string;
  sortDirection?: "asc" | "desc" | null;
  onSortChange?: (field: string, direction: "asc" | "desc") => void;

  // filters
  onFiltersChange?: (filters: customFilterProps[]) => void;
}

const DynamicTable: React.FC<Props> = ({
  columns,
  data,
  extraActions,
  fitHeight,
  searchProp,
  searchPlaceholder,
  includeView,
  includeUpdate,
  includeDelete,
  onRowClick,
  paginationMeta,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  currentSearch,
  onSearchChange,
  sortField,
  sortDirection,
  onSortChange,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [columnsToShow, setColumnsToShow] = useState<string[]>(
    columns.filter((c) => !c.defaultHide).map((c) => c.name)
  );
  const [orderedColumns, setOrderedColumns] = useState(columns);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // keep in sync if `columns` prop changes from outside
  useEffect(() => {
    setOrderedColumns(columns.sort((a) => (a.defaultHide ? 1 : -1)));
  }, [columns]);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;

    setOrderedColumns((prev) => {
      const newOrder = [...prev];
      const [moved] = newOrder.splice(dragIndex, 1);
      newOrder.splice(index, 0, moved);
      return newOrder;
    });

    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const defaultActionsIncluded = [
    includeView,
    includeUpdate,
    includeDelete,
  ].filter(Boolean);
  const haveDefaultActions = defaultActionsIncluded.length > 0;

  const SpreadActionView = ({
    onClick,
    label,
    icon,
    disabled,
    disabledMsg,
    color,
    row,
  }: any) => (
    <h4>
      <TooltipComp label={label}>
        <FontAwesomeIcon
          icon={icon}
          role="button"
          className={
            "me-1" +
            (" text-" + (disabled ? "secondary" : color || "secondary"))
          }
          onClick={
            disabled
              ? () => {
                  dispatch(
                    addNotification({
                      type: "err",
                      msg: disabledMsg || t("Global.Form.CantDoIt"),
                    })
                  );
                }
              : () => onClick(row?.id || "")
          }
        />
      </TooltipComp>
    </h4>
  );

  const handleSortClick = (col: TableColumn) => {
    if (!col.sortable || !onSortChange) return;

    const isSameField = sortField === col.name;
    const nextDirection: "asc" | "desc" =
      !isSameField || sortDirection === "desc" ? "asc" : "desc";

    onSortChange(col.name, nextDirection);
  };

  const renderSortIcon = (col: TableColumn) => {
    if (!col.sortable) return null;
    if (sortField !== col.name || !sortDirection) {
      return <FontAwesomeIcon icon={faSort} className="ms-1 text-muted" />;
    }
    return (
      <FontAwesomeIcon
        icon={sortDirection === "asc" ? faSortUp : faSortDown}
        className="ms-1 text-primary"
      />
    );
  };

  const count = paginationMeta?.count || data.length;
  const pagesCount = paginationMeta?.pagesCount || 1;
  const from = count > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const to = Math.min(currentPage * pageSize, count);

  return (
    <div
      className="overflow-x-auto mx-auto"
      style={{ maxWidth: "90vw", minHeight: fitHeight ? undefined : "60vh" }}
    >
      <div className="table-responsive">
        <table className="table mt-4 w-100">
          <thead className="table-light">
            <tr>
              <th colSpan={columnsToShow.length}>
                {searchProp ? (
                  <InputComp
                    name="search"
                    placeholder={
                      searchPlaceholder ??
                      t("Global.Placeholders.Search", { prop: searchProp })
                    }
                    value={currentSearch || ""}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                  />
                ) : (
                  ""
                )}
              </th>

              <th colSpan={haveDefaultActions ? 2 : 1}>
                <div className="d-flex justify-content-end align-items-center">
                  <ExportModal data={data} columns={columns} />

                  <CustomItemsDropdownComp
                    start
                    button={
                      <FontAwesomeIcon
                        icon={faColumns}
                        className="ms-1 text-muted"
                      />
                    }
                    list={orderedColumns.map((col, index) => {
                      const draggable = columnsToShow.includes(col.name);

                      return (
                        <li
                          key={col.name} // use stable key
                          className="dropdown-item d-flex align-items-center"
                          draggable={draggable}
                          onDragStart={() => handleDragStart(index)}
                          onDragEnter={() => handleDragEnter(index)}
                          onDragOver={(e) => e.preventDefault()} // allow drop
                          onDragEnd={handleDragEnd}
                        >
                          {draggable && (
                            <FontAwesomeIcon
                              icon={faGripVertical}
                              role="button"
                              className="me-1"
                            />
                          )}

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={columnsToShow.includes(col.name)}
                              id={`col-toggle-${col.name}`}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setColumnsToShow((prev) => [
                                    ...prev,
                                    col.name,
                                  ]);
                                } else {
                                  setColumnsToShow((prev) =>
                                    prev.filter((c) => c !== col.name)
                                  );
                                }
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`col-toggle-${col.name}`}
                            >
                              {col.label}
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  />
                </div>
              </th>
            </tr>

            <tr>
              <th className="py-3" scope="col">
                #
              </th>

              {orderedColumns
                .filter((c) => columnsToShow.includes(c.name))
                .map((col, i) => (
                  <th
                    className={
                      "py-3 fw-bold" + (col.sortable ? " cursor-pointer" : "")
                    }
                    scope="col"
                    key={i}
                    onClick={() => handleSortClick(col)}
                  >
                    <span className="d-inline-flex align-items-center">
                      {col.label}
                      {renderSortIcon(col)}
                    </span>
                  </th>
                ))}

              {(extraActions && extraActions()?.length) ||
              haveDefaultActions ? (
                <th className="py-3" scope="col">
                  {t("Global.Labels.Action")}
                </th>
              ) : null}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columnsToShow.length + 2}
                  className="text-center py-4"
                >
                  {t("Global.Labels.NoData")}
                </td>
              </tr>
            )}

            {data.map((row, i) => (
              <tr className="align-middle" key={(row as any).id || i}>
                <td className="py-3">{i + pageSize * (currentPage - 1) + 1}</td>

                {orderedColumns
                  .filter((c) => columnsToShow.includes(c.name))
                  .map(
                    (
                      {
                        name,
                        type,
                        options,
                        render,
                        timestampFormat,
                        moneyUnit,
                      },
                      y
                    ) => (
                      <td className="py-3" key={y}>
                        {dataRender({
                          row,
                          data: String((row as any)[name] ?? ""),
                          type,
                          render,
                          options,
                          timestampFormat,
                          name,
                          money: moneyUnit,
                        })}
                      </td>
                    )
                  )}

                {(extraActions && extraActions()?.length) ||
                haveDefaultActions ? (
                  <td className="py-3">
                    <div className="d-flex">
                      {extraActions &&
                        extraActions((row as any).id)
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
                              <SpreadActionView
                                key={y}
                                onClick={onClick}
                                label={label}
                                icon={icon}
                                color={color}
                                disabled={disabled}
                                disabledMsg={disabledMsg}
                                row={row}
                              />
                            )
                          )}

                      {defaultActionsIncluded.includes(true) && (
                        <Fragment>
                          {includeView && (
                            <SpreadActionView
                              onClick={() => onRowClick(row, "view")}
                              label={t("Global.Form.Labels.View")}
                              icon={faEye}
                              color="primary"
                              row={row}
                            />
                          )}

                          {includeUpdate && (
                            <SpreadActionView
                              onClick={() => onRowClick(row, "update")}
                              label={t("Global.Form.Labels.Edit")}
                              icon={faEdit}
                              color="warning"
                              row={row}
                            />
                          )}

                          {includeDelete && (
                            <SpreadActionView
                              onClick={() => onRowClick(row, "delete")}
                              label={t("Global.Form.Labels.Delete")}
                              icon={faTrash}
                              color="danger"
                              row={row}
                            />
                          )}
                        </Fragment>
                      )}

                      {extraActions &&
                      extraActions((row as any).id).filter(
                        ({ spread }) => !spread
                      ).length ? (
                        <DropdownComp
                          start
                          button={
                            <FontAwesomeIcon
                              icon={faEllipsisVertical}
                              className="ms-1"
                            />
                          }
                          list={extraActions((row as any).id)
                            .filter(({ spread }) => !spread)
                            .map(({ icon, label, onClick }) => ({
                              onClick: () => onClick((row as any).id || ""),
                              label: (
                                <Fragment>
                                  <FontAwesomeIcon
                                    icon={icon}
                                    className="text-primary"
                                  />{" "}
                                  {label}
                                </Fragment>
                              ),
                            }))}
                        />
                      ) : null}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>

          {data.length !== 0 && (
            <tfoot>
              <tr>
                <th
                  colSpan={columnsToShow.length + (haveDefaultActions ? 2 : 1)}
                >
                  <div className="d-flex justify-content-between">
                    <div className="my-auto text-muted me-3">
                      <small>
                        {t("Global.Labels.Showing")} {from} – {to}{" "}
                        {t("Global.Labels.Of")} {count}{" "}
                        {t("Global.Labels.Results")}
                      </small>
                    </div>

                    <div className="d-flex my-auto">
                      <nav className="my-auto me-2">
                        <ul className="pagination">
                          <li className="page-item my-auto">
                            <button
                              className={`page-link text-${
                                currentPage === 1 ? "secondary" : "primary"
                              } border-0 px-3`}
                              onClick={() => onPageChange(1)}
                              disabled={currentPage === 1}
                            >
                              <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                          </li>

                          <li className="page-item my-auto">
                            <button
                              className={`page-link text-${
                                currentPage === 1 ? "secondary" : "primary"
                              } border-0 px-3`}
                              onClick={() => onPageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                            >
                              <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                          </li>

                          {Array.from(
                            {
                              length: Math.min(5, pagesCount || 0),
                            },
                            (_, i) => {
                              const offset = Math.max(
                                0,
                                Math.min(currentPage - 3, pagesCount - 5)
                              );
                              const page = i + 1 + offset;

                              return (
                                <li className="page-item my-auto" key={i}>
                                  <button
                                    className={`page-link border-0 rounded-2 me-1 ${
                                      currentPage === page
                                        ? "bg-primary text-white"
                                        : "border-primary text-primary"
                                    }`}
                                    onClick={() => onPageChange(page)}
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
                                currentPage === pagesCount
                                  ? "secondary"
                                  : "primary"
                              } border-0 px-3`}
                              onClick={() => onPageChange(currentPage + 1)}
                              disabled={currentPage === pagesCount}
                            >
                              <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                          </li>

                          <li className="page-item my-auto">
                            <button
                              className={`page-link text-${
                                currentPage === pagesCount
                                  ? "secondary"
                                  : "primary"
                              } border-0 px-3`}
                              onClick={() => onPageChange(pagesCount)}
                              disabled={currentPage === pagesCount}
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
                              <small className="my-auto text-primary">
                                {t("Global.Labels.PageNo")}
                              </small>

                              <input
                                value={currentPage}
                                className="form-control ms-1"
                                style={{ width: "55px" }}
                                type="number"
                                min={1}
                                max={pagesCount}
                                onChange={(e) =>
                                  onPageChange(
                                    Math.min(
                                      pagesCount,
                                      Math.max(1, parseInt(e.target.value) || 1)
                                    )
                                  )
                                }
                              />
                            </span>
                          </li>

                          <li className="page-item my-auto">
                            <span className="page-link border-0 d-flex">
                              <small className="my-auto text-primary">
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
