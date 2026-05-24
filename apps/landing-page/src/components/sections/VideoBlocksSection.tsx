export default function VideoBlocksSection({
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
          {(content.videos || []).map((v: Record<string, unknown>, i: number) => (
            <div key={i} className="col-md-6">
              <div className="ratio ratio-16x9">
                <iframe src={v.url} title={v.title || `video-${i}`} allowFullScreen />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
