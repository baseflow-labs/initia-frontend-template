export default function FooterContentSection({
  title,
  subtitle,
  content,
}: {
  title?: string;
  subtitle?: string;
  content?: Record<string, unknown>;
}) {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <p>{content.copyright}</p>
        <div className="d-flex gap-3 flex-wrap">
          {(content.links || []).map((l: Record<string, unknown>, i: number) => (
            <a key={i} href={l.url}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
