export default function CarouselSection({
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
          {(content.slides || []).map((s: Record<string, unknown>, i: number) => (
            <div key={i} className="col-md-4">
              <div className="card">
                <img src={s.image} className="card-img-top" alt={s.title} />
                <div className="card-body">
                  <h5>{s.title}</h5>
                  <p>{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
