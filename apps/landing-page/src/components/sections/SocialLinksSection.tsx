type LinkItem = { url: string; platform: string };
type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };
const getLinks = (content?: Record<string, unknown>): LinkItem[] => {
  const raw = content?.links;
  if (!Array.isArray(raw)) return [];
  return raw.map((l) => {
    const obj = typeof l === "object" && l !== null ? (l as Record<string, unknown>) : {};
    return { url: String(obj.url || "#"), platform: String(obj.platform || "Link") };
  });
};
export default function SocialLinksSection({ title, subtitle, content }: Props) {
  const links = getLinks(content);
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="d-flex gap-2 flex-wrap">
          {links.map((l, i) => (
            <a key={i} className="btn btn-outline-secondary" href={l.url}>
              {l.platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
