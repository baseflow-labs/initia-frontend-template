import { Page, SystemMetadata } from "@/types/landing";

export const getMockSystemMetadataEN = (): SystemMetadata => ({
  name: "InnovateHub",
  logo: "https://www.trafongroup.com/wp-content/uploads/2019/04/logo-placeholder.png",
  slogan: "Transform Your Business with AI",
  favicon: "/favicon.ico",
  primaryColor: "#667eea",
  contactEmail: "hello@innovatehub.com",
  contactPhone: "+1 (888) 555-0100",
  socialLinks: {
    twitter: "https://twitter.com/innovatehub",
    linkedin: "https://linkedin.com/company/innovatehub",
    github: "https://github.com/innovatehub",
    facebook: "https://facebook.com/innovatehub",
    instagram: "https://instagram.com/innovatehub",
  },
});

export const getMockPagesEN = (): Page[] => [
  // ============================================
  // HOME PAGE
  // ============================================
  {
    id: "1",
    slug: "home",
    title: "Home",
    metadata: {
      title: "InnovateHub - Transform Your Business with AI-Powered Solutions",
      description:
        "Experience the future of business automation with InnovateHub. Our AI-powered platform helps teams collaborate, automate workflows, and scale effortlessly.",
      keywords:
        "AI platform, business automation, team collaboration, workflow management, SaaS solution",
      ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop",
      ogTitle: "InnovateHub - AI-Powered Business Platform",
      ogDescription:
        "Transform your business operations with intelligent automation and seamless collaboration.",
    },
    sections: [
      // 1. HERO SECTION
      {
        id: "s1",
        title: "Hero Banner",
        type: "hero",
        order: 1,
        content: {
          heading: "Transform Your Business with AI-Powered Innovation",
          subheading:
            "Join 50,000+ companies using InnovateHub to automate workflows, boost productivity, and scale their operations effortlessly.",
          backgroundImage:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
          ctaText: "Start Free Trial",
          ctaLink: "/signup",
          secondaryCtaText: "Watch Demo",
          secondaryCtaLink: "#demo",
        },
      },

      // 2. CLIENTS/PARTNERS SECTION
      {
        id: "s2",
        title: "Trusted by Industry Leaders",
        subtitle: "Join thousands of companies already using InnovateHub",
        type: "clients",
        order: 2,
        content: {
          logos: [
            {
              id: "c1",
              name: "TechCorp",
              logo: "https://via.placeholder.com/200x80/4F46E5/FFFFFF?text=TechCorp",
              url: "https://example.com",
            },
            {
              id: "c2",
              name: "DataFlow Inc",
              logo: "https://via.placeholder.com/200x80/7C3AED/FFFFFF?text=DataFlow",
              url: "https://example.com",
            },
            {
              id: "c3",
              name: "CloudSystems",
              logo: "https://via.placeholder.com/200x80/2563EB/FFFFFF?text=CloudSystems",
              url: "https://example.com",
            },
            {
              id: "c4",
              name: "AutomateNow",
              logo: "https://via.placeholder.com/200x80/059669/FFFFFF?text=AutomateNow",
              url: "https://example.com",
            },
            {
              id: "c5",
              name: "ScaleUp",
              logo: "https://via.placeholder.com/200x80/DC2626/FFFFFF?text=ScaleUp",
              url: "https://example.com",
            },
            {
              id: "c6",
              name: "InnovateTech",
              logo: "https://via.placeholder.com/200x80/EA580C/FFFFFF?text=InnovateTech",
              url: "https://example.com",
            },
          ],
        },
      },

      // 3. FEATURES SECTION
      {
        id: "s3",
        title: "Powerful Features for Modern Teams",
        subtitle: "Everything you need to supercharge your productivity",
        type: "features",
        order: 3,
        content: {
          variant: "horizontal",
          features: [
            {
              id: "f1",
              title: "AI-Powered Automation",
              description:
                "Let artificial intelligence handle repetitive tasks while you focus on what matters. Our smart automation adapts to your workflow.",
              icon: "🤖",
            },
            {
              id: "f2",
              title: "Real-Time Collaboration",
              description:
                "Work together seamlessly with your team across the globe. Share updates, files, and feedback instantly.",
              icon: "👥",
            },
            {
              id: "f3",
              title: "Advanced Analytics",
              description:
                "Make data-driven decisions with comprehensive insights. Track performance, identify trends, and optimize your operations.",
              icon: "📊",
            },
            {
              id: "f4",
              title: "Enterprise Security",
              description:
                "Bank-level encryption and compliance certifications keep your data safe. SOC 2, GDPR, and HIPAA compliant.",
              icon: "🔒",
            },
            {
              id: "f5",
              title: "Seamless Integrations",
              description:
                "Connect with 500+ tools you already use. Slack, Microsoft Teams, Salesforce, and more.",
              icon: "🔌",
            },
            {
              id: "f6",
              title: "24/7 Support",
              description:
                "Our expert team is available around the clock to help you succeed. Chat, email, or phone support.",
              icon: "🎧",
            },
          ],
        },
      },

      // 4. HOW IT WORKS SECTION
      {
        id: "s4",
        title: "How It Works",
        subtitle: "Get started in minutes, not months",
        type: "how_it_works",
        order: 4,
        content: {
          steps: [
            {
              id: "step1",
              title: "Sign Up & Set Up",
              description:
                "Create your account in 60 seconds. Our intelligent onboarding wizard guides you through initial setup and customization.",
              icon: "🚀",
            },
            {
              id: "step2",
              title: "Import Your Data",
              description:
                "Seamlessly migrate your existing workflows, documents, and team members. We support bulk imports from all major platforms.",
              icon: "📥",
            },
            {
              id: "step3",
              title: "Customize & Automate",
              description:
                "Configure automation rules, create custom workflows, and set up integrations with your favorite tools.",
              icon: "⚙️",
            },
            {
              id: "step4",
              title: "Collaborate & Scale",
              description:
                "Invite your team, assign tasks, and watch your productivity soar. Scale effortlessly as your business grows.",
              icon: "📈",
            },
          ],
        },
      },

      // 5. PRICING SECTION
      {
        id: "s5",
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the perfect plan for your team size and needs",
        type: "pricing",
        order: 5,
        content: {
          plans: [
            {
              id: "p1",
              name: "Starter",
              price: "$29",
              interval: "month",
              description: "Perfect for small teams and startups",
              features: [
                "Up to 10 team members",
                "50GB cloud storage",
                "Basic automation (100 tasks/month)",
                "Email support",
                "Mobile apps (iOS & Android)",
                "Standard integrations",
              ],
              ctaText: "Start Free Trial",
              ctaLink: "/signup?plan=starter",
            },
            {
              id: "p2",
              name: "Professional",
              price: "$99",
              interval: "month",
              description: "For growing businesses that need more power",
              features: [
                "Up to 50 team members",
                "500GB cloud storage",
                "Advanced automation (unlimited tasks)",
                "Priority email & chat support",
                "Custom workflows & templates",
                "Advanced analytics & reporting",
                "SSO & SAML authentication",
                "API access",
              ],
              highlighted: true,
              ctaText: "Start Free Trial",
              ctaLink: "/signup?plan=pro",
            },
            {
              id: "p3",
              name: "Enterprise",
              price: "Custom",
              description: "For large organizations with complex needs",
              features: [
                "Unlimited team members",
                "Unlimited storage",
                "Enterprise automation & AI",
                "Dedicated success manager",
                "Custom integrations & development",
                "Advanced security & compliance",
                "SLA guarantees (99.99% uptime)",
                "On-premise deployment option",
                "White-label solutions",
              ],
              ctaText: "Contact Sales",
              ctaLink: "/contact-sales",
            },
          ],
        },
      },

      // 6. TESTIMONIALS SECTION
      {
        id: "s6",
        title: "Loved by Teams Worldwide",
        subtitle: "See what our 50,000+ customers have to say",
        type: "testimonials",
        order: 6,
        content: {
          variant: "fixed",
          layout: "horizontal",
          testimonials: [
            {
              id: "t1",
              name: "Sarah Johnson",
              role: "CEO",
              company: "TechVentures Inc",
              avatar: "https://i.pravatar.cc/150?img=1",
              content:
                "InnovateHub transformed how our team works. We've reduced manual tasks by 80% and our productivity has never been higher. The ROI was immediate and substantial.",
              rating: 5,
            },
            {
              id: "t2",
              name: "Michael Chen",
              role: "CTO",
              company: "DataFlow Systems",
              avatar: "https://i.pravatar.cc/150?img=13",
              content:
                "The best investment we made this year. The AI automation is incredibly intelligent and the integrations work flawlessly. Our development cycle is now 3x faster.",
              rating: 5,
            },
            {
              id: "t3",
              name: "Emily Rodriguez",
              role: "Product Manager",
              company: "ScaleUp Solutions",
              avatar: "https://i.pravatar.cc/150?img=5",
              content:
                "Finally, a platform that actually delivers on its promises. The customer support is phenomenal, and the features keep getting better. We're never going back.",
              rating: 5,
            },
            {
              id: "t4",
              name: "David Park",
              role: "Operations Director",
              company: "GlobalTech Ltd",
              avatar: "https://i.pravatar.cc/150?img=12",
              content:
                "Implementation was smooth, training was easy, and adoption was instant. Our team loves it. We've saved hundreds of hours every month.",
              rating: 5,
            },
            {
              id: "t5",
              name: "Lisa Anderson",
              role: "Marketing Director",
              company: "BrandBoost Agency",
              avatar: "https://i.pravatar.cc/150?img=9",
              content:
                "The analytics and reporting features give us insights we never had before. We can now make data-driven decisions with confidence.",
              rating: 5,
            },
            {
              id: "t6",
              name: "James Wilson",
              role: "Founder",
              company: "StartupHub",
              avatar: "https://i.pravatar.cc/150?img=14",
              content:
                "As a startup, we needed something powerful yet affordable. InnovateHub checked all the boxes and then some. Highly recommended!",
              rating: 5,
            },
          ],
        },
      },

      // 7. ABOUT SECTION
      {
        id: "s7",
        title: "About InnovateHub",
        subtitle: "Building the future of work, one team at a time",
        type: "about",
        order: 7,
        content: {
          content: `
              <p>Founded in 2020, InnovateHub was born from a simple observation: teams were drowning in tools, tabs, and tasks. We set out to create a unified platform that brings everything together.</p>
              <p>Today, we're proud to serve over 50,000 companies across 120 countries. Our mission is to eliminate busywork and empower teams to focus on what truly matters—innovation and growth.</p>
              <p>We're backed by leading venture capital firms and have assembled a world-class team of engineers, designers, and customer success specialists who are passionate about transforming how people work.</p>
            `,
          statistics: [
            { id: "stat1", label: "Active Users", value: "50K+" },
            { id: "stat2", label: "Countries", value: "120+" },
            { id: "stat3", label: "Uptime", value: "99.99%" },
            { id: "stat4", label: "Customer Satisfaction", value: "98%" },
            { id: "stat5", label: "Tasks Automated", value: "10M+" },
            { id: "stat6", label: "Hours Saved", value: "2M+" },
          ],
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        },
      },

      // 8. TEAM SECTION
      {
        id: "s8",
        title: "Meet Our Leadership Team",
        subtitle: "Experienced leaders building the future of collaboration",
        type: "team",
        order: 8,
        content: {
          members: [
            {
              id: "tm1",
              name: "Alex Thompson",
              role: "CEO & Co-Founder",
              bio: "Former VP at Microsoft, 15+ years building products used by millions. Passionate about empowering teams.",
              avatar: "https://i.pravatar.cc/200?img=33",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm2",
              name: "Priya Sharma",
              role: "CTO & Co-Founder",
              bio: "Previously led engineering at Stripe. Stanford CS grad. Expert in distributed systems and AI.",
              avatar: "https://i.pravatar.cc/200?img=32",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm3",
              name: "Marcus Johnson",
              role: "VP of Product",
              bio: "Product leader from Salesforce with a track record of building loved products. User-obsessed designer.",
              avatar: "https://i.pravatar.cc/200?img=15",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm4",
              name: "Sophie Chen",
              role: "VP of Engineering",
              bio: "Ex-Google engineer with expertise in scaling systems. MIT graduate. Passionate about clean code.",
              avatar: "https://i.pravatar.cc/200?img=47",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm5",
              name: "Robert Martinez",
              role: "VP of Sales",
              bio: "Built and scaled sales teams at HubSpot and Zendesk. Believes in consultative selling.",
              avatar: "https://i.pravatar.cc/200?img=52",
              socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
            },
            {
              id: "tm6",
              name: "Amanda Lee",
              role: "VP of Customer Success",
              bio: "Customer success pioneer from Intercom. Dedicated to ensuring every customer achieves their goals.",
              avatar: "https://i.pravatar.cc/200?img=24",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
          ],
        },
      },

      // 7. BLOG SECTION
      {
        id: "s7",
        title: "Latest from Our Blog",
        subtitle: "Insights, tips, and stories from the InnovateHub team",
        type: "blog",
        order: 7,
        content: {
          variant: "fixed",
          numberOfPosts: 3,
          posts: [
            {
              id: "blog1",
              title: "10 Automation Strategies That Will Transform Your Workflow in 2026",
              excerpt:
                "Discover the latest automation techniques that leading companies are using to save time and boost productivity...",
              image:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
              author: "Alex Thompson",
              date: "January 20, 2026",
              slug: "automation-strategies-2026",
            },
            {
              id: "blog2",
              title: "How AI is Reshaping Team Collaboration: A Deep Dive",
              excerpt:
                "Explore how artificial intelligence is revolutionizing the way teams communicate, collaborate, and achieve results...",
              image:
                "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
              author: "Priya Sharma",
              date: "January 15, 2026",
              slug: "ai-team-collaboration",
            },
            {
              id: "blog3",
              title: "From 5 to 500: Scaling Your Team Without the Growing Pains",
              excerpt:
                "Learn the strategies and tools successful companies use to scale their operations smoothly and efficiently...",
              image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
              author: "Marcus Johnson",
              date: "January 10, 2026",
              slug: "scaling-teams-guide",
            },
          ],
        },
      },

      // 8. DEMO REQUEST SECTION
      {
        id: "s10",
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about InnovateHub",
        type: "faq",
        order: 10,
        content: {
          faqs: [
            {
              id: "faq1",
              question: "How does the 14-day free trial work?",
              answer:
                "You get full access to all Professional plan features for 14 days, absolutely free. No credit card required to start. You can upgrade, downgrade, or cancel anytime during or after the trial.",
            },
            {
              id: "faq2",
              question: "Can I cancel my subscription anytime?",
              answer:
                "Yes! You can cancel your subscription at any time with no penalties or fees. If you cancel, you'll retain access until the end of your current billing period, and we won't charge you again.",
            },
            {
              id: "faq3",
              question: "How secure is my data?",
              answer:
                "Security is our top priority. We use bank-level 256-bit encryption, SOC 2 Type II certified data centers, and comply with GDPR, HIPAA, and other major regulations. Your data is backed up daily and you can export it anytime.",
            },
            {
              id: "faq4",
              question: "Do you offer migration assistance?",
              answer:
                "Absolutely! Our customer success team provides free migration assistance for all Professional and Enterprise plans. We'll help you import your data, set up workflows, and train your team.",
            },
            {
              id: "faq5",
              question: "What integrations do you support?",
              answer:
                "We integrate with 500+ popular tools including Slack, Microsoft Teams, Google Workspace, Salesforce, HubSpot, Jira, GitHub, and many more. We also provide a robust API for custom integrations.",
            },
            {
              id: "faq6",
              question: "What kind of support do you offer?",
              answer:
                "Starter plans get email support with 24-hour response time. Professional plans get priority email and chat support. Enterprise customers get a dedicated success manager and phone support with guaranteed SLAs.",
            },
            {
              id: "faq7",
              question: "Can I upgrade or downgrade my plan?",
              answer:
                "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle. We'll prorate any charges accordingly.",
            },
            {
              id: "faq8",
              question: "Do you offer discounts for nonprofits or educational institutions?",
              answer:
                "Yes! We offer 50% discounts for qualifying nonprofit organizations and educational institutions. Contact our sales team to learn more and verify your eligibility.",
            },
          ],
        },
      },

      // 11. DEMO REQUEST SECTION
      {
        id: "s8",
        title: "See InnovateHub in Action",
        subtitle: "Schedule a personalized demo with our team",
        type: "demo_request",
        order: 8,
        content: {
          formFields: [
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              required: true,
              placeholder: "John",
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text",
              required: true,
              placeholder: "Smith",
            },
            {
              name: "email",
              label: "Work Email",
              type: "email",
              required: true,
              placeholder: "john@company.com",
            },
            {
              name: "company",
              label: "Company Name",
              type: "text",
              required: true,
              placeholder: "Acme Corp",
            },
            {
              name: "companySize",
              label: "Company Size",
              type: "select",
              required: true,
              options: [
                { label: "1-10 employees", value: "1-10" },
                { label: "11-50 employees", value: "11-50" },
                { label: "51-200 employees", value: "51-200" },
                { label: "201-500 employees", value: "201-500" },
                { label: "501-1000 employees", value: "501-1000" },
                { label: "1000+ employees", value: "1000+" },
              ],
            },
            {
              name: "role",
              label: "Your Role",
              type: "select",
              required: true,
              options: [
                { label: "C-Level Executive", value: "c-level" },
                { label: "VP/Director", value: "vp-director" },
                { label: "Manager", value: "manager" },
                { label: "Team Lead", value: "team-lead" },
                { label: "Individual Contributor", value: "ic" },
                { label: "Other", value: "other" },
              ],
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "tel",
              required: false,
              placeholder: "+1 (555) 123-4567",
            },
            {
              name: "message",
              label: "What would you like to discuss?",
              type: "textarea",
              required: false,
              placeholder: "Tell us about your team's needs and challenges...",
            },
          ],
          submitText: "Request Demo",
        },
      },
    ],
  },

  // ============================================
  // ABOUT PAGE
  // ============================================
  {
    id: "2",
    slug: "about",
    title: "About Us",
    metadata: {
      title: "About InnovateHub - Our Story, Team & Mission",
      description:
        "Learn about InnovateHub's journey to transform how teams work. Meet our leadership team and discover our mission to eliminate busywork.",
      keywords: "about InnovateHub, company story, leadership team, mission, values",
      ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop",
      ogTitle: "About InnovateHub - Building the Future of Work",
      ogDescription:
        "Meet the team behind InnovateHub and learn about our mission to empower teams worldwide.",
    },
    sections: [
      // 1. ABOUT SECTION
      {
        id: "s1",
        title: "About InnovateHub",
        subtitle: "Building the future of work, one team at a time",
        type: "about",
        order: 1,
        content: {
          content: `
              <p>Founded in 2020, InnovateHub was born from a simple observation: teams were drowning in tools, tabs, and tasks. We set out to create a unified platform that brings everything together.</p>
              <p>Today, we're proud to serve over 50,000 companies across 120 countries. Our mission is to eliminate busywork and empower teams to focus on what truly matters—innovation and growth.</p>
              <p>We're backed by leading venture capital firms and have assembled a world-class team of engineers, designers, and customer success specialists who are passionate about transforming how people work.</p>
            `,
          statistics: [
            { id: "stat1", label: "Active Users", value: "50K+" },
            { id: "stat2", label: "Countries", value: "120+" },
            { id: "stat3", label: "Uptime", value: "99.99%" },
            { id: "stat4", label: "Customer Satisfaction", value: "98%" },
            { id: "stat5", label: "Tasks Automated", value: "10M+" },
            { id: "stat6", label: "Hours Saved", value: "2M+" },
          ],
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        },
      },

      // 2. TEAM SECTION
      {
        id: "s2",
        title: "Meet Our Leadership Team",
        subtitle: "Experienced leaders building the future of collaboration",
        type: "team",
        order: 2,
        content: {
          members: [
            {
              id: "tm1",
              name: "Alex Thompson",
              role: "CEO & Co-Founder",
              bio: "Former VP at Microsoft, 15+ years building products used by millions. Passionate about empowering teams.",
              avatar: "https://i.pravatar.cc/200?img=33",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm2",
              name: "Priya Sharma",
              role: "CTO & Co-Founder",
              bio: "Previously led engineering at Stripe. Stanford CS grad. Expert in distributed systems and AI.",
              avatar: "https://i.pravatar.cc/200?img=32",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm3",
              name: "Marcus Johnson",
              role: "VP of Product",
              bio: "Product leader from Salesforce with a track record of building loved products. User-obsessed designer.",
              avatar: "https://i.pravatar.cc/200?img=15",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm4",
              name: "Sophie Chen",
              role: "VP of Engineering",
              bio: "Ex-Google engineer with expertise in scaling systems. MIT graduate. Passionate about clean code.",
              avatar: "https://i.pravatar.cc/200?img=47",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm5",
              name: "Robert Martinez",
              role: "VP of Sales",
              bio: "Built and scaled sales teams at HubSpot and Zendesk. Believes in consultative selling.",
              avatar: "https://i.pravatar.cc/200?img=52",
              socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
            },
            {
              id: "tm6",
              name: "Amanda Lee",
              role: "VP of Customer Success",
              bio: "Customer success pioneer from Intercom. Dedicated to ensuring every customer achieves their goals.",
              avatar: "https://i.pravatar.cc/200?img=24",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
          ],
        },
      },

      // 3. CAREERS SECTION
      {
        id: "s3",
        title: "Join Our Team",
        subtitle: "Help us build the future of work",
        type: "careers",
        order: 3,
        content: {
          jobOpenings: [
            {
              id: "job1",
              title: "Senior Full-Stack Engineer",
              department: "Engineering",
              location: "San Francisco, CA / Remote",
              type: "Full-time",
              description:
                "Build scalable features used by millions. Work with React, Node.js, and cutting-edge cloud technologies.",
              applyLink: "/careers/senior-fullstack-engineer",
            },
            {
              id: "job2",
              title: "Product Designer",
              department: "Design",
              location: "New York, NY / Remote",
              type: "Full-time",
              description:
                "Create beautiful, intuitive experiences that delight users. Shape the future of our product.",
              applyLink: "/careers/product-designer",
            },
            {
              id: "job3",
              title: "Customer Success Manager",
              department: "Customer Success",
              location: "Austin, TX / Remote",
              type: "Full-time",
              description:
                "Help our customers achieve their goals. Build lasting relationships and drive product adoption.",
              applyLink: "/careers/customer-success-manager",
            },
            {
              id: "job4",
              title: "Senior Data Engineer",
              department: "Engineering",
              location: "Seattle, WA / Remote",
              type: "Full-time",
              description:
                "Build data pipelines and analytics infrastructure at scale. Work with big data technologies.",
              applyLink: "/careers/senior-data-engineer",
            },
            {
              id: "job5",
              title: "Marketing Manager",
              department: "Marketing",
              location: "Remote",
              type: "Full-time",
              description:
                "Lead marketing campaigns and grow our brand. Experience with B2B SaaS required.",
              applyLink: "/careers/marketing-manager",
            },
          ],
        },
      },

      // 4. TESTIMONIALS SECTION
      {
        id: "s4",
        title: "What Our Customers Say",
        subtitle: "Trusted by teams worldwide",
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
              company: "TechVentures Inc",
              avatar: "https://i.pravatar.cc/150?img=1",
              content:
                "InnovateHub transformed how our team works. We've reduced manual tasks by 80% and our productivity has never been higher.",
              rating: 5,
            },
            {
              id: "t2",
              name: "Michael Chen",
              role: "CTO",
              company: "DataFlow Systems",
              avatar: "https://i.pravatar.cc/150?img=13",
              content:
                "The best investment we made this year. The AI automation is incredibly intelligent.",
              rating: 5,
            },
            {
              id: "t3",
              name: "Emily Rodriguez",
              role: "Product Manager",
              company: "ScaleUp Solutions",
              avatar: "https://i.pravatar.cc/150?img=5",
              content:
                "Finally, a platform that actually delivers on its promises. The customer support is phenomenal.",
              rating: 5,
            },
          ],
        },
      },
    ],
  },

  // ============================================
  // PRICING PAGE
  // ============================================
  {
    id: "3",
    slug: "pricing",
    title: "Pricing",
    metadata: {
      title: "Pricing Plans | Simple, Transparent Pricing",
      description:
        "Choose the perfect plan for your team. Start with a 14-day free trial. No credit card required. Plans start at $29/month.",
      keywords: "pricing, plans, subscription, free trial, enterprise pricing",
      ogImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop",
      ogTitle: "InnovateHub Pricing - Plans for Every Team Size",
      ogDescription: "Transparent pricing with no hidden fees. Start free, upgrade anytime.",
    },
    sections: [
      // 1. PRICING SECTION
      {
        id: "s1",
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the perfect plan for your team size and needs",
        type: "pricing",
        order: 1,
        content: {
          plans: [
            {
              id: "p1",
              name: "Starter",
              price: "$29",
              interval: "month",
              description: "Perfect for small teams and startups",
              features: [
                "Up to 10 team members",
                "50GB cloud storage",
                "Basic automation (100 tasks/month)",
                "Email support",
                "Mobile apps (iOS & Android)",
                "Standard integrations",
              ],
              ctaText: "Start Free Trial",
              ctaLink: "/signup?plan=starter",
            },
            {
              id: "p2",
              name: "Professional",
              price: "$99",
              interval: "month",
              description: "For growing businesses that need more power",
              features: [
                "Up to 50 team members",
                "500GB cloud storage",
                "Advanced automation (unlimited tasks)",
                "Priority email & chat support",
                "Custom workflows & templates",
                "Advanced analytics & reporting",
                "SSO & SAML authentication",
                "API access",
              ],
              highlighted: true,
              ctaText: "Start Free Trial",
              ctaLink: "/signup?plan=pro",
            },
            {
              id: "p3",
              name: "Enterprise",
              price: "Custom",
              description: "For large organizations with complex needs",
              features: [
                "Unlimited team members",
                "Unlimited storage",
                "Enterprise automation & AI",
                "Dedicated success manager",
                "Custom integrations & development",
                "Advanced security & compliance",
                "SLA guarantees (99.99% uptime)",
                "On-premise deployment option",
                "White-label solutions",
              ],
              ctaText: "Contact Sales",
              ctaLink: "/contact",
            },
          ],
        },
      },

      // 2. FAQ SECTION
      {
        id: "s2",
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know about our pricing",
        type: "faq",
        order: 2,
        content: {
          faqs: [
            {
              id: "faq1",
              question: "How does the 14-day free trial work?",
              answer:
                "You get full access to all Professional plan features for 14 days, absolutely free. No credit card required to start. You can upgrade, downgrade, or cancel anytime during or after the trial.",
            },
            {
              id: "faq2",
              question: "Can I cancel my subscription anytime?",
              answer:
                "Yes! You can cancel your subscription at any time with no penalties or fees. If you cancel, you'll retain access until the end of your current billing period, and we won't charge you again.",
            },
            {
              id: "faq3",
              question: "How secure is my data?",
              answer:
                "Security is our top priority. We use bank-level 256-bit encryption, SOC 2 Type II certified data centers, and comply with GDPR, HIPAA, and other major regulations. Your data is backed up daily and you can export it anytime.",
            },
            {
              id: "faq4",
              question: "Do you offer migration assistance?",
              answer:
                "Absolutely! Our customer success team provides free migration assistance for all Professional and Enterprise plans. We'll help you import your data, set up workflows, and train your team.",
            },
            {
              id: "faq5",
              question: "What integrations do you support?",
              answer:
                "We integrate with 500+ popular tools including Slack, Microsoft Teams, Google Workspace, Salesforce, HubSpot, Jira, GitHub, and many more. We also provide a robust API for custom integrations.",
            },
            {
              id: "faq6",
              question: "Can I upgrade or downgrade my plan?",
              answer:
                "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle. We'll prorate any charges accordingly.",
            },
            {
              id: "faq7",
              question: "Do you offer discounts for nonprofits or educational institutions?",
              answer:
                "Yes! We offer 50% discounts for qualifying nonprofit organizations and educational institutions. Contact our sales team to learn more and verify your eligibility.",
            },
            {
              id: "faq8",
              question: "What payment methods do you accept?",
              answer:
                "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.",
            },
          ],
        },
      },

      // 3. TESTIMONIALS SECTION
      {
        id: "s3",
        title: "Loved by Teams Worldwide",
        subtitle: "See what our 50,000+ customers have to say",
        type: "testimonials",
        order: 3,
        content: {
          variant: "fixed",
          layout: "horizontal",
          testimonials: [
            {
              id: "t1",
              name: "David Park",
              role: "Operations Director",
              company: "GlobalTech Ltd",
              avatar: "https://i.pravatar.cc/150?img=12",
              content:
                "Implementation was smooth, training was easy, and adoption was instant. Our team loves it. We've saved hundreds of hours every month.",
              rating: 5,
            },
            {
              id: "t2",
              name: "Lisa Anderson",
              role: "Marketing Director",
              company: "BrandBoost Agency",
              avatar: "https://i.pravatar.cc/150?img=9",
              content:
                "The analytics and reporting features give us insights we never had before. We can now make data-driven decisions with confidence.",
              rating: 5,
            },
            {
              id: "t3",
              name: "James Wilson",
              role: "Founder",
              company: "StartupHub",
              avatar: "https://i.pravatar.cc/150?img=14",
              content:
                "As a startup, we needed something powerful yet affordable. InnovateHub checked all the boxes and then some. Highly recommended!",
              rating: 5,
            },
          ],
        },
      },
    ],
  },

  // ============================================
  // CONTACT PAGE
  // ============================================
  {
    id: "4",
    slug: "contact",
    title: "Contact Us",
    metadata: {
      title: "Contact InnovateHub - Get in Touch with Our Team",
      description:
        "Have questions? Want to schedule a demo? Our team is here to help. Email, phone, or visit our office in San Francisco.",
      keywords: "contact, support, demo, sales, customer service, office location",
      ogImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=630&fit=crop",
      ogTitle: "Contact InnovateHub - We're Here to Help",
      ogDescription: "Reach out to our team for support, demos, or general inquiries.",
    },
    sections: [
      // 1. CONTACT SECTION
      {
        id: "s1",
        title: "Get in Touch",
        subtitle: "We'd love to hear from you",
        type: "contact",
        order: 1,
        content: {
          email: "hello@innovatehub.com",
          phone: "+1 (888) 555-0100",
          address: "100 Innovation Way, Suite 500, San Francisco, CA 94105",
          mapLocation:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019428478143!2d-122.39968368468205!3d37.78926797975749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c6b6e5b0f%3A0x4f3a4a4a4a4a4a4a!2s100%20California%20St%2C%20San%20Francisco%2C%20CA%2094111!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus",
          socialLinks: [
            { platform: "Twitter", url: "https://twitter.com/innovatehub" },
            { platform: "LinkedIn", url: "https://linkedin.com/company/innovatehub" },
            { platform: "GitHub", url: "https://github.com/innovatehub" },
            { platform: "Facebook", url: "https://facebook.com/innovatehub" },
            { platform: "Instagram", url: "https://instagram.com/innovatehub" },
          ],
        },
      },

      // 2. DEMO REQUEST SECTION
      {
        id: "s2",
        title: "Schedule a Personalized Demo",
        subtitle: "See InnovateHub in action with our team",
        type: "demo_request",
        order: 2,
        content: {
          formFields: [
            {
              name: "firstName",
              label: "First Name",
              type: "text",
              required: true,
              placeholder: "John",
            },
            {
              name: "lastName",
              label: "Last Name",
              type: "text",
              required: true,
              placeholder: "Smith",
            },
            {
              name: "email",
              label: "Work Email",
              type: "email",
              required: true,
              placeholder: "john@company.com",
            },
            {
              name: "company",
              label: "Company Name",
              type: "text",
              required: true,
              placeholder: "Acme Corp",
            },
            {
              name: "companySize",
              label: "Company Size",
              type: "select",
              required: true,
              options: [
                { label: "1-10 employees", value: "1-10" },
                { label: "11-50 employees", value: "11-50" },
                { label: "51-200 employees", value: "51-200" },
                { label: "201-500 employees", value: "201-500" },
                { label: "501-1000 employees", value: "501-1000" },
                { label: "1000+ employees", value: "1000+" },
              ],
            },
            {
              name: "role",
              label: "Your Role",
              type: "select",
              required: true,
              options: [
                { label: "C-Level Executive", value: "c-level" },
                { label: "VP/Director", value: "vp-director" },
                { label: "Manager", value: "manager" },
                { label: "Team Lead", value: "team-lead" },
                { label: "Individual Contributor", value: "ic" },
                { label: "Other", value: "other" },
              ],
            },
            {
              name: "phone",
              label: "Phone Number",
              type: "tel",
              required: false,
              placeholder: "+1 (555) 123-4567",
            },
            {
              name: "message",
              label: "What would you like to discuss?",
              type: "textarea",
              required: false,
              placeholder: "Tell us about your team's needs and challenges...",
            },
          ],
          submitText: "Request Demo",
        },
      },

      // 3. FAQ SECTION
      {
        id: "s3",
        title: "Common Questions",
        subtitle: "Quick answers before you reach out",
        type: "faq",
        order: 3,
        content: {
          faqs: [
            {
              id: "faq1",
              question: "What kind of support do you offer?",
              answer:
                "Starter plans get email support with 24-hour response time. Professional plans get priority email and chat support. Enterprise customers get a dedicated success manager and phone support with guaranteed SLAs.",
            },
            {
              id: "faq2",
              question: "How quickly can I get a demo scheduled?",
              answer:
                "Most demos are scheduled within 24-48 hours. For urgent requests, you can also call us directly at +1 (888) 555-0100 and we'll do our best to accommodate you.",
            },
            {
              id: "faq3",
              question: "Do you offer on-site training?",
              answer:
                "Yes! Enterprise customers can request on-site training and implementation support. We'll send a dedicated team member to your office to ensure smooth adoption.",
            },
            {
              id: "faq4",
              question: "Where are you located?",
              answer:
                "Our headquarters is in San Francisco, California, but we have team members distributed across the globe. We offer support 24/7 regardless of your timezone.",
            },
          ],
        },
      },
    ],
  },
];
