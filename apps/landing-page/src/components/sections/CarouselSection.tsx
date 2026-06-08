type Slide = { image: string; title: string; description: string };
type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };

const getSlides = (content?: Record<string, unknown>): Slide[] => {
  const raw = content?.slides;
  if (!Array.isArray(raw)) return [];
  return raw.map((s) => {
    const obj = typeof s === "object" && s !== null ? (s as Record<string, unknown>) : {};
    return {
      image: String(obj.image || ""),
      title: String(obj.title || ""),
      description: String(obj.description || ""),
    };
  });
};

const CarouselSection = ({ title, subtitle, content }: Props) => {
  const slides = getSlides(content);
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="row g-3">
          {slides.map((s, i) => (
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
};

export default CarouselSection;
