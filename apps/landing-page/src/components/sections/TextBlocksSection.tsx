export default function TextBlocksSection({ title, subtitle, content }: any) {
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        {(content.blocks || []).map((b: any, i: number) => (
          <article key={i} className="mb-3">
            <h4>{b.title}</h4>
            <p>{b.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
