import { faCopy, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import service, { customFilterProps, formatGetFilters } from "../../../api";
import { apiCatchGlobalHandler } from "../../../utils/function";
import Button from "../core/button";
import Form from "../form";
import Modal from "../modal";

import DynamicTable, { actionProps, TableColumn } from ".";

interface Props {
  dataApiEndpoint: string;
  inputs: TableColumn[]; // reuse type from DynamicTable
  singleItem: string;
  includeCreate?: boolean;
  includeView?: boolean;
  includeUpdate?: boolean;
  includeDelete?: boolean;
  extraActions?: (id?: string) => actionProps[];
  /** optional: which field is searchable (for label only) */
  searchProp?: string;
  searchPlaceholder?: string;
  useDedicatedCrudPages?: boolean;
  crudMode?: "inline" | "routes";
}

type ModalAction = "view" | "create" | "update" | "delete";

interface ModalState {
  action: ModalAction;
  open: boolean;
  data: object;
}

interface PersistedState {
  currentPage?: number;
  pageSize?: number;
  search?: string;
  searchField?: string;
  filters?: customFilterProps[];
  sortBy?: string;
  reverse?: boolean;
  paginationMode?: "pagination" | "scroll";
}

const toFormInput = (input: TableColumn): TableColumn => {
  const {
    render: _render,
    timestampFormat: _timestampFormat,
    sortable: _sortable,
    defaultFilterValue: _defaultFilterValue,
    defaultFilterOperator: _defaultFilterOperator,
    defaultFilterDataType: _defaultFilterDataType,
    defaultHide: _defaultHide,
    ...formInput
  } = input;

  return formInput;
};

const ApiDataTable: React.FC<Props> = ({
  dataApiEndpoint,
  inputs,
  singleItem,
  includeCreate,
  includeView,
  includeUpdate,
  includeDelete,
  extraActions,
  searchProp,
  searchPlaceholder,
  crudMode = "inline",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRouteCrud = crudMode === "routes";

  const [modal, setModal] = useState<ModalState>({
    action: "view",
    open: false,
    data: {},
  });

  const [data, setData] = useState<Record<string, unknown>[]>([]);

  // pagination & meta
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginationMeta, setPaginationMeta] = useState({
    page: 1,
    capacity: 10,
    count: 0,
    pagesCount: 1,
  });

  // search / filters / sorting
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [filters, setFilters] = useState<customFilterProps[]>([]);
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [reverse, setReverse] = useState<boolean | undefined>();
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [paginationMode, setPaginationMode] = useState<"pagination" | "scroll">("pagination");

  const stateInitializedRef = useRef(false);
  const storageKey = useMemo(
    () => `apiTable:${(dataApiEndpoint || "").replace(/[^\w/-]/g, "_")}`,
    [dataApiEndpoint]
  );

  // const renderActionLabel = (action: ModalAction) => {
  //   switch (action) {
  //     case "create":
  //       return t("Global.Labels.CreateNew", { item: singleItem });
  //     case "update":
  //       return t("Global.Labels.Update", { item: singleItem });
  //     case "delete":
  //       return t("Global.Labels.Delete", { item: singleItem });
  //     default:
  //       return "";
  //   }
  // };

  const onSuccess = () => {
    // TODO: Add notification callback prop
    // addNotification({
    //   msg: t("Global.Notifications.Successful", {
    //     action: renderActionLabel(modal.action),
    //   }),
    // });
    // refresh data
    fetchData();
    setModal({ action: "view", open: false, data: {} });
    setSelectedRowIds([]);
  };

  const onFormSubmit = (formData: { id?: string }) => {
    const apiCall = async () => {
      switch (modal.action) {
        case "create":
          return await service.post(dataApiEndpoint, formData);
        case "update":
          return await service.put(dataApiEndpoint + `/${formData.id}`, formData);
        case "delete":
          return await service.delete(dataApiEndpoint + `/${formData.id}`);
        default:
          return () => {};
      }
    };

    apiCall()
      .then(() => {
        onSuccess();
      })
      .catch(apiCatchGlobalHandler);
  };

  const fetchData = () => {
    {
      service
        .get(dataApiEndpoint, {
          params: {
            ...formatGetFilters({}, filters),
            page: currentPage,
            capacity: pageSize,
            search: search || undefined,
            searchField: searchField || undefined,
            sortBy,
            reverse,
          },
        })
        .then((res: Record<string, unknown>) => {
          // Adjust depending on your API shape
          const payload = res?.payload as Record<string, unknown>[];

          const meta: { page: number; capacity: number; count: number; pagesCount: number } =
            res?.extra as {
              page: number;
              capacity: number;
              count: number;
              pagesCount: number;
            };

          setData((prev) => {
            if (paginationMode === "scroll" && currentPage > 1) {
              const merged = [...prev, ...payload];
              return merged.filter(
                (item, index, arr) =>
                  index ===
                  arr.findIndex((entry) => `${entry.id || index}` === `${item.id || index}`)
              );
            }
            return payload;
          });

          setPaginationMeta({
            page: meta.page,
            capacity: meta.capacity,
            count: meta.count,
            pagesCount: meta.pagesCount,
          });
        })
        .catch(apiCatchGlobalHandler);
    }
  };

  // refetch whenever these change
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    pageSize,
    search,
    JSON.stringify(filters),
    sortBy,
    reverse,
    dataApiEndpoint,
    searchField,
    paginationMode,
  ]);

  // Query-shape changes should restart pagination from first page.
  useEffect(() => {
    setCurrentPage(1);
  }, [search, searchField, JSON.stringify(filters), sortBy, reverse, pageSize, dataApiEndpoint]);

  useEffect(() => {
    if (stateInitializedRef.current) return;
    stateInitializedRef.current = true;

    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as PersistedState;

      if (typeof parsed.currentPage === "number" && parsed.currentPage > 0) {
        setCurrentPage(parsed.currentPage);
      }
      if (typeof parsed.pageSize === "number" && parsed.pageSize > 0) {
        setPageSize(parsed.pageSize);
      }
      if (typeof parsed.search === "string") setSearch(parsed.search);
      if (typeof parsed.searchField === "string") setSearchField(parsed.searchField);
      if (Array.isArray(parsed.filters)) setFilters(parsed.filters);
      if (typeof parsed.sortBy === "string") setSortBy(parsed.sortBy);
      if (typeof parsed.sortBy === "string" && typeof parsed.reverse === "boolean") {
        setReverse(parsed.reverse);
      }
      if (parsed.paginationMode === "pagination" || parsed.paginationMode === "scroll") {
        setPaginationMode(parsed.paginationMode);
      }

      const hasPersistedFilters = Array.isArray(parsed.filters) && parsed.filters.length > 0;
      if (!hasPersistedFilters) {
        const defaultFilters = inputs
          .filter(
            (item) => item.defaultFilterValue !== undefined && item.defaultFilterValue !== null
          )
          .map((item) => ({
            field: item.name,
            filterOperator:
              item.defaultFilterOperator ||
              (item.type === "date" || item.type === "datetime" ? "dateEquals" : "stringEquals"),
            filteredTerm: {
              dataType:
                item.defaultFilterDataType ||
                (item.type === "number" ? "number" : item.type === "date" ? "date" : "string"),
              value: item.defaultFilterValue as string | number | boolean,
            },
            conditionJoin: "AND" as const,
          }));
        if (defaultFilters.length > 0) {
          setFilters(defaultFilters);
        }
      }
    } catch {
      // ignore malformed localStorage payload
    }
  }, [storageKey, inputs]);

  useEffect(() => {
    const payload: PersistedState = {
      currentPage,
      pageSize,
      search,
      searchField,
      filters,
      sortBy,
      reverse,
      paginationMode,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [
    currentPage,
    pageSize,
    search,
    searchField,
    filters,
    sortBy,
    reverse,
    paginationMode,
    storageKey,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSortChange = (field: string, nextReverse: boolean) => {
    setSortBy(field);
    setReverse(nextReverse);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSearchFieldChange = (value: string) => {
    setSearchField(value);
    setCurrentPage(1);
  };

  // If you add filter UI later, call setFilters from there:
  const handleFiltersChange = (nextFilters: customFilterProps[]) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleBulkDelete = () => {
    if (!selectedRowIds.length) return;

    const tryBulkDelete = async () => {
      try {
        await service.delete(`${dataApiEndpoint}/bulk`, {
          params: {
            ids: JSON.stringify(selectedRowIds),
            wipe: false,
          },
        });
      } catch {
        await Promise.all(selectedRowIds.map((id) => service.delete(`${dataApiEndpoint}/${id}`)));
      }
    };

    tryBulkDelete()
      .then(() => {
        setSelectedRowIds([]);
        fetchData();
      })
      .catch(apiCatchGlobalHandler);
  };

  const duplicateInitialValues = (id: string) => {
    const row = data.find((item) => `${item.id || ""}` === id);
    if (!row) return {};

    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...values } = row;
    return values;
  };

  const handleDuplicate = (id: string) => {
    if (!id) return;

    const initialValues = duplicateInitialValues(id);

    if (isRouteCrud) {
      navigate(`${location.pathname.replace(/\/$/, "")}/new`, {
        state: { initialValues },
      });
      return;
    }

    setModal({ action: "create", open: true, data: initialValues });
  };

  const mergedExtraActions = (id?: string) => {
    const base: actionProps[] = includeCreate
      ? [
          {
            label: t("Global.Labels.Duplicate"),
            icon: faCopy,
            spread: true,
            color: "secondary",
            onClick: (targetId: string) => handleDuplicate(targetId || id || ""),
          },
        ]
      : [];
    const userActions = extraActions ? extraActions(id) : [];
    return [...base, ...userActions];
  };

  const modalTitle =
    modal.action === "create"
      ? t("Global.Labels.CreateNew", { item: singleItem })
      : modal.action === "update"
        ? t("Global.Labels.Update", { item: singleItem })
        : modal.action === "delete"
          ? t("Global.Labels.Delete", { item: singleItem })
          : modal.action === "view"
            ? t("Global.Labels.View", { item: singleItem })
            : "";

  const formSection = (
    <div>
      <Form
        inputs={() =>
          inputs.map((item) => ({
            ...toFormInput(item),
            disabled: modal.action === "view" || modal.action === "delete" || item.name === "id",
            double: true,
          }))
        }
        initialValues={modal.data}
        onFormSubmit={
          modal.action === "view"
            ? undefined
            : (onFormSubmit as (values?: Record<string, unknown>, reset?: () => void) => void)
        }
        submitText={
          modal.action === "delete" ? t("Global.Labels.Delete", { item: singleItem }) : undefined
        }
        submitColor={
          modal.action === "delete" ? "danger" : modal.action === "update" ? "warning" : "success"
        }
      />
      <div className="text-end mt-3">
        <Button
          color="secondary"
          onClick={() => setModal({ open: false, data: {}, action: "view" })}
        >
          {t("Global.Labels.Close")}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      {includeCreate && (
        <div className="d-flex justify-content-end mb-3">
          <Button
            color="success"
            onClick={() =>
              isRouteCrud
                ? navigate(`${location.pathname.replace(/\/$/, "")}/new`)
                : setModal({ action: "create", open: true, data: {} })
            }
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            {t("Global.Labels.CreateNew", { item: singleItem })}
          </Button>
        </div>
      )}
      {includeDelete && selectedRowIds.length > 0 && (
        <div className="d-flex justify-content-end mb-3">
          <Button color="danger" onClick={handleBulkDelete}>
            {t("Global.Labels.DeleteSelected", { count: selectedRowIds.length })}
          </Button>
        </div>
      )}

      <DynamicTable
        data={(data || []) as { id: string }[]}
        columns={inputs}
        onRowClick={(rowData = {}, action = "") => {
          if (isRouteCrud && rowData.id) {
            const mode = action === "update" ? "edit" : action || "view";
            navigate(
              `${location.pathname.replace(/\/$/, "")}/${rowData.id}${
                mode === "view" ? "?mode=view" : mode === "delete" ? "?mode=delete" : ""
              }`
            );
            return;
          }

          setModal({
            action: (action || "view") as ModalAction,
            open: true,
            data: rowData,
          });
        }}
        includeView={includeView}
        includeUpdate={includeUpdate}
        includeDelete={includeDelete}
        extraActions={mergedExtraActions}
        // pagination / meta
        paginationMeta={paginationMeta}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        // search
        searchProp={searchProp}
        searchPlaceholder={searchPlaceholder}
        currentSearch={search}
        onSearchChange={handleSearchChange}
        searchField={searchField}
        onSearchFieldChange={handleSearchFieldChange}
        // sort
        sortBy={sortBy}
        reverse={reverse}
        onSortChange={handleSortChange}
        // filters hook (UI to be added later if you want)
        onFiltersChange={handleFiltersChange}
        currentFilters={filters}
        selectedRowIds={selectedRowIds}
        onSelectedRowIdsChange={setSelectedRowIds}
        tableStorageKey={storageKey}
        exportOptions={{
          endpoint: dataApiEndpoint,
          search,
          searchField,
          filters,
          sortBy,
          reverse,
        }}
        defaultPaginationMode="pagination"
        paginationMode={paginationMode}
        onPaginationModeChange={(mode) => {
          setPaginationMode(mode);
          setCurrentPage(1);
        }}
        onLoadMore={() => setCurrentPage((prev) => prev + 1)}
        canLoadMore={paginationMeta.page < paginationMeta.pagesCount}
        detailsPanelRender={(row) => (
          <div className="row g-2">
            {inputs.map((input) => (
              <div className="col-12 col-md-6" key={input.name}>
                <small className="text-muted d-block">{input.label}</small>
                <span>{String(row[input.name] ?? "-")}</span>
              </div>
            ))}
          </div>
        )}
      />

      {!isRouteCrud ? (
        <Modal
          name={`crud-${dataApiEndpoint.replace(/[^\w-]/g, "-")}`}
          title={modalTitle}
          className="modal-lg"
          isOpen={modal.open}
          onClose={() => setModal({ open: false, data: {}, action: "view" })}
        >
          {formSection}
        </Modal>
      ) : null}
    </div>
  );
};

export default ApiDataTable;
