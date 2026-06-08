type Item = { image: string; title: string };
type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };
const getItems = (content?: Record<string, unknown>): Item[] => {
  const raw = content?.items;
  if (!Array.isArray(raw)) return [];
  return raw.map((x) => {
    const obj = typeof x === "object" && x !== null ? (x as Record<string, unknown>) : {};
    return { image: String(obj.image || ""), title: String(obj.title || "image") };
  });
};
const ImageBlocksSection = ({ title, subtitle, content }: Props) => {
  const items = getItems(content);
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="row g-3">
          {items.map((x, i) => (
            <div key={i} className="col-md-4">
              <img src={x.image} alt={x.title} className="img-fluid rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageBlocksSection;
