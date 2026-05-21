export default function BlogSingleSection({ title, subtitle, content }: any) {
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <article>
          <h3>{content.title}</h3>
          <p>{content.excerpt}</p>
          <div style={{ whiteSpace: "pre-wrap" }}>{content.content}</div>
        </article>
      </div>
    </section>
  );
}
