"use client";

import { BlogContent } from "@/types/landing";
import { useState } from "react";

interface BlogSectionProps {
  title: string;
  subtitle?: string;
  content: BlogContent;
}

export default function BlogSection({ title, subtitle, content }: BlogSectionProps) {
  const { variant = "fixed", posts = [] } = content;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  if (posts.length === 0) {
    return null;
  }

  if (variant === "slider") {
    const post = posts[currentIndex];
    return (
      <section className="blog-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">{title}</h2>
            {subtitle && <p className="lead text-muted">{subtitle}</p>}
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-img-top"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body p-4">
                  <h3 className="h3 mb-3">{post.title}</h3>
                  <p className="text-muted mb-3">{post.excerpt}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {post.author && `By ${post.author}`}
                      {post.date && ` • ${post.date}`}
                    </small>
                    {post.slug && (
                      <a href={`/blog/${post.slug}`} className="btn btn-primary btn-sm">
                        Read More
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-outline-secondary rounded-circle" onClick={prevPost}>
                  ←
                </button>
                <button className="btn btn-outline-secondary rounded-circle" onClick={nextPost}>
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
    <section className="blog-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-img-top"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h3 className="h5 mb-2">{post.title}</h3>
                  <p className="text-muted small mb-3">{post.excerpt}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {post.author && `${post.author}`}
                      {post.date && ` • ${post.date}`}
                    </small>
                    {post.slug && (
                      <a href={`/blog/${post.slug}`} className="btn btn-sm btn-primary">
                        Read
                      </a>
                    )}
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
