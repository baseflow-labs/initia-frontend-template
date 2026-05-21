import CarouselSection from "./CarouselSection";
export default function BlogCarouselSection({ title, subtitle, content }: any) {
  return (
    <CarouselSection
      title={title}
      subtitle={subtitle}
      content={{
        slides: (content.posts || []).map((p: any) => ({
          title: p.title,
          description: p.excerpt,
          image: p.image,
        })),
      }}
    />
  );
}
