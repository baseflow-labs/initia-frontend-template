type Block = { title: string; text: string };
type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };
const getBlocks = (content?: Record<string, unknown>): Block[] => {
  const raw = content?.blocks;
  if (!Array.isArray(raw)) return [];
  return raw.map((b) => {
    const obj = typeof b === "object" && b !== null ? (b as Record<string, unknown>) : {};
    return { title: String(obj.title || ""), text: String(obj.text || "") };
  });
};
export default function TextBlocksSection({ title, subtitle, content }: Props) {
  const blocks = getBlocks(content);
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        {blocks.map((b, i) => (
          <article key={i} className="mb-3">
            <h4>{b.title}</h4>
            <p>{b.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
