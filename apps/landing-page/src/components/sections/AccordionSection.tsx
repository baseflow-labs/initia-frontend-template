export default function AccordionSection({
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
        {(content.items || []).map((it: Record<string, unknown>, i: number) => (
          <details key={i} className="mb-2">
            <summary>{it.title}</summary>
            <p>{it.content}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
