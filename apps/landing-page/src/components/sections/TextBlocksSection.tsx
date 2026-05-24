export default function TextBlocksSection({
  title,
  subtitle,
  content,
}: {
  title?: string;
  subtitle?: string;
  content?: Record<string, unknown>;
}) {
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        {(content.blocks || []).map((b: Record<string, unknown>, i: number) => (
          <article key={i} className="mb-3">
            <h4>{b.title}</h4>
            <p>{b.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
