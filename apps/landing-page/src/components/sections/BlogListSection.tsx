export default function BlogListSection({
  title,
  subtitle,
  content,
}: {
  title?: string;
  subtitle?: string;
  content?: Record<string, unknown>;
}) {
  const posts = content.posts || [];
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="row g-3">
          {posts.map((p: Record<string, unknown>) => (
            <div key={p.id} className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5>{p.title}</h5>
                  <p>{p.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
