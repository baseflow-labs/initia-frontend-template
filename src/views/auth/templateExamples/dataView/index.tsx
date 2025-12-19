import CalendarComp from "@/components/calendar";
import CollapseGroup from "@/components/collapse";
import DropdownComp from "@/components/dropdown";
import Modal from "@/components/modal";
import TabsComp from "@/components/tab";
import ApiDataTable from "@/components/table/apiDatatable";
import PageTemplate from "@/layouts/auth/pages/pageTemplate";
import { faCakeCandles, faEllipsisVertical, faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { inputs } from "../datatablePage/inputs";

const TemplateDataViewExamplesView = () => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

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
