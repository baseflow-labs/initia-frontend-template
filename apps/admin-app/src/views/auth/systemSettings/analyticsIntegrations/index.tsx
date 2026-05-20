import * as MetadataApi from "@initia/shared/api/metadata";
import Button from "@initia/shared/ui/components/core/button";
import Form from "@initia/shared/ui/components/form";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import TabsComp from "@initia/shared/ui/components/tab";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { addNotification } from "../../../../store/actions/notifications";

import { inputs } from "./inputs";

const InsightsEmbeds = ({ data }: { data: Partial<MetadataApi.Metadata> }) => (
  <div className="d-flex flex-column gap-4">
    <div className="border rounded-3 p-3">
      <h5 className="mb-2">Google Analytics</h5>
      {data.googleAnalyticsDashboardUrl ? (
        <iframe
          src={data.googleAnalyticsDashboardUrl}
          title="Google Analytics Dashboard"
          width="100%"
          height="600"
          style={{ border: 0 }}
        />
      ) : (
        <p className="mb-0 text-muted">No data yet</p>
      )}
    </div>
    <div className="border rounded-3 p-3">
      <h5 className="mb-2">Microsoft Clarity</h5>
      {data.microsoftClarityDashboardUrl ? (
        <iframe
          src={data.microsoftClarityDashboardUrl}
          title="Microsoft Clarity Dashboard"
          width="100%"
          height="600"
          style={{ border: 0 }}
        />
      ) : (
        <p className="mb-0 text-muted">No data yet</p>
      )}
    </div>
  </div>
);

const AnalyticsIntegrationsView = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState<Partial<MetadataApi.Metadata>>({});

  const loadData = async () => {
    const res = await MetadataApi.get();
    setData(res.payload || {});
  };

  useEffect(() => {
    loadData().catch(() =>
      dispatch(addNotification("err", "Failed to load analytics integrations settings"))
    );
  }, []);

  const onSubmit = async (values: Record<string, unknown>) => {
    await MetadataApi.update(values);
    await loadData();
    dispatch(addNotification("warning", "Analytics integrations settings updated"));
  };

  const tabs = useMemo(
    () => [
      {
        id: "setup",
        title: t("Auth.Settings.Admin.AnalyticsIntegrations.Setup", "Setup"),
        content: (
          <Form
            initialValues={data}
            inputs={inputs(t)}
            onFormSubmit={onSubmit as (values?: Record<string, unknown>) => void}
          />
        ),
      },
      {
        id: "insights",
        title: t("Auth.Settings.Admin.AnalyticsIntegrations.Insights", "Insights"),
        content: <InsightsEmbeds data={data} />,
      },
    ],
    [data, t]
  );

  return (
    <PageTemplate
      title={t("Auth.Settings.Admin.AnalyticsIntegrations.Title", "Analytics Integrations")}
    >
      <TabsComp
        items={tabs.map((tab) => ({
          ...tab,
          content: (
            <div className="mt-3 card shadow-sm">
              <div className="card-body p-4">{tab.content}</div>
            </div>
          ),
        }))}
      />
      <div className="mt-3 d-flex gap-2 flex-wrap">
        {data.googleAnalyticsDashboardUrl && (
          <Button onClick={() => window.open(data.googleAnalyticsDashboardUrl, "_blank")}>
            Open GA Dashboard
          </Button>
        )}
        {data.microsoftClarityDashboardUrl && (
          <Button onClick={() => window.open(data.microsoftClarityDashboardUrl, "_blank")}>
            Open Clarity Dashboard
          </Button>
        )}
      </div>
    </PageTemplate>
  );
};

export default AnalyticsIntegrationsView;
