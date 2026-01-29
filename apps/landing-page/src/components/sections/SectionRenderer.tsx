import {
  Section,
  HeroContent,
  FeaturesContent,
  PricingContent,
  FAQContent,
  TestimonialsContent,
  BlogContent,
  ContactContent,
  ClientsContent,
  TeamContent,
  AboutContent,
  HowItWorksContent,
  DemoRequestContent,
  CareersContent,
} from "@/types/landing";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
import TestimonialsSection from "./TestimonialsSection";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";
import ClientsSection from "./ClientsSection";
import TeamSection from "./TeamSection";
import AboutSection from "./AboutSection";
import HowItWorksSection from "./HowItWorksSection";
import DemoRequestSection from "./DemoRequestSection";
import CareersSection from "./CareersSection";

interface SectionRendererProps {
  section: Section;
}

export default function SectionRenderer({ section }: SectionRendererProps) {
  const { type, title, subtitle, content } = section;

  switch (type) {
    case "hero":
      return <HeroSection title={title} subtitle={subtitle} content={content as HeroContent} />;
    case "features":
      return (
        <FeaturesSection title={title} subtitle={subtitle} content={content as FeaturesContent} />
      );
    case "pricing":
      return (
        <PricingSection title={title} subtitle={subtitle} content={content as PricingContent} />
      );
    case "faq":
      return <FAQSection title={title} subtitle={subtitle} content={content as FAQContent} />;
    case "testimonials":
      return (
        <TestimonialsSection
          title={title}
          subtitle={subtitle}
          content={content as TestimonialsContent}
        />
      );
    case "blog":
      return <BlogSection title={title} subtitle={subtitle} content={content as BlogContent} />;
    case "contact":
      return (
        <ContactSection title={title} subtitle={subtitle} content={content as ContactContent} />
      );
    case "clients":
      return (
        <ClientsSection title={title} subtitle={subtitle} content={content as ClientsContent} />
      );
    case "team":
      return <TeamSection title={title} subtitle={subtitle} content={content as TeamContent} />;
    case "about":
      return <AboutSection title={title} subtitle={subtitle} content={content as AboutContent} />;
    case "how_it_works":
      return (
        <HowItWorksSection
          title={title}
          subtitle={subtitle}
          content={content as HowItWorksContent}
        />
      );
    case "demo_request":
      return (
        <DemoRequestSection
          title={title}
          subtitle={subtitle}
          content={content as DemoRequestContent}
        />
      );
    case "careers":
      return (
        <CareersSection title={title} subtitle={subtitle} content={content as CareersContent} />
      );
    default:
      // Unknown section type - silently skip rendering
      return null;
  }
}
