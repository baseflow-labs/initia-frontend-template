type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };
const PrivacyPolicySection = ({ title, subtitle, content }: Props) => {
  const text = String(content?.content || "");
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div style={{ whiteSpace: "pre-wrap" }}>{text}</div>
      </div>
    </section>
  );
};

export default PrivacyPolicySection;
