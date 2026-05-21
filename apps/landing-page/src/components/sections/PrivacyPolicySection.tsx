export default function PrivacyPolicySection({ title, subtitle, content }: any) {
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
