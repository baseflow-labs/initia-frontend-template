"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Clock, Mail, Phone } from "lucide-react";

import type { SystemIdentity } from "@/lib/api/identity";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const ContactForm = ({ identity }: { identity: SystemIdentity }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/support/contact-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const responseContentType = response.headers.get("content-type") || "";
        let details = response.statusText;

        if (responseContentType.includes("application/json")) {
          const errorPayload = (await response.json()) as { message?: string };
          if (errorPayload?.message) details = errorPayload.message;
        } else {
          const text = await response.text();
          if (text) details = text;
        }

        throw new Error(`Failed to submit contact form (${response.status}): ${details}`);
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred while submitting the form"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have a question or need assistance? Fill out the form below and we will get back to you
            as soon as possible.
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          {submitStatus === "success" && (
            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 font-semibold text-green-900">Thank you for contacting us!</h3>
              <p className="text-green-700">
                Your message has been received. We will get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-red-900">Error submitting form</h3>
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 text-center shadow">
            <Mail className="mx-auto mb-3 h-8 w-8 text-primary-600" />
            <h3 className="mb-2 font-semibold text-gray-900">Email</h3>
            <a
              href={`mailto:${identity.contactEmail || "support@example.com"}`}
              className="break-words text-gray-600 hover:text-primary-600"
            >
              {identity.contactEmail || "support@example.com"}
            </a>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow">
            <Phone className="mx-auto mb-3 h-8 w-8 text-primary-600" />
            <h3 className="mb-2 font-semibold text-gray-900">Phone</h3>
            {identity.phoneNumber ? (
              <a
                href={`tel:${identity.phoneNumber}`}
                className="text-gray-600 hover:text-primary-600"
              >
                {identity.phoneNumber}
              </a>
            ) : (
              <p className="text-gray-600">Available by email</p>
            )}
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow">
            <Clock className="mx-auto mb-3 h-8 w-8 text-primary-600" />
            <h3 className="mb-2 font-semibold text-gray-900">Website</h3>
            {identity.websiteUrl ? (
              <a
                href={identity.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="break-words text-gray-600 hover:text-primary-600"
              >
                {identity.websiteUrl}
              </a>
            ) : (
              <p className="text-gray-600">{identity.name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
