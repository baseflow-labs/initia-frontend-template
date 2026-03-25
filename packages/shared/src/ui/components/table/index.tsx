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
  faFilter,
  faList,
  faGripVertical,
  faChevronDown,
  faChevronUp,
  faLocationPin,
  faPhone,
  faSort,
  faSortDown,
  faSortUp,
  faStar,
  faTable,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { customFilterProps } from "../../../api";
import { viewDateFormat, viewTimeFormat } from "../../../utils/consts";
import { commaNumbers } from "../../../utils/function";
import { triggerFilePreview } from "../../layouts/auth/globalModal";
import DropdownComp from "../dropdown";
import CustomItemsDropdownComp from "../dropdown/customItems";
import { InputProps } from "../form";
import InputComp from "../form/Input";
import TooltipComp from "../tooltip";

// import Button from "../core/button";
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
  render?: (row: Row) => string | React.ReactNode;
  type?: string;
  timestampFormat?: string;
  options?: SelectOption[];
  moneyUnit?: boolean;
  sortable?: boolean;
  defaultFilterValue?: string | number | boolean;
  defaultFilterOperator?: string;
  defaultFilterDataType?: string;
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

export type Row = Record<string, string | number | boolean> & { id?: string };

interface DataRenderProps {
  row?: Row;
  data: string;
  render?: (row: Row) => string | React.ReactNode;
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

export const DataRender = ({
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
  const { i18n } = useTranslation();
  const wrap = (content: React.ReactNode) =>
    withoutWrap ? content : withMoneyUnit(content, money);

  if (!data && money) {
    return wrap(0);
  }

  if (!data && !render && type !== "file") {
    return "-";
  }

  if (hasFile) {
    const fileField = row ? row[`${name}File`] : undefined;
    const files = Array.isArray(fileField)
      ? (fileField as Array<{ path?: string }>).map(({ path = "" }) => path)
      : undefined;

    return files
      ? wrap(
          <>
            {files.map((file = "", idx: number) => (
              <FontAwesomeIcon
                key={file + idx}
                icon={faFile}
                role="button"
                className="me-1"
                onClick={() => triggerFilePreview(file)}
              />
            ))}{" "}
            {String(row?.[name] ?? "")}
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
            <FontAwesomeIcon className="text-dark" icon={faWhatsapp as IconProp} />
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
      const fileField = row ? row[name] : undefined;
      const files = Array.isArray(fileField)
        ? (fileField as Array<{ path?: string }>).map(({ path = "" }) => path)
        : undefined;
      return wrap(
        files
          ? files.map((file = "", idx: number) => (
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
        <FontAwesomeIcon icon={faEye} role="button" onClick={() => triggerFilePreview(data)} />
      );
    case "avatar":
      return wrap(
        <img
          src={data}
          alt={name}
          style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
        />
      );
    case "badge":
      return wrap(<span className="badge bg-primary">{data}</span>);
    case "progress": {
      const value = Math.max(0, Math.min(100, Number(data) || 0));
      return wrap(
        <div className="progress" style={{ height: "8px", minWidth: "120px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${value}%` }}
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      );
    }
    case "stars": {
      const starsToDisplay = [1, 2, 3, 4, 5];
      return wrap(
        <div className="d-flex">
          {starsToDisplay.map((i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={i <= parseInt(data) ? "text-warning" : "text-secondary"}
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
  data: Row[];
  onRowClick: (rowData?: Row, action?: string) => void;

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
  searchField?: string;
  onSearchFieldChange?: (value: string) => void;

  // sorting
  sortField?: string;
  sortDirection?: "asc" | "desc" | null;
  onSortChange?: (field: string, direction: "asc" | "desc") => void;

  // filters
  currentFilters?: customFilterProps[];
  onFiltersChange?: (filters: customFilterProps[]) => void;
  selectedRowIds?: string[];
  onSelectedRowIdsChange?: (ids: string[]) => void;
  tableStorageKey?: string;
  exportOptions?: {
    endpoint: string;
    search?: string;
    searchField?: string;
    filters?: customFilterProps[];
    sortField?: string;
    sortDirection?: "asc" | "desc" | null;
  };
  detailsPanelRender?: (row: Row) => React.ReactNode;
  defaultPaginationMode?: "pagination" | "scroll";
  paginationMode?: "pagination" | "scroll";
  onPaginationModeChange?: (mode: "pagination" | "scroll") => void;
  onLoadMore?: () => void;
  canLoadMore?: boolean;
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
  searchField,
  onSearchFieldChange,
  sortField,
  sortDirection,
  onSortChange,
  currentFilters,
  onFiltersChange,
  selectedRowIds = [],
  onSelectedRowIdsChange,
  tableStorageKey,
  exportOptions,
  detailsPanelRender,
  defaultPaginationMode = "pagination",
  paginationMode,
  onPaginationModeChange,
  onLoadMore,
  canLoadMore = false,
}: Props) => {
  const { t } = useTranslation();

  const [columnsToShow, setColumnsToShow] = useState<string[]>(
    columns.filter((c) => !c.defaultHide).map((c) => c.name)
  );
  const [orderedColumns, setOrderedColumns] = useState(columns);
  const [showFilters, setShowFilters] = useState(false);
  const [draftFilters, setDraftFilters] = useState<customFilterProps[]>(currentFilters || []);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);
  const [manualViewMode, setManualViewMode] = useState<"table" | "cards" | "auto">("auto");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [localPaginationMode, setLocalPaginationMode] = useState<"pagination" | "scroll">(
    paginationMode || defaultPaginationMode
  );

  // keep in sync if `columns` prop changes from outside
  useEffect(() => {
    setOrderedColumns(columns.sort((a) => (a.defaultHide ? 1 : -1)));
  }, [columns]);

  useEffect(() => {
    setDraftFilters(currentFilters || []);
  }, [JSON.stringify(currentFilters)]);

  useEffect(() => {
    if (!tableStorageKey) return;
    try {
      const raw = localStorage.getItem(`${tableStorageKey}:columns`);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        visible?: string[];
        order?: string[];
        viewMode?: "table" | "cards" | "auto";
        paginationMode?: "pagination" | "scroll";
      };
      const allNames = columns.map((col) => col.name);

      if (Array.isArray(parsed.visible) && parsed.visible.length > 0) {
        setColumnsToShow(parsed.visible.filter((name) => allNames.includes(name)));
      }
      if (Array.isArray(parsed.order) && parsed.order.length > 0) {
        const byName = new Map(columns.map((col) => [col.name, col]));
        const reordered = parsed.order
          .map((name) => byName.get(name))
          .filter((item): item is TableColumn => !!item);
        const remaining = columns.filter((col) => !parsed.order?.includes(col.name));
        setOrderedColumns([...reordered, ...remaining]);
      }
      if (parsed.viewMode) setManualViewMode(parsed.viewMode);
      if (parsed.paginationMode) setLocalPaginationMode(parsed.paginationMode);
    } catch {
      // ignore malformed localStorage payload
    }
  }, [columns, tableStorageKey]);

  useEffect(() => {
    if (!tableStorageKey) return;
    localStorage.setItem(
      `${tableStorageKey}:columns`,
      JSON.stringify({
        visible: columnsToShow,
        order: orderedColumns.map((col) => col.name),
        viewMode: manualViewMode,
        paginationMode: localPaginationMode,
      })
    );
  }, [columnsToShow, orderedColumns, tableStorageKey, manualViewMode, localPaginationMode]);

  useEffect(() => {
    if (!paginationMode) return;
    setLocalPaginationMode(paginationMode);
  }, [paginationMode]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 991px)");
    const onChange = () => setIsSmallScreen(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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

  const defaultActionsIncluded = [includeView, includeUpdate, includeDelete].filter(Boolean);
  const haveDefaultActions = defaultActionsIncluded.length > 0;

  interface SpreadActionViewProps {
    onClick: (id: string) => void;
    label: string;
    icon: IconProp;
    disabled?: boolean;
    disabledMsg?: string;
    color?: string;
    row?: Row;
  }

  const SpreadActionView = ({
    onClick,
    label,
    icon,
    disabled,
    disabledMsg,
    color,
    row,
  }: SpreadActionViewProps) => (
    <h4>
      <TooltipComp label={label}>
        <FontAwesomeIcon
          icon={icon}
          role="button"
          className={"me-1" + (" text-" + (disabled ? "secondary" : color || "secondary"))}
          onClick={
            disabled
              ? () => {
                  // TODO: Add notification callback prop
                  console.error(disabledMsg || t("Global.Form.CantDoIt"));
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
    const nextDirection: "asc" | "desc" = !isSameField || sortDirection === "desc" ? "asc" : "desc";

    onSortChange(col.name, nextDirection);
  };

  const getDataType = (name: string): string => {
    const column = columns.find((item) => item.name === name);
    if (!column?.type) return "string";
    if (["number", "range", "stars"].includes(column.type)) return "number";
    if (["date", "time", "month", "year", "datetime"].includes(column.type)) return "date";
    if (["boolean", "switch", "checkbox"].includes(column.type)) return "boolean";
    return "string";
  };

  const getFilterOperators = (dataType: string) => {
    if (dataType === "number" || dataType === "date") {
      return [
        {
          label: t("Global.Labels.Equals"),
          value: dataType === "date" ? "dateEquals" : "numberEquals",
        },
        { label: t("Global.Labels.GreaterThan"), value: "moreThan" },
        { label: t("Global.Labels.GreaterThanOrEqual"), value: "moreThanOrEqual" },
        { label: t("Global.Labels.LessThan"), value: "lessThan" },
        { label: t("Global.Labels.LessThanOrEqual"), value: "lessThanOrEqual" },
        { label: t("Global.Labels.NotEquals"), value: "notEquals" },
      ];
    }

    if (dataType === "boolean") {
      return [{ label: t("Global.Labels.Equals"), value: "booleanEquals" }];
    }

    return [
      { label: t("Global.Labels.Contains"), value: "contains" },
      { label: t("Global.Labels.Equals"), value: "stringEquals" },
      { label: t("Global.Labels.StartsWith"), value: "startsWith" },
      { label: t("Global.Labels.EndsWith"), value: "endsWith" },
      { label: t("Global.Labels.NotEquals"), value: "notEquals" },
    ];
  };

  const addFilterRow = () => {
    const defaultField = columns[0]?.name || "";
    const defaultDataType = getDataType(defaultField);
    const defaultOperator = getFilterOperators(defaultDataType)[0]?.value || "contains";
    setDraftFilters((prev) => [
      ...prev,
      {
        field: defaultField,
        filterOperator: defaultOperator,
        conditionJoin: prev.length === 0 ? "AND" : "AND",
        filteredTerm: { dataType: defaultDataType, value: "" },
      },
    ]);
  };

  const updateFilterRow = (index: number, next: customFilterProps) => {
    setDraftFilters((prev) => prev.map((item, i) => (i === index ? next : item)));
  };

  const removeFilterRow = (index: number) => {
    setDraftFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const applyFilters = () => {
    const sanitized = draftFilters.filter(
      (item) =>
        !!item.field &&
        !!item.filterOperator &&
        item.filteredTerm &&
        item.filteredTerm.value !== undefined &&
        item.filteredTerm.value !== null &&
        `${item.filteredTerm.value}`.trim().length > 0
    );
    onFiltersChange?.(sanitized);
    setShowFilters(false);
  };

  const toggleSelectAllCurrentPage = (checked: boolean) => {
    const pageIds = data.map((row) => `${row.id || ""}`).filter(Boolean);
    if (!onSelectedRowIdsChange) return;
    if (!checked) {
      onSelectedRowIdsChange(selectedRowIds.filter((id) => !pageIds.includes(id)));
      return;
    }
    onSelectedRowIdsChange(Array.from(new Set([...selectedRowIds, ...pageIds])));
  };

  const toggleSelectOne = (rowId: string, checked: boolean) => {
    if (!onSelectedRowIdsChange) return;
    if (checked) {
      onSelectedRowIdsChange(Array.from(new Set([...selectedRowIds, rowId])));
      return;
    }
    onSelectedRowIdsChange(selectedRowIds.filter((item) => item !== rowId));
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
  const pageIds = data.map((row) => `${row.id || ""}`).filter(Boolean);
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedRowIds.includes(id));
  const effectiveViewMode =
    manualViewMode === "auto" ? (isSmallScreen ? "cards" : "table") : manualViewMode;
  const visibleColumns = orderedColumns.filter((c) => columnsToShow.includes(c.name));

  const toggleExpandedRow = (rowId: string) => {
    setExpandedRowIds((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  return (
    <div
      className="overflow-x-auto mx-auto"
      style={{ maxWidth: "90vw", minHeight: fitHeight ? undefined : "60vh" }}
    >
      <div className="d-flex justify-content-end gap-2 mb-2">
        <div className="btn-group btn-group-sm" role="group" aria-label="view-mode">
          <button
            type="button"
            className={`btn ${manualViewMode === "auto" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setManualViewMode("auto")}
          >
            {t("Global.Labels.Auto")}
          </button>
          <button
            type="button"
            className={`btn ${manualViewMode === "table" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setManualViewMode("table")}
          >
            <FontAwesomeIcon icon={faTable} className="me-1" />
            {t("Global.Labels.Table")}
          </button>
          <button
            type="button"
            className={`btn ${manualViewMode === "cards" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setManualViewMode("cards")}
          >
            <FontAwesomeIcon icon={faList} className="me-1" />
            {t("Global.Labels.Cards")}
          </button>
        </div>

        <div className="btn-group btn-group-sm" role="group" aria-label="pagination-mode">
          <button
            type="button"
            className={`btn ${
              localPaginationMode === "pagination" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => {
              setLocalPaginationMode("pagination");
              onPaginationModeChange?.("pagination");
            }}
          >
            {t("Global.Labels.Pagination")}
          </button>
          <button
            type="button"
            className={`btn ${
              localPaginationMode === "scroll" ? "btn-secondary" : "btn-outline-secondary"
            }`}
            onClick={() => {
              setLocalPaginationMode("scroll");
              onPaginationModeChange?.("scroll");
            }}
          >
            {t("Global.Labels.Scroll")}
          </button>
        </div>
      </div>

      {effectiveViewMode === "table" ? (
        <div className="table-responsive">
          <table className="table mt-2 w-100">
            <thead className="table-light">
              <tr>
                <th colSpan={columnsToShow.length + 2}>
                  <div className="d-flex gap-2 align-items-center">
                    {(searchProp || columns.length > 0) && (
                      <InputComp
                        name="search"
                        placeholder={
                          searchPlaceholder ??
                          t("Global.Placeholders.Search", {
                            prop: searchProp || t("Global.Labels.All"),
                          })
                        }
                        value={currentSearch || ""}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                      />
                    )}
                    <select
                      className="form-select"
                      style={{ maxWidth: "180px" }}
                      value={searchField || ""}
                      onChange={(e) => onSearchFieldChange?.(e.target.value)}
                    >
                      <option value="">{t("Global.Labels.All")}</option>
                      {columns.map((col) => (
                        <option key={col.name} value={col.name}>
                          {col.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowFilters(true)}
                    >
                      <FontAwesomeIcon icon={faFilter} className="me-1" />
                      {t("Global.Labels.Filter")}
                    </button>
                    {(currentFilters || []).length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {(currentFilters || []).map((filter, idx) => {
                          const column = columns.find((col) => col.name === filter.field);
                          const operators = getFilterOperators(
                            filter.filteredTerm?.dataType || getDataType(filter.field)
                          );
                          const operatorLabel =
                            operators.find((op) => op.value === filter.filterOperator)?.label ||
                            filter.filterOperator;
                          return (
                            <span key={`${filter.field}-${idx}`} className="badge bg-secondary">
                              {idx > 0 ? `${filter.conditionJoin || "AND"} ` : ""}
                              {column?.label || filter.field} {operatorLabel}:{" "}
                              {String(filter.filteredTerm?.value ?? "")}
                            </span>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </th>

                <th colSpan={haveDefaultActions ? 2 : 1}>
                  <div className="d-flex justify-content-end align-items-center">
                    <ExportModal data={data} columns={columns} exportOptions={exportOptions} />

                    <CustomItemsDropdownComp
                      start
                      button={<FontAwesomeIcon icon={faColumns} className="ms-1 text-muted" />}
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
                                    setColumnsToShow((prev) => [...prev, col.name]);
                                  } else {
                                    setColumnsToShow((prev) => prev.filter((c) => c !== col.name));
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
                {detailsPanelRender ? <th className="py-3" scope="col"></th> : null}
                <th className="py-3" scope="col">
                  <input
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={(e) => toggleSelectAllCurrentPage(e.target.checked)}
                  />
                </th>
                <th className="py-3" scope="col">
                  #
                </th>

                {visibleColumns.map((col, i) => (
                  <th
                    className={"py-3 fw-bold" + (col.sortable ? " cursor-pointer" : "")}
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

                {(extraActions && extraActions()?.length) || haveDefaultActions ? (
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
                    colSpan={columnsToShow.length + 3 + (detailsPanelRender ? 1 : 0)}
                    className="text-center py-4"
                  >
                    {t("Global.Labels.NoData")}
                  </td>
                </tr>
              )}

              {data.map((row, i) => {
                const rowId = `${row.id || i}`;
                const expanded = expandedRowIds.includes(rowId);
                return (
                  <Fragment key={rowId}>
                    <tr className="align-middle">
                      {detailsPanelRender ? (
                        <td className="py-3">
                          <button
                            className="btn btn-sm btn-link text-decoration-none"
                            onClick={() => toggleExpandedRow(rowId)}
                            type="button"
                          >
                            <FontAwesomeIcon icon={expanded ? faChevronUp : faChevronDown} />
                          </button>
                        </td>
                      ) : null}
                      <td className="py-3">
                        <input
                          type="checkbox"
                          checked={row.id ? selectedRowIds.includes(`${row.id}`) : false}
                          onChange={(e) => toggleSelectOne(`${row.id || ""}`, e.target.checked)}
                        />
                      </td>
                      <td className="py-3">{i + pageSize * (currentPage - 1) + 1}</td>

                      {visibleColumns.map(
                        ({ name, type, options, render, timestampFormat, moneyUnit }, y) => (
                          <td className="py-3" key={y}>
                            <DataRender
                              row={row}
                              data={String(row[name] ?? "")}
                              type={type}
                              render={render}
                              options={options}
                              timestampFormat={timestampFormat}
                              name={name}
                              money={moneyUnit}
                            />
                          </td>
                        )
                      )}

                      {(extraActions && extraActions()?.length) || haveDefaultActions ? (
                        <td className="py-3">
                          <div className="d-flex">
                            {extraActions &&
                              extraActions(row.id)
                                .filter(({ spread }) => spread)
                                .map(
                                  ({ icon, label, onClick, color, disabled, disabledMsg }, y) => (
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
                            extraActions(row.id).filter(({ spread }) => !spread).length ? (
                              <DropdownComp
                                start
                                button={
                                  <FontAwesomeIcon icon={faEllipsisVertical} className="ms-1" />
                                }
                                list={extraActions(row.id)
                                  .filter(({ spread }) => !spread)
                                  .map(({ icon, label, onClick }) => ({
                                    onClick: () => onClick(row.id || ""),
                                    label: (
                                      <Fragment>
                                        <FontAwesomeIcon icon={icon} className="text-primary" />{" "}
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
                    {detailsPanelRender && expanded ? (
                      <tr>
                        <td
                          colSpan={visibleColumns.length + (haveDefaultActions ? 4 : 3)}
                          className="bg-light"
                        >
                          <div className="p-3">{detailsPanelRender(row)}</div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>

            {data.length !== 0 && localPaginationMode === "pagination" && (
              <tfoot>
                <tr>
                  <th
                    colSpan={
                      columnsToShow.length +
                      (haveDefaultActions ? 3 : 2) +
                      (detailsPanelRender ? 1 : 0)
                    }
                  >
                    <div className="d-flex justify-content-between">
                      <div className="my-auto text-muted me-3">
                        <small>
                          {t("Global.Labels.Showing")} {from} – {to} {t("Global.Labels.Of")} {count}{" "}
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
                                  currentPage === pagesCount ? "secondary" : "primary"
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
                                  currentPage === pagesCount ? "secondary" : "primary"
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
                                  onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
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
      ) : (
        <div className="row g-3 mt-2">
          {data.length === 0 ? (
            <div className="col-12 text-center py-4">{t("Global.Labels.NoData")}</div>
          ) : (
            data.map((row, i) => (
              <div className="col-12 col-md-6 col-xl-4" key={`${row.id || i}`}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">#{i + pageSize * (currentPage - 1) + 1}</h6>
                      {(extraActions && extraActions(row.id)?.length) || haveDefaultActions ? (
                        <div className="d-flex">
                          {includeView && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary me-1"
                              onClick={() => onRowClick(row, "view")}
                            >
                              {t("Global.Form.Labels.View")}
                            </button>
                          )}
                          {includeUpdate && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-warning me-1"
                              onClick={() => onRowClick(row, "update")}
                            >
                              {t("Global.Form.Labels.Edit")}
                            </button>
                          )}
                          {includeDelete && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => onRowClick(row, "delete")}
                            >
                              {t("Global.Form.Labels.Delete")}
                            </button>
                          )}
                        </div>
                      ) : null}
                    </div>
                    {visibleColumns.map(
                      ({ name, label, type, options, render, timestampFormat, moneyUnit }) => (
                        <div className="mb-2" key={name}>
                          <small className="text-muted d-block">{label}</small>
                          <div>
                            <DataRender
                              row={row}
                              data={String(row[name] ?? "")}
                              type={type}
                              render={render}
                              options={options}
                              timestampFormat={timestampFormat}
                              name={name}
                              money={moneyUnit}
                              withoutWrap
                            />
                          </div>
                        </div>
                      )
                    )}
                    {detailsPanelRender ? (
                      <div className="pt-2 border-top">{detailsPanelRender(row)}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {localPaginationMode === "scroll" && canLoadMore ? (
        <div className="d-flex justify-content-center mt-3">
          <button type="button" className="btn btn-outline-primary" onClick={onLoadMore}>
            {t("Global.Labels.LoadMore")}
          </button>
        </div>
      ) : null}

      {showFilters ? (
        <>
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
            onClick={() => setShowFilters(false)}
          />
          <div
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow p-3"
            style={{
              width: "min(900px, 95vw)",
              maxHeight: "85vh",
              overflowY: "auto",
              zIndex: 1050,
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>{t("Global.Labels.AdvancedFilters")}</strong>
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-sm btn-primary" onClick={addFilterRow}>
                  {t("Global.Labels.Add")}
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setShowFilters(false)}
                >
                  {t("Global.Labels.Close")}
                </button>
              </div>
            </div>

            {draftFilters.map((filter, index) => {
              const dataType = filter.filteredTerm?.dataType || getDataType(filter.field);
              const operators = getFilterOperators(dataType);
              return (
                <div className="row g-2 mb-2" key={`${filter.field}-${index}`}>
                  {index > 0 && (
                    <div className="col-12 col-md-2">
                      <select
                        className="form-select"
                        value={filter.conditionJoin || "AND"}
                        onChange={(e) =>
                          updateFilterRow(index, {
                            ...filter,
                            conditionJoin: e.target.value as "AND" | "OR",
                          })
                        }
                      >
                        <option value="AND">{t("Global.Labels.And")}</option>
                        <option value="OR">{t("Global.Labels.Or")}</option>
                      </select>
                    </div>
                  )}
                  <div className={`col-12 ${index > 0 ? "col-md-3" : "col-md-4"}`}>
                    <select
                      className="form-select"
                      value={filter.field}
                      onChange={(e) => {
                        const nextField = e.target.value;
                        const nextDataType = getDataType(nextField);
                        const nextOperator =
                          getFilterOperators(nextDataType)[0]?.value || "contains";
                        updateFilterRow(index, {
                          field: nextField,
                          filterOperator: nextOperator,
                          filteredTerm: { dataType: nextDataType, value: "" },
                        });
                      }}
                    >
                      {columns.map((col) => (
                        <option key={col.name} value={col.name}>
                          {col.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-12 ${index > 0 ? "col-md-3" : "col-md-3"}`}>
                    <select
                      className="form-select"
                      value={filter.filterOperator}
                      onChange={(e) =>
                        updateFilterRow(index, {
                          ...filter,
                          filterOperator: e.target.value,
                        })
                      }
                    >
                      {operators.map((operator) => (
                        <option key={operator.value} value={operator.value}>
                          {operator.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-12 ${index > 0 ? "col-md-3" : "col-md-4"}`}>
                    <input
                      className="form-control"
                      type={
                        dataType === "date" ? "date" : dataType === "number" ? "number" : "text"
                      }
                      value={String(filter.filteredTerm?.value ?? "")}
                      onChange={(e) =>
                        updateFilterRow(index, {
                          ...filter,
                          filteredTerm: {
                            dataType,
                            value: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="col-12 col-md-1 text-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => removeFilterRow(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setDraftFilters([]);
                  onFiltersChange?.([]);
                }}
              >
                {t("Global.Labels.Clear")}
              </button>
              <button type="button" className="btn btn-primary" onClick={applyFilters}>
                {t("Global.Labels.Apply")}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DynamicTable;
