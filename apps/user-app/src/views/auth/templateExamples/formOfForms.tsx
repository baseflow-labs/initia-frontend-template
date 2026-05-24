import Form from "@initia/shared/ui/components/form";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { getForms, submitFormAnswer } from "../../../api/formOfForms";

interface FormRecord {
  id: string;
  title: string;
  description?: string;
}

const FormOfFormsView = () => {
  const { t } = useTranslation();
  const [forms, setForms] = useState<FormRecord[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>("");

  useEffect(() => {
    getForms().then((res) => {
      const payload = (res.payload || []) as FormRecord[];
      setForms(payload);
      if (payload.length && !selectedFormId) setSelectedFormId(payload[0].id);
    });
  }, []);

  const selectedForm = useMemo(
    () => forms.find((f) => f.id === selectedFormId),
    [forms, selectedFormId]
  );

  return (
    <PageTemplate title={t("Auth.TemplateExamples.FormsOfForms.Title", "Form of Forms")}>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <label className="form-label fw-bold">
            {t("Auth.TemplateExamples.FormsOfForms.Select", "Select Form")}
          </label>
          <select
            className="form-select"
            value={selectedFormId}
            onChange={(e) => setSelectedFormId(e.target.value)}
          >
            {forms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title}
              </option>
            ))}
          </select>
          {selectedForm?.description && (
            <p className="text-muted mt-2 mb-0">{selectedForm.description}</p>
          )}
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <Form
            onFormSubmit={(values) =>
              submitFormAnswer({ formId: selectedFormId, data: values || {} })
            }
            inputs={() => [
              {
                name: "fullName",
                label: t("Global.Form.Labels.FullName", "Full Name"),
                type: "text",
                required: true,
                double: true,
              },
              {
                name: "email",
                label: t("Global.Form.Labels.Email", "Email"),
                type: "email",
                required: true,
                double: true,
              },
              {
                name: "notes",
                label: t("Global.Form.Labels.Notes", "Notes"),
                type: "textarea",
                required: false,
                rows: 6,
              },
            ]}
          />
        </div>
      </div>
    </PageTemplate>
  );
};

export default FormOfFormsView;
