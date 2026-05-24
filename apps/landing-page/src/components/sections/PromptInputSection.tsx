export default function PromptInputSection({
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
        <div className="input-group">
          <input readOnly className="form-control" placeholder={content.placeholder} />
          <button className="btn btn-primary">{content.submitText || "Send"}</button>
        </div>
      </div>
    </section>
  );
}
