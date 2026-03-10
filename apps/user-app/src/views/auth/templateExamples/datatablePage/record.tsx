import service from "@initia/shared/api";
import Button from "@initia/shared/ui/components/core/button";
import Form from "@initia/shared/ui/components/form";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router";

import { inputs } from "./inputs";

type RecordMode = "create" | "view" | "edit" | "delete";

const TemplateDataTableRecordView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [initialValues, setInitialValues] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);

  const mode: RecordMode = useMemo(() => {
    if (!id) return "create";
    const rawMode = searchParams.get("mode");
    if (rawMode === "view" || rawMode === "delete") return rawMode;
    return "edit";
  }, [id, searchParams]);

  const pageBreadcrumbs = [
    { label: t("Auth.Dashboard.Title"), path: "/dashboard" },
    {
      label: t("Auth.TemplateExamples.DataTable.Title"),
      path: "/template-examples/data-table",
    },
  ];

  const singleItem = t("Auth.Settings.Admin.Users.User");
  const title =
    mode === "create"
      ? t("Global.Labels.CreateNew", { item: singleItem })
      : mode === "view"
        ? t("Global.Labels.View", { item: singleItem })
        : mode === "delete"
          ? t("Global.Labels.Delete", { item: singleItem })
          : t("Global.Labels.Update", { item: singleItem });

  useEffect(() => {
    if (!id) {
      setInitialValues({});
      return;
    }

    setLoading(true);
    service
      .get(`/support/users/${id}`)
      .then((res: Record<string, unknown>) => {
        setInitialValues((res?.payload as Record<string, unknown>) || {});
      })
      .catch(apiCatchGlobalHandler)
      .finally(() => setLoading(false));
  }, [id]);

  const goBack = () => navigate("/template-examples/data-table");

  const handleSubmit = (values?: Record<string, unknown>) => {
    const payload = values || {};
    const request =
      mode === "create"
        ? service.post("/support/users", payload)
        : service.put(`/support/users/${id}`, payload);

    request.then(goBack).catch(apiCatchGlobalHandler);
  };

  const handleDelete = () => {
    if (!id) return;
    service.delete(`/support/users/${id}`).then(goBack).catch(apiCatchGlobalHandler);
  };

  return (
    <PageTemplate title={title} breadcrumbs={pageBreadcrumbs}>
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {mode === "delete" ? (
            <div className="d-flex flex-column gap-3">
              <p className="mb-0">{t("Auth.TemplateExamples.DataTable.DeletePrompt")}</p>
              <div className="d-flex gap-2 justify-content-end">
                <Button color="secondary" onClick={goBack}>
                  {t("Global.Labels.Back")}
                </Button>
                <Button color="danger" onClick={handleDelete}>
                  {t("Global.Labels.Delete", { item: singleItem })}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <Form
                inputs={() =>
                  inputs(t).map((item) => ({
                    ...item,
                    disabled: mode === "view" || item.name === "id",
                    double: true,
                  }))
                }
                initialValues={initialValues}
                onFormSubmit={mode === "view" ? undefined : handleSubmit}
                loading={loading}
              />

              <div className="d-flex gap-2 justify-content-end mt-3">
                {mode === "view" && id ? (
                  <>
                    <Button color="warning" onClick={() => navigate(`?mode=edit`)}>
                      {t("Global.Form.Labels.Edit")}
                    </Button>
                    <Button color="danger" onClick={() => navigate(`?mode=delete`)}>
                      {t("Global.Form.Labels.Delete")}
                    </Button>
                  </>
                ) : null}
                <Button color="secondary" onClick={goBack}>
                  {t("Global.Labels.Back")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default TemplateDataTableRecordView;
