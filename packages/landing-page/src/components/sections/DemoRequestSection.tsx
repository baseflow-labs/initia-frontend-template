"use client";
import { DemoRequestContent } from "@/types/landing";
import { useState } from "react";

interface DemoRequestSectionProps {
  title: string;
  subtitle?: string;
  content: DemoRequestContent;
}

export default function DemoRequestSection({ title, subtitle, content }: DemoRequestSectionProps) {
  const { formFields, submitText = "Request Demo" } = content;
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission to your backend API
    // Example: await fetch('/api/demo-request', { method: 'POST', body: JSON.stringify(formData) })
  };

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const renderField = (field: (typeof formFields)[0]) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      placeholder: field.placeholder,
      required: field.required,
      className: "form-control",
      value: formData[field.name] || "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => handleChange(field.name, e.target.value),
    };

    switch (field.type) {
      case "textarea":
        return <textarea {...commonProps} rows={4} />;
      case "select":
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      default:
        return <input {...commonProps} type={field.type} />;
    }
  };

  return (
    <section className="demo-request-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    {formFields.map((field) => (
                      <div key={field.name} className="col-12">
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && <span className="text-danger"> *</span>}
                        </label>
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary btn-lg">
                      {submitText}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
