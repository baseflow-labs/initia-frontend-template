export default function ImageBlocksSection({ title, subtitle, content }: any) {
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="row g-3">
          {(content.items || []).map((x: any, i: number) => (
            <div key={i} className="col-md-4">
              <img src={x.image} alt={x.title || "image"} className="img-fluid rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
