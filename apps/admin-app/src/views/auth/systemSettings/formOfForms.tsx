import Button from "@initia/shared/ui/components/core/button";
import Form from "@initia/shared/ui/components/form";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { createForm, deleteForm, getForms, updateForm } from "../../../api/formOfForms";

interface FormRecord {
  id: string;
  title: string;
  description?: string;
}

const AdminFormOfFormsView = () => {
  const { t } = useTranslation();
  const [forms, setForms] = useState<FormRecord[]>([]);
  const [editing, setEditing] = useState<FormRecord | null>(null);

  const load = async () => {
    const res = await getForms();
    setForms((res.payload || []) as FormRecord[]);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <PageTemplate title={t("Auth.Settings.Admin.FormsOfForms.Title", "Form of Forms")}>
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6 className="mb-3">{editing ? "Update Form" : "Create Form"}</h6>
          <Form
            initialValues={editing || { title: "", description: "" }}
            onFormSubmit={async (values) => {
              if (editing?.id) {
                await updateForm(editing.id, values || {});
              } else {
                await createForm(values || {});
              }
              setEditing(null);
              await load();
            }}
            inputs={() => [
              { name: "title", label: "Title", type: "text", required: true, fullWidth: true },
              {
                name: "description",
                label: "Description",
                type: "textarea",
                required: false,
                rows: 4,
                fullWidth: true,
              },
            ]}
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="mb-3">Existing Forms</h6>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th style={{ width: 220 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form) => (
                  <tr key={form.id}>
                    <td>{form.title}</td>
                    <td>{form.description || "-"}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button size="sm" onClick={() => setEditing(form)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={async () => {
                            await deleteForm(form.id, false);
                            await load();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AdminFormOfFormsView;
