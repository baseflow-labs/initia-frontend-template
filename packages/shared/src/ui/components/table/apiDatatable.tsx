import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import service, { customFilterProps, formatGetFilters } from "../../../api";
import { apiCatchGlobalHandler } from "../../../utils/function";
import Button from "../core/button";
import Form from "../form";

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
  sortField?: string;
  sortDirection?: "asc" | "desc" | null;
}

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
  useDedicatedCrudPages = true,
}) => {
  const { t } = useTranslation();

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
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

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
            sortField,
            sortDirection,
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

          setData(payload);

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
    sortField,
    sortDirection,
    dataApiEndpoint,
    searchField,
  ]);

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
      if (typeof parsed.sortField === "string") setSortField(parsed.sortField);
      if (
        parsed.sortDirection === "asc" ||
        parsed.sortDirection === "desc" ||
        parsed.sortDirection === null
      ) {
        setSortDirection(parsed.sortDirection);
      }
    } catch {
      // ignore malformed localStorage payload
    }
  }, [storageKey]);

  useEffect(() => {
    const payload: PersistedState = {
      currentPage,
      pageSize,
      search,
      searchField,
      filters,
      sortField,
      sortDirection,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [currentPage, pageSize, search, searchField, filters, sortField, sortDirection, storageKey]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleSortChange = (field: string, direction: "asc" | "desc") => {
    setSortField(field);
    setSortDirection(direction);
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
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-body">
        <h5 className="mb-3">{modalTitle}</h5>
        <Form
          inputs={() =>
            inputs.map((item) => ({
              ...item,
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
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {includeCreate && (
        <div className="d-flex justify-content-end mb-3">
          <Button
            color="success"
            onClick={() => setModal({ action: "create", open: true, data: {} })}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            {t("Global.Labels.CreateNew", { item: singleItem })}
          </Button>
        </div>
      )}
      {includeDelete && selectedRowIds.length > 0 && (
        <div className="d-flex justify-content-end mb-3">
          <Button color="danger" onClick={handleBulkDelete}>
            Delete Selected ({selectedRowIds.length})
          </Button>
        </div>
      )}

      <DynamicTable
        data={(data || []) as { id: string }[]}
        columns={inputs}
        onRowClick={(rowData = {}, action = "") =>
          setModal({
            action: (action || "view") as ModalAction,
            open: true,
            data: rowData,
          })
        }
        includeView={includeView}
        includeUpdate={includeUpdate}
        includeDelete={includeDelete}
        extraActions={extraActions}
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
        sortField={sortField}
        sortDirection={sortDirection}
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
          sortField,
          sortDirection,
        }}
      />

      {modal.open && useDedicatedCrudPages ? formSection : null}
    </div>
  );
};

export default ApiDataTable;
