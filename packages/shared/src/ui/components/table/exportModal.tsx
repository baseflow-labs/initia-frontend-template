import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

import service from "../../../api";
import { apiCatchGlobalHandler } from "../../../utils/function";
import Form from "../form";
import Modal from "../modal";
import { customFilterProps } from "../../../api";

import { TableColumn } from ".";

interface Props {
  data: object[];
  columns: TableColumn[];
  exportOptions?: {
    endpoint: string;
    search?: string;
    searchField?: string;
    filters?: customFilterProps[];
    sortField?: string;
    sortDirection?: "asc" | "desc" | null;
  };
}

type ModalAction = "view" | "create" | "update" | "delete";

interface ModalState {
  action: ModalAction;
  open: boolean;
  data: Record<string, unknown>;
}

const ExportModal: React.FC<Props> = ({ columns, exportOptions }) => {
  const { t } = useTranslation();

  const [modal, setModal] = useState<ModalState>({
    action: "view",
    open: false,
    data: {},
  });

  const downloadFile = (blob: Blob, filename: string) => {
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  };

  const onExport = (values?: Record<string, unknown>) => {
    const endpoint = exportOptions?.endpoint;
    if (!endpoint) return;

    const fileType = values?.type === "excel" ? "csv" : (values?.type as string) || "csv";
    const payload = {
      endpoint,
      fields: ((values?.fields as string[]) || []).filter(Boolean),
      fileType,
      conditions: exportOptions?.filters || [],
      search: exportOptions?.search || "",
      searchField: exportOptions?.searchField || "",
      sortBy: exportOptions?.sortField,
      reverse: exportOptions?.sortDirection === "desc",
    };

    service.axios
      .post("/reports/export", payload, { responseType: "blob" })
      .then((res) => {
        const extension = fileType === "json" ? "json" : "csv";
        const filename = `${endpoint.replace(/[^\w-]+/g, "_")}.${extension}`;
        downloadFile(res.data as Blob, filename);
        setModal({ open: false, data: {}, action: "view" });
      })
      .catch(apiCatchGlobalHandler);
  };

  return (
    <Fragment>
      <FontAwesomeIcon
        icon={faFileDownload}
        className="ms-1 text-muted"
        onClick={() =>
          setModal({ open: true, data: { fields: columns.map((col) => col.name) }, action: "view" })
        }
        role="button"
      />

      <Modal
        title={t("Global.Table.Export.Title")}
        className="modal-lg"
        isOpen={modal.open}
        onClose={() => setModal({ open: false, data: {}, action: "view" })}
      >
        <Form
          inputs={() => [
            {
              type: "checkbox",
              name: "fields",
              fullWidth: true,
              label: t("Global.Table.Export.SelectFieldsToExport"),
              options: columns.map((column) => ({
                label: column.label,
                value: column.name,
              })),
              defaultValue: columns.map((col) => col.name),
            },
            {
              type: "select",
              name: "type",
              fullWidth: true,
              label: t("Global.Table.Export.Type.Title"),
              options: [
                { label: t("Global.Table.Export.Type.CSV"), value: "csv" },
                { label: t("Global.Table.Export.Type.Excel"), value: "excel" },
                { label: "JSON", value: "json" },
              ],
              defaultValue: "csv",
            },
          ]}
          initialValues={{ fields: columns.map((col) => col.name) }}
          submitText={t("Global.Table.Export.Export")}
          onFormSubmit={onExport}
        />
      </Modal>
    </Fragment>
  );
};

export default ExportModal;
