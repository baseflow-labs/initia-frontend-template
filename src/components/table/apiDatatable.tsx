import service, { customFilterProps, demoStatus, formatGetFilters } from "@/api";
import { addNotification } from "@/store/actions/notifications";
import { apiCatchGlobalHandler } from "@/utils/function";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import DynamicTable, { actionProps, TableColumn } from ".";
import Button from "../core/button";
import Form from "../form";
import Modal from "../modal";

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
}

type ModalAction = "view" | "create" | "update" | "delete";

interface ModalState {
  action: ModalAction;
  open: boolean;
  data: object;
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
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modal, setModal] = useState<ModalState>({
    action: "view",
    open: false,
    data: {},
  });

  const [data, setData] = useState<object[]>([]);

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
  const [filters, setFilters] = useState<customFilterProps[]>([]);
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);

  const renderActionLabel = (action: ModalAction) => {
    switch (action) {
      case "create":
        return t("Global.Labels.CreateNew", { item: singleItem });
      case "update":
        return t("Global.Labels.Update", { item: singleItem });
      case "delete":
        return t("Global.Labels.Delete", { item: singleItem });
      default:
        return "";
    }
  };

  const onSuccess = () => {
    dispatch(
      addNotification({
        msg: t("Global.Notifications.Successful", {
          action: renderActionLabel(modal.action),
        }),
      })
    );
    // refresh data
    fetchData();
    setModal({ action: "view", open: false, data: {} });
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

    if (demoStatus) {
      onSuccess();
    } else {
      apiCall()
        .then(() => {
          onSuccess();
        })
        .catch(apiCatchGlobalHandler);
    }
  };

  const fetchData = () => {
    if (demoStatus) {
      setData([
        {
          id: "1",
          name: "Demo Item 1",
          username: "790035342",
          email: "demo@example.com",
        },
        {
          id: "2",
          name: "Demo Item 2",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "3",
          name: "Demo Item 3",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "4",
          name: "Demo Item 4",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "5",
          name: "Demo Item 5",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "6",
          name: "Demo Item 6",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "7",
          name: "Demo Item 7",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "8",
          name: "Demo Item 8",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "9",
          name: "Demo Item 9",
          username: "788424973",
          email: "demo@example.com",
        },
        {
          id: "10",
          name: "Demo Item 10",
          username: "788424973",
          email: "demo@example.com",
        },
      ]);
    } else {
      service
        .get(dataApiEndpoint, {
          params: {
            ...formatGetFilters(inputs, filters),
            page: currentPage,
            capacity: pageSize,
            search: search || undefined,
            sortField,
            sortDirection,
          },
        })
        .then((res) => {
          // Adjust depending on your API shape
          const apiData = res?.data as Record<string, unknown>;
          const payload = (apiData?.payload || apiData) as Record<string, unknown>;
          const rows = (payload?.data || payload?.rows || payload || []) as object[];
          const meta = payload?.meta ||
            res?.data?.meta || {
              page: currentPage,
              capacity: pageSize,
              count: Array.isArray(rows) ? rows.length : 0,
              pagesCount: Array.isArray(rows) ? Math.max(1, Math.ceil(rows.length / pageSize)) : 1,
            };

          setData(rows);
          setPaginationMeta({
            page: meta.page || currentPage,
            capacity: meta.capacity || pageSize,
            count: meta.count || 0,
            pagesCount: meta.pagesCount || 1,
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
  ]);

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

  // If you add filter UI later, call setFilters from there:
  const handleFiltersChange = (nextFilters: customFilterProps[]) => {
    setFilters(nextFilters);
    setCurrentPage(1);
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

  return (
    <div>
      {includeCreate && (
        <div className="text-end mb-3">
          <Button
            className="btn btn-success"
            onClick={() => setModal({ action: "create", open: true, data: {} })}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            {t("Global.Labels.CreateNew", { item: singleItem })}
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
        // sort
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
        // filters hook (UI to be added later if you want)
        onFiltersChange={handleFiltersChange}
      />

      <Modal
        title={modalTitle}
        className="modal-lg"
        isOpen={modal.open}
        onClose={() => setModal({ open: false, data: {}, action: "view" })}
      >
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
      </Modal>
    </div>
  );
};

export default ApiDataTable;
