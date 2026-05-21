export default function SocialLinksSection({ title, subtitle, content }: any) {
  return (
    <section className="py-5">
      <div className="container">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <div className="d-flex gap-2 flex-wrap">
          {(content.links || []).map((l: any, i: number) => (
            <a key={i} className="btn btn-outline-secondary" href={l.url}>
              {l.platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
