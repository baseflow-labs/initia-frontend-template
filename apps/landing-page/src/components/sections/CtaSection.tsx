export default function CtaSection({ title, subtitle, content }: any) {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h2>{content.heading || title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <p>{content.description}</p>
        <a className="btn btn-primary" href={content.buttonLink || "#"}>
          {content.buttonText || "Get Started"}
        </a>
      </div>
    </section>
  );
}
