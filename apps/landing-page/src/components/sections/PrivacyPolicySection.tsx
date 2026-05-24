export default function PrivacyPolicySection({
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
        <div style={{ whiteSpace: "pre-wrap" }}>{content.content}</div>
      </div>
    </section>
  );
}
