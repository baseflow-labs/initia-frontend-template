type Video = { url: string; title: string };
type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };
const getVideos = (content?: Record<string, unknown>): Video[] => {
  const raw = content?.videos;
  if (!Array.isArray(raw)) return [];
  return raw.map((v, i) => {
    const obj = typeof v === "object" && v !== null ? (v as Record<string, unknown>) : {};
    return { url: String(obj.url || ""), title: String(obj.title || `video-${i}`) };
  });
};
export default function VideoBlocksSection({ title, subtitle, content }: Props) {
  const videos = getVideos(content);
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="row g-3">
          {videos.map((v, i) => (
            <div key={i} className="col-md-6">
              <div className="ratio ratio-16x9">
                <iframe src={v.url} title={v.title} allowFullScreen />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
