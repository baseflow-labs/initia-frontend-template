type LinkItem = { url: string; label: string };
type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };

const getLinks = (content?: Record<string, unknown>): LinkItem[] => {
  const raw = content?.links;
  if (!Array.isArray(raw)) return [];
  return raw.map((l) => {
    const obj = typeof l === "object" && l !== null ? (l as Record<string, unknown>) : {};
    return { url: String(obj.url || "#"), label: String(obj.label || "") };
  });
};

const FooterContentSection = ({ title, subtitle, content }: Props) => {
  const links = getLinks(content);
  const copyright = String(content?.copyright || "");
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <p>{copyright}</p>
        <div className="d-flex gap-3 flex-wrap">
          {links.map((l, i) => (
            <a key={i} href={l.url}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FooterContentSection;
