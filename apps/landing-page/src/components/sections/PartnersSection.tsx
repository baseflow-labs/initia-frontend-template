export default function PartnersSection({
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
        <div className="row g-3">
          {(content.items || []).map((x: Record<string, unknown>, i: number) => (
            <div key={i} className="col-md-3">
              <img src={x.image} alt={x.title || "partner"} className="img-fluid" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
