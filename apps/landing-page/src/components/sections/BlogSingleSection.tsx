type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };

export default function BlogSingleSection({ title, subtitle, content }: Props) {
  const heading = String(content?.title || "");
  const excerpt = String(content?.excerpt || "");
  const body = String(content?.content || "");
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <article>
          <h3>{heading}</h3>
          <p>{excerpt}</p>
          <div style={{ whiteSpace: "pre-wrap" }}>{body}</div>
        </article>
      </div>
    </section>
  );
}
