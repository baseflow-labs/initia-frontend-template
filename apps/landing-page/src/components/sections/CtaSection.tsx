type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };

const CtaSection = ({ title, subtitle, content }: Props) => {
  const heading = String(content?.heading || title || "");
  const description = String(content?.description || "");
  const buttonLink = String(content?.buttonLink || "#");
  const buttonText = String(content?.buttonText || "Get Started");

  return (
    <section className="py-5">
      <div className="container text-center">
        <h2>{heading}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
        <p>{description}</p>
        <a className="btn btn-primary" href={buttonLink}>
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
