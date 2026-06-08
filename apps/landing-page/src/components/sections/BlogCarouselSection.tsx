import CarouselSection from "./CarouselSection";

type Props = { title?: string; subtitle?: string; content?: Record<string, unknown> };

const BlogCarouselSection = ({ title, subtitle, content }: Props) => {
  const posts = Array.isArray(content?.posts) ? content?.posts : [];
  const slides = posts.map((p) => {
    const obj = typeof p === "object" && p !== null ? (p as Record<string, unknown>) : {};
    return {
      title: String(obj.title || ""),
      description: String(obj.excerpt || ""),
      image: String(obj.image || ""),
    };
  });

  return <CarouselSection title={title} subtitle={subtitle} content={{ slides }} />;
};

export default BlogCarouselSection;
