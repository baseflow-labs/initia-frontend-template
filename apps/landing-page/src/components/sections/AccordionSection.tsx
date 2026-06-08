type Item = { title: string; content: string };

type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };

const getItems = (content?: Record<string, unknown>): Item[] => {
  const raw = content?.items;
  if (!Array.isArray(raw)) return [];
  return raw.map((it) => {
    const obj = typeof it === "object" && it !== null ? (it as Record<string, unknown>) : {};
    return { title: String(obj.title || ""), content: String(obj.content || "") };
  });
};

const AccordionSection = ({ title, subtitle, content }: Props) => {
  const items = getItems(content);
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        {items.map((it, i) => (
          <details key={i} className="mb-2">
            <summary>{it.title}</summary>
            <p>{it.content}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default AccordionSection;
