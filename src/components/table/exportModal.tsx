import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { TableColumn } from ".";
import Form from "../form";
import Modal from "../modal";
import Button from "../core/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

interface Props {
  data: object[];
  columns: TableColumn[];
}

type ModalAction = "view" | "create" | "update" | "delete";

interface ModalState {
  action: ModalAction;
  open: boolean;
  data: any;
}

const ExportModal: React.FC<Props> = ({
  columns,
  data
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [modal, setModal] = useState<ModalState>({
    action: "view",
    open: false,
    data: {},
  });

  return (
    <Fragment>
      <FontAwesomeIcon
        icon={faFileDownload}
        className="ms-1 text-muted"
        onClick={() => setModal({ open: true, data: { fields: columns.map(col => col.name) }, action: "view" })}
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
              type: 'checkbox',
              name: 'fields',
              fullWidth: true,
              label: t("Global.Table.Export.SelectFieldsToExport"),
              options: columns.map((column) => ({
                label: column.label,
                value: column.name,
              })),
              defaultValue: columns.map(col => col.name),
            },
            {
              type: 'select',
              name: 'type',
              fullWidth: true,
              label: t("Global.Table.Export.Type.Title"),
              options: [
                { label: t('Global.Table.Export.Type.CSV'), value: 'csv' },
                { label: t('Global.Table.Export.Type.Excel'), value: 'excel' },
                { label: t('Global.Table.Export.Type.PDF'), value: 'pdf' },
                { label: t('Global.Table.Export.Type.Print'), value: 'print' },
              ],
              defaultValue: 'csv',
            },
            {
              type: 'multipleEntries',
              name: 'filters',
              label: t("Global.Table.Export.Filters.AddFilters"),
              fullWidth: true,
              inputs: [
                {
                  type: 'select',
                  name: 'field',
                  label: t("Global.Table.Export.Filters.Field"),
                  options: columns.map((column) => ({
                    label: column.label,
                    value: column.name,
                  })),
                },
                {
                  type: 'select',
                  name: 'operator',
                  label: t("Global.Table.Export.Filters.Operators.Title"),
                  options: [
                    { value: '=', label: t("Global.Table.Export.Filters.Operators.Equals") },
                    { value: '!=', label: t("Global.Table.Export.Filters.Operators.NotEquals") },
                    { value: '<', label: t("Global.Table.Export.Filters.Operators.LessThan") },
                    { value: '<=', label: t("Global.Table.Export.Filters.Operators.LessThanOrEqual") },
                    { value: '>', label: t("Global.Table.Export.Filters.Operators.GreaterThan") },
                    { value: '>=', label: t("Global.Table.Export.Filters.Operators.GreaterThanOrEqual") },
                  ]
                },
                {
                  type: 'text',
                  name: 'value',
                  label: t("Global.Table.Export.Filters.Value"),
                },
              ]
            }
          ]}
          initialValues={{fields: columns.map(col => col.name)}}
          submitText={t("Global.Table.Export.Export")}
          onFormSubmit={() => ''}
        />
      </Modal>
    </Fragment>
  );
};

export default ExportModal;
