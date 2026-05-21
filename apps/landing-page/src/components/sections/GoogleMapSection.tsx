export default function GoogleMapSection({ title, subtitle, content }: any) {
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="ratio ratio-16x9">
          <iframe src={content.embedUrl} title="map" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
