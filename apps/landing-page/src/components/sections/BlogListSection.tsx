type Post = { id: string; title: string; excerpt: string };
type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };

const getPosts = (content?: Record<string, unknown>): Post[] => {
  const raw = content?.posts;
  if (!Array.isArray(raw)) return [];
  return raw.map((p, idx) => {
    const obj = typeof p === "object" && p !== null ? (p as Record<string, unknown>) : {};
    return {
      id: String(obj.id || idx),
      title: String(obj.title || ""),
      excerpt: String(obj.excerpt || ""),
    };
  });
};

const BlogListSection = ({ title, subtitle, content }: Props) => {
  const posts = getPosts(content);
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="row g-3">
          {posts.map((p) => (
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
};

export default BlogListSection;
