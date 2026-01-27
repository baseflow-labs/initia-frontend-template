"use client";
import { ContactContent } from "@/types/landing";
import { useState } from "react";

interface ContactSectionProps {
  title: string;
  subtitle?: string;
  content: ContactContent;
}

export default function ContactSection({ title, subtitle, content }: ContactSectionProps) {
  const { email, phone, address, mapLocation, socialLinks } = content;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission to your backend API
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h4 mb-4">Get in Touch</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <h3 className="h4 mb-4">Contact Information</h3>
                <div className="mb-3">
                  {email && (
                    <p>
                      <strong>Email:</strong>{" "}
                      <a href={`mailto:${email}`} className="text-decoration-none">
                        {email}
                      </a>
                    </p>
                  )}
                  {phone && (
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:${phone}`} className="text-decoration-none">
                        {phone}
                      </a>
                    </p>
                  )}
                  {address && (
                    <p>
                      <strong>Address:</strong> {address}
                    </p>
                  )}
                </div>

                {socialLinks && socialLinks.length > 0 && (
                  <div className="mt-4">
                    <h4 className="h5 mb-3">Follow Us</h4>
                    <div className="d-flex gap-2">
                      {socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {mapLocation && (
                  <div className="mt-4">
                    <iframe
                      src={mapLocation}
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="rounded"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
