import { Page, SystemMetadata } from "@/types/landing";

export const getMockSystemMetadataAR = (): SystemMetadata => ({
  name: "إنوفيت هاب",
  logo: "https://www.trafongroup.com/wp-content/uploads/2019/04/logo-placeholder.png",
  logoFull: "https://www.trafongroup.com/wp-content/uploads/2019/04/logo-placeholder.png",
  slogan: "حوّل أعمالك بالذكاء الاصطناعي",
  defaultThemeColor: "#667eea",
  favicon: "/favicon.ico",
  phoneNumber: "+1 (888) 555-0100",
  websiteUrl: "https://innovatehub.com",
  contactEmail: "hello@innovatehub.com",
  socialTwitter: "https://twitter.com/innovatehub",
  socialLinkedin: "https://linkedin.com/company/innovatehub",
  socialFacebook: "https://facebook.com/innovatehub",
  socialInstagram: "https://instagram.com/innovatehub",
  socialLinks: {
    twitter: "https://twitter.com/innovatehub",
    linkedin: "https://linkedin.com/company/innovatehub",
    github: "https://github.com/innovatehub",
    facebook: "https://facebook.com/innovatehub",
    instagram: "https://instagram.com/innovatehub",
  },
});

export const getMockPagesAR = (): Page[] => [
  // ============================================
  // الصفحة الرئيسية
  // ============================================
  {
    id: "1",
    slug: "home",
    title: "الرئيسية",
    metadata: {
      title: "إنوفيت هاب - حوّل أعمالك بحلول الذكاء الاصطناعي",
      description:
        "اختبر مستقبل أتمتة الأعمال مع إنوفيت هاب. منصتنا القائمة على الذكاء الاصطناعي تساعد الفرق على التعاون وأتمتة سير العمل والتوسع بسهولة.",
      keywords: "منصة الذكاء الاصطناعي، أتمتة الأعمال، تعاون الفريق، إدارة سير العمل، حلول SaaS",
      ogImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop",
      ogTitle: "إنوفيت هاب - منصة الأعمال القائمة على الذكاء الاصطناعي",
      ogDescription: "حوّل عمليات أعمالك بالأتمتة الذكية والتعاون السلس.",
    },
    sections: [
      // 1. قسم البطل
      {
        id: "s1",
        title: "بانر البطل",
        type: "hero",
        order: 1,
        content: {
          heading: "حوّل أعمالك بالابتكار المدعوم بالذكاء الاصطناعي",
          subheading:
            "انضم إلى أكثر من 50,000 شركة تستخدم إنوفيت هاب لأتمتة سير العمل، وتعزيز الإنتاجية، وتوسيع عملياتها بسهولة.",
          backgroundImage:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
          ctaText: "ابدأ النسخة التجريبية المجانية",
          ctaLink: "/signup",
          secondaryCtaText: "شاهد العرض التوضيحي",
          secondaryCtaLink: "#demo",
        },
      },

      // 2. قسم العملاء/الشركاء
      {
        id: "s2",
        title: "موثوق به من قبل قادة الصناعة",
        subtitle: "انضم إلى آلاف الشركات التي تستخدم إنوفيت هاب بالفعل",
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

      // 3. قسم الميزات
      {
        id: "s3",
        title: "ميزات قوية للفرق الحديثة",
        subtitle: "كل ما تحتاجه لتعزيز إنتاجيتك",
        type: "features",
        order: 3,
        content: {
          variant: "horizontal",
          features: [
            {
              id: "f1",
              title: "الأتمتة المدعومة بالذكاء الاصطناعي",
              description:
                "دع الذكاء الاصطناعي يتعامل مع المهام المتكررة بينما تركز على ما يهم. تتكيف أتمتتنا الذكية مع سير عملك.",
              icon: "🤖",
            },
            {
              id: "f2",
              title: "التعاون في الوقت الفعلي",
              description:
                "اعمل معًا بسلاسة مع فريقك في جميع أنحاء العالم. شارك التحديثات والملفات والتعليقات على الفور.",
              icon: "👥",
            },
            {
              id: "f3",
              title: "تحليلات متقدمة",
              description:
                "اتخذ قرارات مبنية على البيانات مع رؤى شاملة. تتبع الأداء، وحدد الاتجاهات، وحسّن عملياتك.",
              icon: "📊",
            },
            {
              id: "f4",
              title: "أمان على مستوى المؤسسات",
              description:
                "التشفير على مستوى البنوك وشهادات الامتثال تحافظ على بياناتك آمنة. متوافق مع SOC 2 و GDPR و HIPAA.",
              icon: "🔒",
            },
            {
              id: "f5",
              title: "تكاملات سلسة",
              description:
                "اتصل بأكثر من 500 أداة تستخدمها بالفعل. Slack و Microsoft Teams و Salesforce والمزيد.",
              icon: "🔌",
            },
            {
              id: "f6",
              title: "دعم على مدار الساعة",
              description:
                "فريقنا من الخبراء متاح على مدار الساعة لمساعدتك على النجاح. دعم عبر الدردشة أو البريد الإلكتروني أو الهاتف.",
              icon: "🎧",
            },
          ],
        },
      },

      // 4. قسم كيف يعمل
      {
        id: "s4",
        title: "كيف يعمل",
        subtitle: "ابدأ في دقائق، وليس شهور",
        type: "how_it_works",
        order: 4,
        content: {
          steps: [
            {
              id: "step1",
              title: "سجّل وأعد الإعداد",
              description:
                "أنشئ حسابك في 60 ثانية. يرشدك معالج الإعداد الذكي خلال الإعداد الأولي والتخصيص.",
              icon: "🚀",
            },
            {
              id: "step2",
              title: "استورد بياناتك",
              description:
                "انقل سير العمل والمستندات وأعضاء الفريق الحاليين بسلاسة. ندعم الاستيراد الجماعي من جميع المنصات الرئيسية.",
              icon: "📥",
            },
            {
              id: "step3",
              title: "خصص وأتمت",
              description:
                "قم بتكوين قواعد الأتمتة، وإنشاء سير عمل مخصص، وإعداد التكاملات مع أدواتك المفضلة.",
              icon: "⚙️",
            },
            {
              id: "step4",
              title: "تعاون ووسّع",
              description:
                "ادع فريقك، وعيّن المهام، وشاهد إنتاجيتك ترتفع. توسع بسهولة مع نمو عملك.",
              icon: "📈",
            },
          ],
        },
      },

      // 5. قسم التسعير
      {
        id: "s5",
        title: "تسعير بسيط وشفاف",
        subtitle: "اختر الخطة المثالية لحجم فريقك واحتياجاتك",
        type: "pricing",
        order: 5,
        content: {
          plans: [
            {
              id: "p1",
              name: "البداية",
              price: "$29",
              interval: "شهر",
              description: "مثالي للفرق الصغيرة والشركات الناشئة",
              features: [
                "حتى 10 أعضاء في الفريق",
                "50 جيجابايت تخزين سحابي",
                "أتمتة أساسية (100 مهمة/شهر)",
                "دعم البريد الإلكتروني",
                "تطبيقات الجوال (iOS و Android)",
                "التكاملات القياسية",
              ],
              ctaText: "ابدأ النسخة التجريبية المجانية",
              ctaLink: "/signup?plan=starter",
            },
            {
              id: "p2",
              name: "المحترف",
              price: "$99",
              interval: "شهر",
              description: "للشركات المتنامية التي تحتاج إلى المزيد من القوة",
              features: [
                "حتى 50 عضوًا في الفريق",
                "500 جيجابايت تخزين سحابي",
                "أتمتة متقدمة (مهام غير محدودة)",
                "دعم ذو أولوية عبر البريد الإلكتروني والدردشة",
                "سير عمل وقوالب مخصصة",
                "تحليلات وتقارير متقدمة",
                "مصادقة SSO و SAML",
                "الوصول إلى API",
              ],
              highlighted: true,
              ctaText: "ابدأ النسخة التجريبية المجانية",
              ctaLink: "/signup?plan=pro",
            },
            {
              id: "p3",
              name: "المؤسسات",
              price: "مخصص",
              description: "للمؤسسات الكبيرة ذات الاحتياجات المعقدة",
              features: [
                "أعضاء فريق غير محدودين",
                "تخزين غير محدود",
                "أتمتة وذكاء اصطناعي على مستوى المؤسسات",
                "مدير نجاح مخصص",
                "تكاملات وتطوير مخصص",
                "أمان وامتثال متقدمان",
                "ضمانات SLA (وقت تشغيل 99.99٪)",
                "خيار النشر المحلي",
                "حلول العلامة البيضاء",
              ],
              ctaText: "اتصل بالمبيعات",
              ctaLink: "/contact-sales",
            },
          ],
        },
      },

      // 6. قسم الشهادات
      {
        id: "s6",
        title: "محبوب من قبل الفرق في جميع أنحاء العالم",
        subtitle: "اطلع على ما يقوله أكثر من 50,000 عميل لدينا",
        type: "testimonials",
        order: 6,
        content: {
          variant: "fixed",
          layout: "horizontal",
          testimonials: [
            {
              id: "t1",
              name: "سارة جونسون",
              role: "الرئيس التنفيذي",
              company: "TechVentures Inc",
              avatar: "https://i.pravatar.cc/150?img=1",
              content:
                "حوّل إنوفيت هاب طريقة عمل فريقنا. لقد قللنا المهام اليدوية بنسبة 80٪ وإنتاجيتنا لم تكن أعلى من ذلك. كان العائد على الاستثمار فوريًا وكبيرًا.",
              rating: 5,
            },
            {
              id: "t2",
              name: "مايكل تشين",
              role: "مدير التكنولوجيا التنفيذي",
              company: "DataFlow Systems",
              avatar: "https://i.pravatar.cc/150?img=13",
              content:
                "أفضل استثمار قمنا به هذا العام. الأتمتة بالذكاء الاصطناعي ذكية بشكل لا يصدق والتكاملات تعمل بشكل مثالي. دورة التطوير لدينا الآن أسرع بـ 3 مرات.",
              rating: 5,
            },
            {
              id: "t3",
              name: "إيميلي رودريغيز",
              role: "مدير المنتج",
              company: "ScaleUp Solutions",
              avatar: "https://i.pravatar.cc/150?img=5",
              content:
                "أخيرًا، منصة تفي بوعودها حقًا. دعم العملاء رائع، والميزات تتحسن باستمرار. لن نعود أبدًا.",
              rating: 5,
            },
            {
              id: "t4",
              name: "ديفيد بارك",
              role: "مدير العمليات",
              company: "GlobalTech Ltd",
              avatar: "https://i.pravatar.cc/150?img=12",
              content:
                "كان التنفيذ سلسًا، والتدريب سهلاً، والاعتماد كان فوريًا. فريقنا يحبه. لقد وفرنا مئات الساعات كل شهر.",
              rating: 5,
            },
            {
              id: "t5",
              name: "ليزا أندرسون",
              role: "مدير التسويق",
              company: "BrandBoost Agency",
              avatar: "https://i.pravatar.cc/150?img=9",
              content:
                "ميزات التحليلات والتقارير تمنحنا رؤى لم نكن نمتلكها من قبل. يمكننا الآن اتخاذ قرارات مبنية على البيانات بثقة.",
              rating: 5,
            },
            {
              id: "t6",
              name: "جيمس ويلسون",
              role: "المؤسس",
              company: "StartupHub",
              avatar: "https://i.pravatar.cc/150?img=14",
              content:
                "كشركة ناشئة، احتجنا إلى شيء قوي ومعقول التكلفة. إنوفيت هاب فحص جميع الصناديق وأكثر. موصى به بشدة!",
              rating: 5,
            },
          ],
        },
      },

      // 7. قسم عن
      {
        id: "s7",
        title: "عن إنوفيت هاب",
        subtitle: "بناء مستقبل العمل، فريق واحد في كل مرة",
        type: "about",
        order: 7,
        content: {
          content: `
              <p>تأسست في عام 2020، ولدت إنوفيت هاب من ملاحظة بسيطة: كانت الفرق تغرق في الأدوات والعلامات والمهام. شرعنا في إنشاء منصة موحدة تجمع كل شيء معًا.</p>
              <p>اليوم، نحن فخورون بخدمة أكثر من 50,000 شركة في 120 دولة. مهمتنا هي القضاء على العمل الروتيني وتمكين الفرق من التركيز على ما يهم حقًا - الابتكار والنمو.</p>
              <p>نحن مدعومون من قبل شركات رأس مال مخاطر رائدة وقمنا بتجميع فريق عالمي المستوى من المهندسين والمصممين وأخصائيي نجاح العملاء المتحمسين لتحويل كيفية عمل الناس.</p>
            `,
          statistics: [
            { id: "stat1", label: "المستخدمون النشطون", value: "50K+" },
            { id: "stat2", label: "البلدان", value: "120+" },
            { id: "stat3", label: "وقت التشغيل", value: "99.99%" },
            { id: "stat4", label: "رضا العملاء", value: "98%" },
            { id: "stat5", label: "المهام الآلية", value: "10M+" },
            { id: "stat6", label: "الساعات الموفرة", value: "2M+" },
          ],
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        },
      },

      // 8. قسم الفريق
      {
        id: "s8",
        title: "تعرف على فريق القيادة لدينا",
        subtitle: "قادة ذوو خبرة يبنون مستقبل التعاون",
        type: "team",
        order: 8,
        content: {
          members: [
            {
              id: "tm1",
              name: "أليكس تومبسون",
              role: "الرئيس التنفيذي والشريك المؤسس",
              bio: "نائب رئيس سابق في Microsoft، أكثر من 15 عامًا في بناء منتجات يستخدمها الملايين. شغوف بتمكين الفرق.",
              avatar: "https://i.pravatar.cc/200?img=33",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm2",
              name: "بريا شارما",
              role: "مدير التكنولوجيا التنفيذي والشريك المؤسس",
              bio: "قاد الهندسة سابقًا في Stripe. خريج علوم الحاسوب من ستانفورد. خبير في الأنظمة الموزعة والذكاء الاصطناعي.",
              avatar: "https://i.pravatar.cc/200?img=32",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm3",
              name: "ماركوس جونسون",
              role: "نائب رئيس المنتج",
              bio: "قائد منتج من Salesforce مع سجل حافل في بناء منتجات محبوبة. مصمم مهووس بالمستخدم.",
              avatar: "https://i.pravatar.cc/200?img=15",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm4",
              name: "صوفي تشين",
              role: "نائب رئيس الهندسة",
              bio: "مهندسة سابقة في Google مع خبرة في توسيع نطاق الأنظمة. خريجة MIT. شغوفة بالكود النظيف.",
              avatar: "https://i.pravatar.cc/200?img=47",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm5",
              name: "روبرت مارتينيز",
              role: "نائب رئيس المبيعات",
              bio: "بنى ووسّع فرق المبيعات في HubSpot و Zendesk. يؤمن بالبيع الاستشاري.",
              avatar: "https://i.pravatar.cc/200?img=52",
              socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
            },
            {
              id: "tm6",
              name: "أماندا لي",
              role: "نائب رئيس نجاح العملاء",
              bio: "رائدة نجاح العملاء من Intercom. ملتزمة بضمان تحقيق كل عميل لأهدافه.",
              avatar: "https://i.pravatar.cc/200?img=24",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
          ],
        },
      },

      // 7. قسم المدونة
      {
        id: "s9",
        title: "أحدث ما في مدونتنا",
        subtitle: "رؤى ونصائح وقصص من فريق إنوفيت هاب",
        type: "blog",
        order: 7,
        content: {
          variant: "fixed",
          numberOfPosts: 3,
          posts: [
            {
              id: "blog1",
              title: "10 استراتيجيات للأتمتة ستحول سير عملك في 2026",
              excerpt:
                "اكتشف أحدث تقنيات الأتمتة التي تستخدمها الشركات الرائدة لتوفير الوقت وتعزيز الإنتاجية...",
              image:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
              author: "أليكس تومبسون",
              date: "20 يناير 2026",
              slug: "automation-strategies-2026",
            },
            {
              id: "blog2",
              title: "كيف يعيد الذكاء الاصطناعي تشكيل تعاون الفريق: نظرة عميقة",
              excerpt:
                "استكشف كيف يُحدث الذكاء الاصطناعي ثورة في طريقة تواصل الفرق وتعاونها وتحقيق النتائج...",
              image:
                "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
              author: "بريا شارما",
              date: "15 يناير 2026",
              slug: "ai-team-collaboration",
            },
            {
              id: "blog3",
              title: "من 5 إلى 500: توسيع نطاق فريقك دون آلام النمو",
              excerpt:
                "تعلم الاستراتيجيات والأدوات التي تستخدمها الشركات الناجحة لتوسيع عملياتها بسلاسة وكفاءة...",
              image:
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
              author: "ماركوس جونسون",
              date: "10 يناير 2026",
              slug: "scaling-teams-guide",
            },
          ],
        },
      },

      // 8. قسم الأسئلة الشائعة
      {
        id: "s10",
        title: "الأسئلة المتكررة",
        subtitle: "كل ما تحتاج لمعرفته عن إنوفيت هاب",
        type: "faq",
        order: 10,
        content: {
          faqs: [
            {
              id: "faq1",
              question: "كيف تعمل النسخة التجريبية المجانية لمدة 14 يومًا؟",
              answer:
                "تحصل على وصول كامل إلى جميع ميزات الخطة المحترفة لمدة 14 يومًا، مجانًا تمامًا. لا حاجة لبطاقة ائتمان للبدء. يمكنك الترقية أو التخفيض أو الإلغاء في أي وقت أثناء الفترة التجريبية أو بعدها.",
            },
            {
              id: "faq2",
              question: "هل يمكنني إلغاء اشتراكي في أي وقت؟",
              answer:
                "نعم! يمكنك إلغاء اشتراكك في أي وقت بدون عقوبات أو رسوم. إذا ألغيت، ستحتفظ بالوصول حتى نهاية فترة الفوترة الحالية، ولن نفرض عليك رسومًا مرة أخرى.",
            },
            {
              id: "faq3",
              question: "ما مدى أمان بياناتي؟",
              answer:
                "الأمان هو أولويتنا القصوى. نستخدم تشفير 256 بت على مستوى البنوك، ومراكز بيانات معتمدة من SOC 2 Type II، ونتوافق مع GDPR و HIPAA واللوائح الرئيسية الأخرى. يتم نسخ بياناتك احتياطيًا يوميًا ويمكنك تصديرها في أي وقت.",
            },
            {
              id: "faq4",
              question: "هل تقدمون مساعدة في الترحيل؟",
              answer:
                "بالتأكيد! يوفر فريق نجاح العملاء لدينا مساعدة مجانية في الترحيل لجميع الخطط المحترفة وخطط المؤسسات. سنساعدك في استيراد بياناتك، وإعداد سير العمل، وتدريب فريقك.",
            },
            {
              id: "faq5",
              question: "ما هي التكاملات التي تدعمونها؟",
              answer:
                "نتكامل مع أكثر من 500 أداة شائعة بما في ذلك Slack و Microsoft Teams و Google Workspace و Salesforce و HubSpot و Jira و GitHub والعديد من الأدوات الأخرى. نوفر أيضًا API قوي للتكاملات المخصصة.",
            },
            {
              id: "faq6",
              question: "ما نوع الدعم الذي تقدمونه؟",
              answer:
                "خطط البداية تحصل على دعم البريد الإلكتروني مع وقت استجابة 24 ساعة. الخطط المحترفة تحصل على دعم ذو أولوية عبر البريد الإلكتروني والدردشة. عملاء المؤسسات يحصلون على مدير نجاح مخصص ودعم عبر الهاتف مع ضمانات SLA.",
            },
            {
              id: "faq7",
              question: "هل يمكنني ترقية أو تخفيض خطتي؟",
              answer:
                "نعم! يمكنك تغيير خطتك في أي وقت. الترقيات تدخل حيز التنفيذ على الفور، والتخفيضات تدخل حيز التنفيذ في بداية دورة الفوترة التالية. سنقوم بحساب أي رسوم بشكل تناسبي وفقًا لذلك.",
            },
            {
              id: "faq8",
              question: "هل تقدمون خصومات للمنظمات غير الربحية أو المؤسسات التعليمية؟",
              answer:
                "نعم! نقدم خصومات بنسبة 50٪ للمنظمات غير الربحية والمؤسسات التعليمية المؤهلة. اتصل بفريق المبيعات لدينا لمعرفة المزيد والتحقق من أهليتك.",
            },
          ],
        },
      },

      // 11. قسم طلب العرض التوضيحي
      {
        id: "s11",
        title: "شاهد إنوفيت هاب أثناء العمل",
        subtitle: "حدد موعدًا لعرض توضيحي مخصص مع فريقنا",
        type: "demo_request",
        order: 8,
        content: {
          formFields: [
            {
              name: "firstName",
              label: "الاسم الأول",
              type: "text",
              required: true,
              placeholder: "أحمد",
            },
            {
              name: "lastName",
              label: "اسم العائلة",
              type: "text",
              required: true,
              placeholder: "محمد",
            },
            {
              name: "email",
              label: "البريد الإلكتروني للعمل",
              type: "email",
              required: true,
              placeholder: "ahmed@company.com",
            },
            {
              name: "company",
              label: "اسم الشركة",
              type: "text",
              required: true,
              placeholder: "شركة التقنية",
            },
            {
              name: "companySize",
              label: "حجم الشركة",
              type: "select",
              required: true,
              options: [
                { label: "1-10 موظفين", value: "1-10" },
                { label: "11-50 موظفًا", value: "11-50" },
                { label: "51-200 موظف", value: "51-200" },
                { label: "201-500 موظف", value: "201-500" },
                { label: "501-1000 موظف", value: "501-1000" },
                { label: "أكثر من 1000 موظف", value: "1000+" },
              ],
            },
            {
              name: "role",
              label: "دورك",
              type: "select",
              required: true,
              options: [
                { label: "مدير تنفيذي من المستوى C", value: "c-level" },
                { label: "نائب رئيس/مدير", value: "vp-director" },
                { label: "مدير", value: "manager" },
                { label: "قائد فريق", value: "team-lead" },
                { label: "مساهم فردي", value: "ic" },
                { label: "آخر", value: "other" },
              ],
            },
            {
              name: "phone",
              label: "رقم الهاتف",
              type: "tel",
              required: false,
              placeholder: "+966 50 123 4567",
            },
            {
              name: "message",
              label: "ما الذي تريد مناقشته؟",
              type: "textarea",
              required: false,
              placeholder: "أخبرنا عن احتياجات فريقك والتحديات التي تواجهها...",
            },
          ],
          submitText: "طلب عرض توضيحي",
        },
      },
    ],
  },

  // ============================================
  // صفحة من نحن
  // ============================================
  {
    id: "2",
    slug: "about",
    title: "عننا",
    metadata: {
      title: "عن إنوفيت هاب - قصتنا وفريقنا ومهمتنا",
      description:
        "تعرف على رحلة إنوفيت هاب لتحويل كيفية عمل الفرق. تعرف على فريق القيادة لدينا واكتشف مهمتنا للقضاء على العمل الروتيني.",
      keywords: "عن إنوفيت هاب، قصة الشركة، فريق القيادة، المهمة، القيم",
      ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop",
      ogTitle: "عن إنوفيت هاب - بناء مستقبل العمل",
      ogDescription:
        "تعرف على الفريق الذي يقف وراء إنوفيت هاب وتعلم عن مهمتنا لتمكين الفرق في جميع أنحاء العالم.",
    },
    sections: [
      // 1. قسم عن
      {
        id: "s1",
        title: "عن إنوفيت هاب",
        subtitle: "بناء مستقبل العمل، فريق واحد في كل مرة",
        type: "about",
        order: 1,
        content: {
          content: `
              <p>تأسست في عام 2020، ولدت إنوفيت هاب من ملاحظة بسيطة: كانت الفرق تغرق في الأدوات والعلامات والمهام. شرعنا في إنشاء منصة موحدة تجمع كل شيء معًا.</p>
              <p>اليوم، نحن فخورون بخدمة أكثر من 50,000 شركة في 120 دولة. مهمتنا هي القضاء على العمل الروتيني وتمكين الفرق من التركيز على ما يهم حقًا - الابتكار والنمو.</p>
              <p>نحن مدعومون من قبل شركات رأس مال مخاطر رائدة وقمنا بتجميع فريق عالمي المستوى من المهندسين والمصممين وأخصائيي نجاح العملاء المتحمسين لتحويل كيفية عمل الناس.</p>
            `,
          statistics: [
            { id: "stat1", label: "المستخدمون النشطون", value: "50K+" },
            { id: "stat2", label: "البلدان", value: "120+" },
            { id: "stat3", label: "وقت التشغيل", value: "99.99%" },
            { id: "stat4", label: "رضا العملاء", value: "98%" },
            { id: "stat5", label: "المهام الآلية", value: "10M+" },
            { id: "stat6", label: "الساعات الموفرة", value: "2M+" },
          ],
          image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
        },
      },

      // 2. قسم الفريق
      {
        id: "s2",
        title: "تعرف على فريق القيادة لدينا",
        subtitle: "قادة ذوو خبرة يبنون مستقبل التعاون",
        type: "team",
        order: 2,
        content: {
          members: [
            {
              id: "tm1",
              name: "أليكس تومبسون",
              role: "الرئيس التنفيذي والشريك المؤسس",
              bio: "نائب رئيس سابق في Microsoft، أكثر من 15 عامًا في بناء منتجات يستخدمها الملايين. شغوف بتمكين الفرق.",
              avatar: "https://i.pravatar.cc/200?img=33",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm2",
              name: "بريا شارما",
              role: "مدير التكنولوجيا التنفيذي والشريك المؤسس",
              bio: "قاد الهندسة سابقًا في Stripe. خريج علوم الحاسوب من ستانفورد. خبير في الأنظمة الموزعة والذكاء الاصطناعي.",
              avatar: "https://i.pravatar.cc/200?img=32",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm3",
              name: "ماركوس جونسون",
              role: "نائب رئيس المنتج",
              bio: "قائد منتج من Salesforce مع سجل حافل في بناء منتجات محبوبة. مصمم مهووس بالمستخدم.",
              avatar: "https://i.pravatar.cc/200?img=15",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
            {
              id: "tm4",
              name: "صوفي تشين",
              role: "نائب رئيس الهندسة",
              bio: "مهندسة سابقة في Google مع خبرة في توسيع نطاق الأنظمة. خريجة MIT. شغوفة بالكود النظيف.",
              avatar: "https://i.pravatar.cc/200?img=47",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "GitHub", url: "https://github.com" },
              ],
            },
            {
              id: "tm5",
              name: "روبرت مارتينيز",
              role: "نائب رئيس المبيعات",
              bio: "بنى ووسّع فرق المبيعات في HubSpot و Zendesk. يؤمن بالبيع الاستشاري.",
              avatar: "https://i.pravatar.cc/200?img=52",
              socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
            },
            {
              id: "tm6",
              name: "أماندا لي",
              role: "نائب رئيس نجاح العملاء",
              bio: "رائدة نجاح العملاء من Intercom. ملتزمة بضمان تحقيق كل عميل لأهدافه.",
              avatar: "https://i.pravatar.cc/200?img=24",
              socialLinks: [
                { platform: "LinkedIn", url: "https://linkedin.com" },
                { platform: "Twitter", url: "https://twitter.com" },
              ],
            },
          ],
        },
      },

      // 3. قسم الوظائف
      {
        id: "s3",
        title: "انضم إلى فريقنا",
        subtitle: "ساعدنا في بناء مستقبل العمل",
        type: "careers",
        order: 3,
        content: {
          jobOpenings: [
            {
              id: "job1",
              title: "مهندس Full-Stack أول",
              department: "الهندسة",
              location: "سان فرانسيسكو، كاليفورنيا / عن بعد",
              type: "دوام كامل",
              description:
                "ابنِ ميزات قابلة للتوسع يستخدمها الملايين. اعمل مع React و Node.js وتقنيات السحابة المتطورة.",
              applyLink: "/careers/senior-fullstack-engineer",
            },
            {
              id: "job2",
              title: "مصمم منتجات",
              department: "التصميم",
              location: "نيويورك، نيويورك / عن بعد",
              type: "دوام كامل",
              description: "أنشئ تجارب جميلة وبديهية تسعد المستخدمين. شكّل مستقبل منتجنا.",
              applyLink: "/careers/product-designer",
            },
            {
              id: "job3",
              title: "مدير نجاح العملاء",
              department: "نجاح العملاء",
              location: "أوستن، تكساس / عن بعد",
              type: "دوام كامل",
              description: "ساعد عملاءنا على تحقيق أهدافهم. بناء علاقات دائمة ودفع اعتماد المنتج.",
              applyLink: "/careers/customer-success-manager",
            },
            {
              id: "job4",
              title: "مهندس بيانات أول",
              department: "الهندسة",
              location: "سياتل، واشنطن / عن بعد",
              type: "دوام كامل",
              description:
                "ابنِ خطوط البيانات والبنية التحتية للتحليلات على نطاق واسع. اعمل مع تقنيات البيانات الضخمة.",
              applyLink: "/careers/senior-data-engineer",
            },
            {
              id: "job5",
              title: "مدير تسويق",
              department: "التسويق",
              location: "عن بعد",
              type: "دوام كامل",
              description: "قد حملات التسويق وعزز علامتنا التجارية. خبرة في SaaS B2B مطلوبة.",
              applyLink: "/careers/marketing-manager",
            },
          ],
        },
      },

      // 4. قسم الشهادات
      {
        id: "s4",
        title: "ماذا يقول عملاؤنا",
        subtitle: "موثوق به من قبل الفرق في جميع أنحاء العالم",
        type: "testimonials",
        order: 4,
        content: {
          variant: "fixed",
          layout: "horizontal",
          testimonials: [
            {
              id: "t1",
              name: "سارة جونسون",
              role: "الرئيس التنفيذي",
              company: "TechVentures Inc",
              avatar: "https://i.pravatar.cc/150?img=1",
              content:
                "حوّل إنوفيت هاب طريقة عمل فريقنا. لقد قللنا المهام اليدوية بنسبة 80٪ وإنتاجيتنا لم تكن أعلى من ذلك.",
              rating: 5,
            },
            {
              id: "t2",
              name: "مايكل تشين",
              role: "مدير التكنولوجيا التنفيذي",
              company: "DataFlow Systems",
              avatar: "https://i.pravatar.cc/150?img=13",
              content:
                "أفضل استثمار قمنا به هذا العام. الأتمتة بالذكاء الاصطناعي ذكية بشكل لا يصدق.",
              rating: 5,
            },
            {
              id: "t3",
              name: "إيميلي رودريغيز",
              role: "مدير المنتج",
              company: "ScaleUp Solutions",
              avatar: "https://i.pravatar.cc/150?img=5",
              content: "أخيرًا، منصة تفي بوعودها حقًا. دعم العملاء رائع.",
              rating: 5,
            },
          ],
        },
      },
    ],
  },

  // ============================================
  // صفحة الأسعار
  // ============================================
  {
    id: "3",
    slug: "pricing",
    title: "الأسعار",
    metadata: {
      title: "خطط الأسعار | تسعير بسيط وشفاف",
      description:
        "اختر الخطة المثالية لفريقك. ابدأ بنسخة تجريبية مجانية لمدة 14 يومًا. لا حاجة لبطاقة ائتمان. تبدأ الخطط من 29 دولارًا شهريًا.",
      keywords: "التسعير، الخطط، الاشتراك، النسخة التجريبية المجانية، تسعير المؤسسات",
      ogImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop",
      ogTitle: "أسعار إنوفيت هاب - خطط لكل حجم فريق",
      ogDescription: "تسعير شفاف بدون رسوم مخفية. ابدأ مجانًا، قم بالترقية في أي وقت.",
    },
    sections: [
      // 1. قسم التسعير
      {
        id: "s1",
        title: "تسعير بسيط وشفاف",
        subtitle: "اختر الخطة المثالية لحجم فريقك واحتياجاتك",
        type: "pricing",
        order: 1,
        content: {
          plans: [
            {
              id: "p1",
              name: "البداية",
              price: "$29",
              interval: "شهر",
              description: "مثالي للفرق الصغيرة والشركات الناشئة",
              features: [
                "حتى 10 أعضاء في الفريق",
                "50 جيجابايت تخزين سحابي",
                "أتمتة أساسية (100 مهمة/شهر)",
                "دعم البريد الإلكتروني",
                "تطبيقات الجوال (iOS و Android)",
                "التكاملات القياسية",
              ],
              ctaText: "ابدأ النسخة التجريبية المجانية",
              ctaLink: "/signup?plan=starter",
            },
            {
              id: "p2",
              name: "المحترف",
              price: "$99",
              interval: "شهر",
              description: "للشركات المتنامية التي تحتاج إلى المزيد من القوة",
              features: [
                "حتى 50 عضوًا في الفريق",
                "500 جيجابايت تخزين سحابي",
                "أتمتة متقدمة (مهام غير محدودة)",
                "دعم ذو أولوية عبر البريد الإلكتروني والدردشة",
                "سير عمل وقوالب مخصصة",
                "تحليلات وتقارير متقدمة",
                "مصادقة SSO و SAML",
                "الوصول إلى API",
              ],
              highlighted: true,
              ctaText: "ابدأ النسخة التجريبية المجانية",
              ctaLink: "/signup?plan=pro",
            },
            {
              id: "p3",
              name: "المؤسسات",
              price: "مخصص",
              description: "للمؤسسات الكبيرة ذات الاحتياجات المعقدة",
              features: [
                "أعضاء فريق غير محدودين",
                "تخزين غير محدود",
                "أتمتة وذكاء اصطناعي على مستوى المؤسسات",
                "مدير نجاح مخصص",
                "تكاملات وتطوير مخصص",
                "أمان وامتثال متقدمان",
                "ضمانات SLA (وقت تشغيل 99.99٪)",
                "خيار النشر المحلي",
                "حلول العلامة البيضاء",
              ],
              ctaText: "اتصل بالمبيعات",
              ctaLink: "/contact",
            },
          ],
        },
      },

      // 2. قسم الأسئلة الشائعة
      {
        id: "s2",
        title: "الأسئلة المتكررة",
        subtitle: "كل ما تحتاج لمعرفته عن أسعارنا",
        type: "faq",
        order: 2,
        content: {
          faqs: [
            {
              id: "faq1",
              question: "كيف تعمل النسخة التجريبية المجانية لمدة 14 يومًا؟",
              answer:
                "تحصل على وصول كامل إلى جميع ميزات الخطة المحترفة لمدة 14 يومًا، مجانًا تمامًا. لا حاجة لبطاقة ائتمان للبدء. يمكنك الترقية أو التخفيض أو الإلغاء في أي وقت أثناء الفترة التجريبية أو بعدها.",
            },
            {
              id: "faq2",
              question: "هل يمكنني إلغاء اشتراكي في أي وقت؟",
              answer:
                "نعم! يمكنك إلغاء اشتراكك في أي وقت بدون عقوبات أو رسوم. إذا ألغيت، ستحتفظ بالوصول حتى نهاية فترة الفوترة الحالية، ولن نفرض عليك رسومًا مرة أخرى.",
            },
            {
              id: "faq3",
              question: "ما مدى أمان بياناتي؟",
              answer:
                "الأمان هو أولويتنا القصوى. نستخدم تشفير 256 بت على مستوى البنوك، ومراكز بيانات معتمدة من SOC 2 Type II، ونتوافق مع GDPR و HIPAA واللوائح الرئيسية الأخرى. يتم نسخ بياناتك احتياطيًا يوميًا ويمكنك تصديرها في أي وقت.",
            },
            {
              id: "faq4",
              question: "هل تقدمون مساعدة في الترحيل؟",
              answer:
                "بالتأكيد! يوفر فريق نجاح العملاء لدينا مساعدة مجانية في الترحيل لجميع الخطط المحترفة وخطط المؤسسات. سنساعدك في استيراد بياناتك، وإعداد سير العمل، وتدريب فريقك.",
            },
            {
              id: "faq5",
              question: "ما هي التكاملات التي تدعمونها؟",
              answer:
                "نتكامل مع أكثر من 500 أداة شائعة بما في ذلك Slack و Microsoft Teams و Google Workspace و Salesforce و HubSpot و Jira و GitHub والعديد من الأدوات الأخرى. نوفر أيضًا API قوي للتكاملات المخصصة.",
            },
            {
              id: "faq6",
              question: "هل يمكنني ترقية أو تخفيض خطتي؟",
              answer:
                "نعم! يمكنك تغيير خطتك في أي وقت. الترقيات تدخل حيز التنفيذ على الفور، والتخفيضات تدخل حيز التنفيذ في بداية دورة الفوترة التالية. سنقوم بحساب أي رسوم بشكل تناسبي وفقًا لذلك.",
            },
            {
              id: "faq7",
              question: "هل تقدمون خصومات للمنظمات غير الربحية أو المؤسسات التعليمية؟",
              answer:
                "نعم! نقدم خصومات بنسبة 50٪ للمنظمات غير الربحية والمؤسسات التعليمية المؤهلة. اتصل بفريق المبيعات لدينا لمعرفة المزيد والتحقق من أهليتك.",
            },
            {
              id: "faq8",
              question: "ما هي طرق الدفع التي تقبلونها؟",
              answer:
                "نقبل جميع بطاقات الائتمان الرئيسية (Visa و MasterCard و American Express و Discover) و PayPal والتحويلات البنكية لخطط المؤسسات. يتم معالجة جميع المدفوعات بشكل آمن من خلال Stripe.",
            },
          ],
        },
      },

      // 3. قسم الشهادات
      {
        id: "s3",
        title: "محبوب من قبل الفرق في جميع أنحاء العالم",
        subtitle: "اطلع على ما يقوله أكثر من 50,000 عميل لدينا",
        type: "testimonials",
        order: 3,
        content: {
          variant: "fixed",
          layout: "horizontal",
          testimonials: [
            {
              id: "t1",
              name: "ديفيد بارك",
              role: "مدير العمليات",
              company: "GlobalTech Ltd",
              avatar: "https://i.pravatar.cc/150?img=12",
              content:
                "كان التنفيذ سلسًا، والتدريب سهلاً، والاعتماد كان فوريًا. فريقنا يحبه. لقد وفرنا مئات الساعات كل شهر.",
              rating: 5,
            },
            {
              id: "t2",
              name: "ليزا أندرسون",
              role: "مدير التسويق",
              company: "BrandBoost Agency",
              avatar: "https://i.pravatar.cc/150?img=9",
              content:
                "ميزات التحليلات والتقارير تمنحنا رؤى لم نكن نمتلكها من قبل. يمكننا الآن اتخاذ قرارات مبنية على البيانات بثقة.",
              rating: 5,
            },
            {
              id: "t3",
              name: "جيمس ويلسون",
              role: "المؤسس",
              company: "StartupHub",
              avatar: "https://i.pravatar.cc/150?img=14",
              content:
                "كشركة ناشئة، احتجنا إلى شيء قوي ومعقول التكلفة. إنوفيت هاب فحص جميع الصناديق وأكثر. موصى به بشدة!",
              rating: 5,
            },
          ],
        },
      },
    ],
  },

  // ============================================
  // صفحة الاتصال
  // ============================================
  {
    id: "4",
    slug: "contact",
    title: "اتصل بنا",
    metadata: {
      title: "اتصل بإنوفيت هاب - تواصل مع فريقنا",
      description:
        "هل لديك أسئلة؟ تريد حجز عرض توضيحي؟ فريقنا هنا للمساعدة. البريد الإلكتروني أو الهاتف أو قم بزيارة مكتبنا في سان فرانسيسكو.",
      keywords: "الاتصال، الدعم، العرض التوضيحي، المبيعات، خدمة العملاء، موقع المكتب",
      ogImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=630&fit=crop",
      ogTitle: "اتصل بإنوفيت هاب - نحن هنا للمساعدة",
      ogDescription: "تواصل مع فريقنا للحصول على الدعم أو العروض التوضيحية أو الاستفسارات العامة.",
    },
    sections: [
      // 1. قسم الاتصال
      {
        id: "s1",
        title: "تواصل معنا",
        subtitle: "نحب أن نسمع منك",
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

      // 2. قسم طلب العرض التوضيحي
      {
        id: "s2",
        title: "حدد موعدًا لعرض توضيحي مخصص",
        subtitle: "شاهد إنوفيت هاب أثناء العمل مع فريقنا",
        type: "demo_request",
        order: 2,
        content: {
          formFields: [
            {
              name: "firstName",
              label: "الاسم الأول",
              type: "text",
              required: true,
              placeholder: "أحمد",
            },
            {
              name: "lastName",
              label: "اسم العائلة",
              type: "text",
              required: true,
              placeholder: "محمد",
            },
            {
              name: "email",
              label: "البريد الإلكتروني للعمل",
              type: "email",
              required: true,
              placeholder: "ahmed@company.com",
            },
            {
              name: "company",
              label: "اسم الشركة",
              type: "text",
              required: true,
              placeholder: "شركة التقنية",
            },
            {
              name: "companySize",
              label: "حجم الشركة",
              type: "select",
              required: true,
              options: [
                { label: "1-10 موظفين", value: "1-10" },
                { label: "11-50 موظفًا", value: "11-50" },
                { label: "51-200 موظف", value: "51-200" },
                { label: "201-500 موظف", value: "201-500" },
                { label: "501-1000 موظف", value: "501-1000" },
                { label: "أكثر من 1000 موظف", value: "1000+" },
              ],
            },
            {
              name: "role",
              label: "دورك",
              type: "select",
              required: true,
              options: [
                { label: "مدير تنفيذي من المستوى C", value: "c-level" },
                { label: "نائب رئيس/مدير", value: "vp-director" },
                { label: "مدير", value: "manager" },
                { label: "قائد فريق", value: "team-lead" },
                { label: "مساهم فردي", value: "ic" },
                { label: "آخر", value: "other" },
              ],
            },
            {
              name: "phone",
              label: "رقم الهاتف",
              type: "tel",
              required: false,
              placeholder: "+966 50 123 4567",
            },
            {
              name: "message",
              label: "ما الذي تريد مناقشته؟",
              type: "textarea",
              required: false,
              placeholder: "أخبرنا عن احتياجات فريقك والتحديات التي تواجهها...",
            },
          ],
          submitText: "طلب عرض توضيحي",
        },
      },

      // 3. قسم الأسئلة الشائعة
      {
        id: "s3",
        title: "الأسئلة الشائعة",
        subtitle: "إجابات سريعة قبل التواصل",
        type: "faq",
        order: 3,
        content: {
          faqs: [
            {
              id: "faq1",
              question: "ما نوع الدعم الذي تقدمونه؟",
              answer:
                "خطط البداية تحصل على دعم البريد الإلكتروني مع وقت استجابة 24 ساعة. الخطط المحترفة تحصل على دعم ذو أولوية عبر البريد الإلكتروني والدردشة. عملاء المؤسسات يحصلون على مدير نجاح مخصص ودعم عبر الهاتف مع ضمانات SLA.",
            },
            {
              id: "faq2",
              question: "ما مدى سرعة الحصول على موعد للعرض التوضيحي؟",
              answer:
                "يتم جدولة معظم العروض التوضيحية في غضون 24-48 ساعة. للطلبات العاجلة، يمكنك أيضًا الاتصال بنا مباشرة على +1 (888) 555-0100 وسنبذل قصارى جهدنا لاستيعابك.",
            },
            {
              id: "faq3",
              question: "هل تقدمون تدريبًا في الموقع؟",
              answer:
                "نعم! يمكن لعملاء المؤسسات طلب التدريب في الموقع ودعم التنفيذ. سنرسل عضو فريق مخصصًا إلى مكتبك لضمان الاعتماد السلس.",
            },
            {
              id: "faq4",
              question: "أين تقع مكاتبكم؟",
              answer:
                "مقرنا الرئيسي في سان فرانسيسكو، كاليفورنيا، ولكن لدينا أعضاء فريق موزعون في جميع أنحاء العالم. نقدم الدعم على مدار الساعة طوال أيام الأسبوع بغض النظر عن منطقتك الزمنية.",
            },
          ],
        },
      },
    ],
  },
];
