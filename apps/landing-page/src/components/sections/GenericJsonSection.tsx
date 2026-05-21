interface GenericJsonSectionProps {
  title: string;
  subtitle?: string;
  content: Record<string, unknown>;
}

export default function GenericJsonSection({ title, subtitle, content }: GenericJsonSectionProps) {
  return (
    <section className="py-5 border-top">
      <div className="container">
        <h2 className="mb-2">{title}</h2>
        {subtitle ? <p className="text-muted mb-4">{subtitle}</p> : null}
        <pre className="p-3 bg-light rounded" style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
    </section>
  );
}
