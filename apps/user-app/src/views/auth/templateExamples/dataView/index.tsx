import CalendarComp from "@initia/shared/ui/components/calendar";
import CollapseGroup from "@initia/shared/ui/components/collapse";
import DropdownComp from "@initia/shared/ui/components/dropdown";
import Modal from "@initia/shared/ui/components/modal";
import TabsComp from "@initia/shared/ui/components/tab";
import ApiDataTable from "@initia/shared/ui/components/table/apiDatatable";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { faCakeCandles, faEllipsisVertical, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as DataViewOptionsApi from "../../../../api/dataViewOptions";
import { inputs } from "../datatablePage/inputs";

const TemplateDataViewExamplesView = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [kanbanColumns, setKanbanColumns] = useState<DataViewOptionsApi.KanbanColumn[]>([]);

  useEffect(() => {
    DataViewOptionsApi.getKanban()
      .then((res) => {
        setKanbanColumns(res.payload?.columns ?? []);
      })
      .catch(() => setKanbanColumns([]));
  }, []);

  const exampleData = [
    {
      title: t("Auth.Examples.DataView.Test1.Title"),
      body: t("Auth.Examples.DataView.Test1.Body"),
    },
    {
      title: t("Auth.Examples.DataView.Test2.Title"),
      body: t("Auth.Examples.DataView.Test2.Body"),
    },
  ];

  const dataViewExamples = [
    {
      title: "Kanban View",
      body: (
        <div className="row g-3">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="col-12 col-lg-4">
              <div
                className="border rounded-3 p-3 h-100"
                style={{ backgroundColor: "var(--theme-bg-secondary)" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0">{column.title}</h6>
                  <span className="badge bg-secondary">{column.items.length}</span>
                </div>
                <div className="d-flex flex-column gap-2">
                  {column.items.map((item) => (
                    <div key={item.id} className="card shadow-sm border-0">
                      <div className="card-body p-3">
                        <div className="fw-semibold mb-2">{item.title}</div>
                        <div className="small text-muted mb-2">Assignee: {item.assignee}</div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span
                            className={`badge ${
                              item.priority === "high"
                                ? "bg-danger"
                                : item.priority === "medium"
                                  ? "bg-warning text-dark"
                                  : "bg-success"
                            }`}
                          >
                            {item.priority}
                          </span>
                          <span className="small text-muted">{item.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
      fullWidth: true,
    },
    {
      title: t("Auth.Examples.DataView.CollapseGroup"),
      body: (
        <CollapseGroup
          items={exampleData.map(({ title, body }) => ({
            title,
            content: <p>{body}</p>,
          }))}
        />
      ),
    },
    {
      title: t("Auth.Examples.DataView.TabsGroup"),
      body: (
        <TabsComp
          items={exampleData.map(({ title, body }, i) => ({
            id: String(i),
            title,
            content: (
              <div className="card mt-4">
                <div className="card-body">
                  <p>{body}</p>
                </div>
              </div>
            ),
          }))}
        />
      ),
    },
    {
      title: t("Auth.Examples.DataView.Modal"),
      body: (
        <Modal
          name="modal"
          withTrigger
          triggerLabel="Open"
          title={t("Auth.Examples.DataView.Modal")}
          isOpen={open}
          onClose={() => setOpen(false)}
        >
          {exampleData[0].body}
        </Modal>
      ),
    },
    {
      title: t("Auth.Examples.DataView.Dropdown"),
      body: (
        <DropdownComp
          start
          button={<FontAwesomeIcon icon={faEllipsisVertical} className="ms-1" />}
          list={exampleData.map(({ title }) => ({
            label: title,
            onClick: () => alert(title),
          }))}
        />
      ),
    },
    {
      title: t("Auth.Examples.DataView.Table"),
      body: (
        <ApiDataTable
          dataApiEndpoint="/support/logger"
          inputs={inputs(t)}
          singleItem={t("Auth.Settings.Admin.Logger.Title")}
          includeView
        />
      ),
      fullWidth: true,
    },
    {
      title: t("Auth.Examples.DataView.Calendar"),
      body: (
        <CalendarComp
          events={[
            {
              id: "string;",
              title: "Meeting 1",
              typeId: "1",
              partyId: "1",
              start: "2025-12-07",
              end: "2025-12-08",
              description: "Meeting description",
            },
            {
              id: "string;",
              title: "Meeting 2",
              typeId: "1",
              partyId: "2",
              start: "2025-12-08T10:00:00",
              end: "2025-12-09T12:00:00",
              description: "Meeting description",
            },
            {
              id: "string;",
              title: "Party 1",
              typeId: "2",
              partyId: "2",
              start: "2025-12-18T10:00:00",
              end: "2025-12-19T12:00:00",
              description: "Party description",
            },
          ]}
          eventTypes={[
            { id: "1", label: "Meeting", icon: faPerson },
            { id: "2", label: "Party", icon: faCakeCandles },
          ]}
          parties={[
            { id: "1", name: "Party 1", colorClass: "success" },
            { id: "2", name: "Party 2", colorClass: "danger" },
          ]}
        />
      ),
      fullWidth: true,
    },
  ];

  const pageBreadcrumbs = [{ label: t("Auth.Dashboard.Title"), path: "/dashboard" }];

  return (
    <PageTemplate title={t("Auth.Examples.DataView.Title")} breadcrumbs={pageBreadcrumbs}>
      <div className="row">
        {dataViewExamples.map((example, idx) => (
          <div className={`col-12 ${example.fullWidth ? "col-md-12" : "col-md-6"} my-4`} key={idx}>
            <h4 className="mb-3">{example.title}</h4>

            {example.body}
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default TemplateDataViewExamplesView;
