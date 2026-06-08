interface GoogleMapSectionProps {
  title?: string;
  subtitle?: string;
  content?: {
    embedUrl?: string;
  };
}

const GoogleMapSection = ({ title, subtitle, content }: GoogleMapSectionProps) => {
  const embedUrl = typeof content?.embedUrl === "string" ? content.embedUrl.trim() : "";

  if (!embedUrl) {
    return null;
  }

  return (
    <section className="py-5">
      <div className="container">
        {title ? <h2>{title}</h2> : null}
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="ratio ratio-16x9">
          <iframe src={embedUrl} title="map" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;
