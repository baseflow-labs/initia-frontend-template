/**
 * Example API Mock Server for Testing Landing Pages
 *
 * This is a simple Express server that provides mock data for the landing page.
 * In production, replace this with your actual backend API.
 *
 * To run:
 * 1. npm install express cors
 * 2. node examples/mock-api-server.js
 */

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mockData = {
  pages: [
    {
      id: "1",
      slug: "home",
      title: "Home",
      metadata: {
        title: "Welcome to Our Amazing Platform",
        description: "Build, deploy, and scale your applications with ease",
        keywords: "platform, saas, cloud, development",
        ogImage: "https://via.placeholder.com/1200x630",
        ogTitle: "Our Amazing Platform",
        ogDescription: "The best platform for modern developers",
      },
      sections: [
        {
          id: "s1",
          title: "Welcome",
          type: "hero",
          order: 1,
          content: {
            heading: "Build Your Next Big Thing",
            subheading: "The all-in-one platform for modern teams to collaborate and ship faster",
            backgroundImage: "https://via.placeholder.com/1920x1080",
            ctaText: "Get Started Free",
            ctaLink: "/signup",
            secondaryCtaText: "Watch Demo",
            secondaryCtaLink: "#demo",
          },
        },
        {
          id: "s2",
          title: "Features",
          subtitle: "Everything you need to succeed",
          type: "features",
          order: 2,
          content: {
            variant: "horizontal",
            features: [
              {
                id: "f1",
                title: "Lightning Fast",
                description: "Optimized performance that scales with your needs",
                icon: "⚡",
              },
              {
                id: "f2",
                title: "Secure by Default",
                description: "Enterprise-grade security to protect your data",
                icon: "🔒",
              },
              {
                id: "f3",
                title: "Easy Integration",
                description: "Connect with your existing tools seamlessly",
                icon: "🔌",
              },
              {
                id: "f4",
                title: "Real-time Collaboration",
                description: "Work together with your team in real-time",
                icon: "👥",
              },
              {
                id: "f5",
                title: "Analytics & Insights",
                description: "Make data-driven decisions with powerful analytics",
                icon: "📊",
              },
              {
                id: "f6",
                title: "24/7 Support",
                description: "Our team is here to help you anytime",
                icon: "🎧",
              },
            ],
          },
        },
        {
          id: "s3",
          title: "Pricing",
          subtitle: "Choose the perfect plan for your needs",
          type: "pricing",
          order: 3,
          content: {
            plans: [
              {
                id: "p1",
                name: "Starter",
                price: "$9",
                interval: "month",
                description: "Perfect for individuals and small teams",
                features: [
                  "Up to 5 team members",
                  "10GB storage",
                  "Basic analytics",
                  "Email support",
                ],
                ctaText: "Start Free Trial",
                ctaLink: "/signup?plan=starter",
              },
              {
                id: "p2",
                name: "Professional",
                price: "$29",
                interval: "month",
                description: "For growing teams and businesses",
                features: [
                  "Up to 20 team members",
                  "100GB storage",
                  "Advanced analytics",
                  "Priority support",
                  "Custom integrations",
                ],
                highlighted: true,
                ctaText: "Start Free Trial",
                ctaLink: "/signup?plan=pro",
              },
              {
                id: "p3",
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Unlimited team members",
                  "Unlimited storage",
                  "Enterprise analytics",
                  "Dedicated support",
                  "Custom integrations",
                  "SLA guarantee",
                ],
                ctaText: "Contact Sales",
                ctaLink: "/contact-sales",
              },
            ],
          },
        },
        {
          id: "s4",
          title: "What Our Customers Say",
          subtitle: "Join thousands of happy customers",
          type: "testimonials",
          order: 4,
          content: {
            variant: "fixed",
            layout: "horizontal",
            testimonials: [
              {
                id: "t1",
                name: "Sarah Johnson",
                role: "CEO",
                company: "TechCorp",
                avatar: "https://via.placeholder.com/100",
                content: "This platform has transformed how we work. Highly recommended!",
                rating: 5,
              },
              {
                id: "t2",
                name: "Michael Chen",
                role: "CTO",
                company: "StartupXYZ",
                avatar: "https://via.placeholder.com/100",
                content: "The best investment we made this year. Our productivity skyrocketed.",
                rating: 5,
              },
              {
                id: "t3",
                name: "Emily Davis",
                role: "Product Manager",
                company: "InnovateCo",
                avatar: "https://via.placeholder.com/100",
                content: "Intuitive, powerful, and reliable. Everything we needed in one place.",
                rating: 5,
              },
            ],
          },
        },
        {
          id: "s5",
          title: "Frequently Asked Questions",
          type: "faq",
          order: 5,
          content: {
            faqs: [
              {
                id: "faq1",
                question: "How does the free trial work?",
                answer: "You get full access to all features for 14 days, no credit card required.",
              },
              {
                id: "faq2",
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time with no penalties.",
              },
              {
                id: "faq3",
                question: "Is my data secure?",
                answer:
                  "Absolutely. We use industry-standard encryption and security practices to protect your data.",
              },
              {
                id: "faq4",
                question: "Do you offer support?",
                answer:
                  "Yes, all plans include email support. Professional and Enterprise plans get priority support.",
              },
            ],
          },
        },
        {
          id: "s6",
          title: "Get in Touch",
          subtitle: "We'd love to hear from you",
          type: "contact",
          order: 6,
          content: {
            email: "hello@example.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main Street, San Francisco, CA 94102",
            socialLinks: [
              { platform: "Twitter", url: "https://twitter.com/example" },
              { platform: "LinkedIn", url: "https://linkedin.com/company/example" },
              { platform: "GitHub", url: "https://github.com/example" },
            ],
          },
        },
      ],
    },
    {
      id: "2",
      slug: "about",
      title: "About Us",
      metadata: {
        title: "About Our Company",
        description: "Learn about our mission, vision, and the team behind our platform",
        keywords: "about, company, team, mission",
      },
      sections: [
        {
          id: "as1",
          title: "About Our Company",
          subtitle: "Building the future of collaboration",
          type: "about",
          order: 1,
          content: {
            content:
              "<p>We started with a simple mission: make collaboration easier for teams everywhere. Today, we serve thousands of customers across the globe.</p><p>Our platform combines powerful features with intuitive design to help teams work better together.</p>",
            statistics: [
              { id: "stat1", label: "Active Users", value: "50K+" },
              { id: "stat2", label: "Countries", value: "120+" },
              { id: "stat3", label: "Customer Satisfaction", value: "98%" },
            ],
            image: "https://via.placeholder.com/600x400",
          },
        },
        {
          id: "as2",
          title: "Our Team",
          subtitle: "Meet the people behind the platform",
          type: "team",
          order: 2,
          content: {
            members: [
              {
                id: "tm1",
                name: "John Smith",
                role: "CEO & Co-Founder",
                bio: "Passionate about building products that make a difference",
                avatar: "https://via.placeholder.com/150",
                socialLinks: [
                  { platform: "LinkedIn", url: "https://linkedin.com" },
                  { platform: "Twitter", url: "https://twitter.com" },
                ],
              },
              {
                id: "tm2",
                name: "Jane Doe",
                role: "CTO & Co-Founder",
                bio: "Technology enthusiast with 15 years of experience",
                avatar: "https://via.placeholder.com/150",
                socialLinks: [
                  { platform: "LinkedIn", url: "https://linkedin.com" },
                  { platform: "GitHub", url: "https://github.com" },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

// API endpoint
app.get("/api/landing-pages", (req, res) => {
  res.json(mockData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
  console.log(`Landing pages endpoint: http://localhost:${PORT}/api/landing-pages`);
});
