export interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  metadata: PageMetadata;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  type: SectionType;
  content: SectionContent;
  order?: number;
}

export type SectionType =
  | "hero"
  | "features"
  | "pricing"
  | "faq"
  | "testimonials"
  | "blog"
  | "contact"
  | "clients"
  | "team"
  | "about"
  | "how_it_works"
  | "demo_request"
  | "careers";

export type SectionContent =
  | HeroContent
  | FeaturesContent
  | PricingContent
  | FAQContent
  | TestimonialsContent
  | BlogContent
  | ContactContent
  | ClientsContent
  | TeamContent
  | AboutContent
  | HowItWorksContent
  | DemoRequestContent
  | CareersContent;

// Hero Section
export interface HeroContent {
  heading: string;
  subheading?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

// Features Section
export interface FeaturesContent {
  variant?: "horizontal" | "vertical";
  features: Feature[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

// Pricing Section
export interface PricingContent {
  plans: PricingPlan[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  interval?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

// FAQ Section
export interface FAQContent {
  faqs: FAQItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Testimonials Section
export interface TestimonialsContent {
  variant?: "slider" | "fixed";
  layout?: "horizontal" | "vertical";
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

// Blog Section
export interface BlogContent {
  variant?: "slider" | "fixed";
  numberOfPosts?: number;
  posts?: BlogPost[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  author?: string;
  date?: string;
  slug?: string;
}

// Contact Section
export interface ContactContent {
  email?: string;
  phone?: string;
  address?: string;
  mapLocation?: string;
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

// Clients/Partners Section
export interface ClientsContent {
  logos: ClientLogo[];
}

export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

// Team Section
export interface TeamContent {
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  socialLinks?: SocialLink[];
}

// About Section
export interface AboutContent {
  content: string;
  statistics?: Statistic[];
  image?: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: string;
}

// How It Works Section
export interface HowItWorksContent {
  steps: Step[];
}

export interface Step {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

// Demo Request Section
export interface DemoRequestContent {
  formFields: FormField[];
  submitText?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

// Careers Section
export interface CareersContent {
  jobOpenings: JobOpening[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type?: string;
  description?: string;
  applyLink?: string;
}

// API Response types
export interface LandingPagesResponse {
  pages: Page[];
}
