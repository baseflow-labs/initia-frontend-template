type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };
export default function PromptInputSection({ title, subtitle, content }: Props) {
  const placeholder = String(content?.placeholder || "");
  const submitText = String(content?.submitText || "Send");
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="input-group">
          <input readOnly className="form-control" placeholder={placeholder} />
          <button className="btn btn-primary">{submitText}</button>
        </div>
      </div>
    </section>
  );
}
