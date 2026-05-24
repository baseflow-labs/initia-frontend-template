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
import AccordionSection from "./AccordionSection";
import BlogCarouselSection from "./BlogCarouselSection";
import BlogListSection from "./BlogListSection";
import BlogSingleSection from "./BlogSingleSection";
import CarouselSection from "./CarouselSection";
import ChatPromptSection from "./ChatPromptSection";
import CtaSection from "./CtaSection";
import FooterContentSection from "./FooterContentSection";
import GoogleMapSection from "./GoogleMapSection";
import ImageBlocksSection from "./ImageBlocksSection";
import PartnersSection from "./PartnersSection";
import PrivacyPolicySection from "./PrivacyPolicySection";
import PromptInputSection from "./PromptInputSection";
import SocialLinksSection from "./SocialLinksSection";
import TermsOfServiceSection from "./TermsOfServiceSection";
import TextBlocksSection from "./TextBlocksSection";
import VideoBlocksSection from "./VideoBlocksSection";

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
    case "cta":
      return (
        <CtaSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "privacy_policy":
      return (
        <PrivacyPolicySection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "terms_of_service":
      return (
        <TermsOfServiceSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "footer":
      return (
        <FooterContentSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "prompt_input":
      return (
        <PromptInputSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "chat_prompt":
      return (
        <ChatPromptSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "partners":
      return (
        <PartnersSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "text_blocks":
      return (
        <TextBlocksSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "carousel":
      return (
        <CarouselSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "image_blocks":
      return (
        <ImageBlocksSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "video_blocks":
      return (
        <VideoBlocksSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "social_links":
      return (
        <SocialLinksSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "accordion":
      return (
        <AccordionSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "google_map":
      return (
        <GoogleMapSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "blog_single":
      return (
        <BlogSingleSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "blog_list":
      return (
        <BlogListSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    case "blog_carousel":
      return (
        <BlogCarouselSection
          title={title}
          subtitle={subtitle}
          content={content as Record<string, unknown>}
        />
      );
    default:
      // Unknown section type - silently skip rendering
      return null;
  }
}
