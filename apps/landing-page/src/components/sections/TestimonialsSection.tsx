"use client";
import { useState } from "react";

import { TestimonialsContent } from "@/types/landing";

interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  content: TestimonialsContent;
}

export default function TestimonialsSection({
  title,
  subtitle,
  content,
}: TestimonialsSectionProps) {
  const { variant = "fixed", layout = "horizontal", testimonials } = content;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "text-warning" : "text-muted"}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (variant === "slider") {
    const testimonial = testimonials[currentIndex];
    return (
      <section className="testimonials-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">{title}</h2>
            {subtitle && <p className="lead text-muted">{subtitle}</p>}
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4">
                <div className="card-body text-center">
                  {renderStars(testimonial.rating)}
                  <p className="fs-5 mb-4 fst-italic">&ldquo;{testimonial.content}&rdquo;</p>
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-circle mb-3"
                      width="80"
                      height="80"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <h4 className="mb-1">{testimonial.name}</h4>
                  {testimonial.role && <p className="text-muted mb-0">{testimonial.role}</p>}
                  {testimonial.company && <p className="text-muted">{testimonial.company}</p>}
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  className="btn btn-outline-secondary rounded-circle"
                  onClick={prevTestimonial}
                >
                  ←
                </button>
                <button
                  className="btn btn-outline-secondary rounded-circle"
                  onClick={nextTestimonial}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div
          className={`row g-4 ${layout === "vertical" ? "row-cols-1" : "row-cols-1 row-cols-md-2 row-cols-lg-3"}`}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  {renderStars(testimonial.rating)}
                  <p className="mb-3 fst-italic">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="d-flex align-items-center">
                    {testimonial.avatar && (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        width="50"
                        height="50"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <h5 className="mb-0">{testimonial.name}</h5>
                      {testimonial.role && <small className="text-muted">{testimonial.role}</small>}
                      {testimonial.company && (
                        <small className="text-muted d-block">{testimonial.company}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
