import CollapseGroup from "@/components/collapse";
import Button from "@/components/core/button";
import Form, { InputProps } from "@/components/form";
import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

const LandingPageManagementBuilder = () => {
  const { t } = useTranslation();

  const sectionContentsFormSchema = (formik: FormikProps<Record<string, unknown>>) => {
    const schema: InputProps[] = [
      {
        name: "sectionTitle",
        label: t("Auth.LandingPage.Builder.Section.Title"),
        type: "text",
        placeholder: "Enter section title",
        fullWidth: true,
        required: true,
      },
      {
        name: "sectionType",
        label: t("Auth.LandingPage.Builder.Section.Types.Title"),
        type: "select",
        options: [
          { label: t("Auth.LandingPage.Builder.Section.Types.Hero"), value: "hero" },
          { label: t("Auth.LandingPage.Builder.Section.Types.Features"), value: "features" },
          { label: t("Auth.LandingPage.Builder.Section.Types.Pricing"), value: "pricing" },
          { label: t("Auth.LandingPage.Builder.Section.Types.FAQ"), value: "faq" },
          {
            label: t("Auth.LandingPage.Builder.Section.Types.Testimonials"),
            value: "testimonials",
          },
          { label: t("Auth.LandingPage.Builder.Section.Types.Blog"), value: "blog" },
          { label: t("Auth.LandingPage.Builder.Section.Types.Contact"), value: "contact" },
          { label: t("Auth.LandingPage.Builder.Section.Types.ClientsPartners"), value: "clients" },
          { label: t("Auth.LandingPage.Builder.Section.Types.Team"), value: "team" },
          { label: t("Auth.LandingPage.Builder.Section.Types.About"), value: "about" },
          { label: t("Auth.LandingPage.Builder.Section.Types.HowItWorks"), value: "how_it_works" },
          { label: t("Auth.LandingPage.Builder.Section.Types.DemoRequest"), value: "demo_request" },
          { label: t("Auth.LandingPage.Builder.Section.Types.Careers"), value: "careers" },
        ],
        fullWidth: true,
        required: true,
      },
    ];

    const heroSchema = [
      {
        name: "heroHeading",
        label: "Hero Heading",
        type: "text",
        placeholder: "Enter hero heading",
        fullWidth: true,
      },
      {
        name: "heroSubheading",
        label: "Hero Subheading",
        type: "text",
        placeholder: "Enter hero subheading",
        fullWidth: true,
      },
      {
        name: "heroBackgroundImage",
        label: "Hero Background Image",
        type: "file",
        placeholder: "Upload background image",
        fullWidth: true,
      },
    ];

    const featuresSchema = [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ],
        fullWidth: true,
      },
      {
        name: "featuresList",
        label: "Features List",
        type: "textarea",
        placeholder: "Enter features, one per line",
        fullWidth: true,
      },
    ];

    const pricingSchema = [
      {
        name: "pricingPlans",
        label: "Pricing Plans",
        type: "textarea",
        placeholder: "Enter pricing plans in JSON format",
        fullWidth: true,
      },
    ];

    const faqSchema = [
      {
        name: "faqs",
        label: "FAQs",
        type: "textarea",
        placeholder: "Enter FAQs in JSON format",
        fullWidth: true,
      },
    ];

    const testimonialsSchema = [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { label: "Slider", value: "slider" },
          { label: "Fixed", value: "fixed" },
        ],
        fullWidth: true,
      },
      {
        name: "layout",
        label: "Layout",
        type: "select",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ],
        fullWidth: true,
      },
      {
        name: "testimonials",
        label: "Testimonials",
        type: "textarea",
        placeholder: "Enter testimonials in JSON format",
        fullWidth: true,
      },
    ];

    const blogSchema = [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { label: "Slider", value: "slider" },
          { label: "Fixed", value: "fixed" },
        ],
        fullWidth: true,
      },
      {
        name: "numberOfPosts",
        label: "Number of Posts",
        type: "number",
        placeholder: "Enter number of blog posts to display",
        fullWidth: true,
      },
    ];

    const contactSchema = [
      {
        name: "contactEmail",
        label: "Contact Email",
        type: "email",
        placeholder: "Enter contact email",
        fullWidth: true,
      },
      {
        name: "contactPhone",
        label: "Contact Phone",
        type: "text",
        placeholder: "Enter contact phone number",
        fullWidth: true,
      },
      {
        name: "map",
        label: "Map Location",
        type: "text",
        placeholder: "Enter contact phone number",
        fullWidth: true,
      },
    ];

    const clientsSchema = [
      {
        name: "clientsLogos",
        label: "Clients Logos",
        type: "textarea",
        placeholder: "Enter clients logos URLs in JSON format",
        fullWidth: true,
      },
    ];

    const teamSchema = [
      {
        name: "teamMembers",
        label: "Team Members",
        type: "textarea",
        placeholder: "Enter team members in JSON format",
        fullWidth: true,
      },
    ];

    const aboutSchema = [
      {
        name: "aboutStatistics",
        label: "About Statistics",
        type: "textarea",
        placeholder: "Enter about us statistics in JSON format",
        fullWidth: true,
      },
      {
        name: "aboutContent",
        label: "About Content",
        type: "textarea",
        placeholder: "Enter about us content",
        fullWidth: true,
      },
    ];

    const howItWorksSchema = [
      {
        name: "steps",
        label: "How It Works Steps",
        type: "textarea",
        placeholder: "Enter steps in JSON format",
        fullWidth: true,
      },
    ];

    const demoRequestSchema = [
      {
        name: "demoRequestFormFields",
        label: "Demo Request Form Fields",
        type: "textarea",
        placeholder: "Enter demo request form fields in JSON format",
        fullWidth: true,
      },
    ];

    const careersSchema = [
      {
        name: "jobOpenings",
        label: "Job Openings",
        type: "textarea",
        placeholder: "Enter job openings in JSON format",
        fullWidth: true,
      },
    ];

    switch (formik.values.sectionType) {
      case "hero":
        schema.push(...heroSchema);
        break;
      case "features":
        schema.push(...featuresSchema);
        break;
      case "pricing":
        schema.push(...pricingSchema);
        break;
      case "faq":
        schema.push(...faqSchema);
        break;
      case "testimonials":
        schema.push(...testimonialsSchema);
        break;
      case "blog":
        schema.push(...blogSchema);
        break;
      case "contact":
        schema.push(...contactSchema);
        break;
      case "clients":
        schema.push(...clientsSchema);
        break;
      case "team":
        schema.push(...teamSchema);
        break;
      case "about":
        schema.push(...aboutSchema);
        break;
      case "how_it_works":
        schema.push(...howItWorksSchema);
        break;
      case "demo_request":
        schema.push(...demoRequestSchema);
        break;
      case "careers":
        schema.push(...careersSchema);
        break;
      default:
        break;
    }

    return schema;
  };

  const SectionContentManagement = () => {
    return (
      <div>
        <Form inputs={sectionContentsFormSchema} />

        <div className="text-end mt-3">
          <Button outline color="danger" className="w-100">
            Delete Section
          </Button>
        </div>
      </div>
    );
  };

  const contentSectionsCollapseItems = [
    {
      title: "Section 1",
      content: (
        <Fragment>
          <SectionContentManagement />
        </Fragment>
      ),
    },
    {
      title: "Section 2",
      content: (
        <Fragment>
          <SectionContentManagement />
        </Fragment>
      ),
    },
  ];

  const contentPagesCollapseItems = [
    {
      title: "Page 1",
      content: (
        <Fragment>
          <div className="text-end mb-3">
            <Button>Add New Section</Button>
          </div>

          <CollapseGroup items={contentSectionsCollapseItems} />

          <div className="text-end mt-3">
            <Button outline color="danger" className="w-100">
              Delete Page
            </Button>
          </div>
        </Fragment>
      ),
    },
    {
      title: "Page 2",
      content: (
        <Fragment>
          <div className="text-end mb-3">
            <Button>Add New Section</Button>
          </div>

          <CollapseGroup items={contentSectionsCollapseItems} />

          <div className="text-end mt-3">
            <Button outline color="danger" className="w-100">
              Delete Page
            </Button>
          </div>
        </Fragment>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="card-body">
        {/* Multi-page builder, where each page would contain sections (shown if page selected), and each section management is about selecting section type and insert contents accordingly (shown*/}

        <div className="text-end mb-3">
          <Button>Add New Page</Button>
        </div>

        <CollapseGroup items={contentPagesCollapseItems} />
      </div>
    </div>
  );
};

export default LandingPageManagementBuilder;
