import CarouselSection from "./CarouselSection";
export default function BlogCarouselSection({
  title,
  subtitle,
  content,
}: {
  title?: string;
  subtitle?: string;
  content?: Record<string, unknown>;
}) {
  return (
    <CarouselSection
      title={title}
      subtitle={subtitle}
      content={{
        slides: (content.posts || []).map((p: Record<string, unknown>) => ({
          title: p.title,
          description: p.excerpt,
          image: p.image,
        })),
      }}
    />
  );
}
