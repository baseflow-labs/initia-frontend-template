"use client";

import { FAQContent } from "@/types/landing";
import { useState } from "react";

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  content: FAQContent;
}

export default function FAQSection({ title, subtitle, content }: FAQSectionProps) {
  const { faqs } = content;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="accordion-item border mb-3 rounded">
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${openIndex === index ? "" : "collapsed"}`}
                      type="button"
                      onClick={() => toggleFAQ(index)}
                    >
                      <strong>{faq.question}</strong>
                    </button>
                  </h3>
                  <div
                    className={`accordion-collapse collapse ${openIndex === index ? "show" : ""}`}
                  >
                    <div className="accordion-body">
                      <p className="mb-0 text-muted">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
