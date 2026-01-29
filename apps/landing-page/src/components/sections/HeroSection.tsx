import { HeroContent } from "@/types/landing";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  content: HeroContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  const {
    heading,
    subheading,
    backgroundImage,
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
  } = content;

  return (
    <section
      className="hero-section position-relative d-flex align-items-center justify-content-center text-center py-5"
      style={{
        minHeight: "600px",
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
        style={{ opacity: 0.5 }}
      ></div>
      <div className="container position-relative text-white" style={{ zIndex: 1 }}>
        <h1 className="display-3 fw-bold mb-4">{heading}</h1>
        {subheading && <p className="lead fs-4 mb-5">{subheading}</p>}
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          {ctaText && ctaLink && (
            <a href={ctaLink} className="btn btn-primary btn-lg">
              {ctaText}
            </a>
          )}
          {secondaryCtaText && secondaryCtaLink && (
            <a href={secondaryCtaLink} className="btn btn-outline-light btn-lg">
              {secondaryCtaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
