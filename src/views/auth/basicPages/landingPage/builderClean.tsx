import Button from "@/components/core/button";
import Form, { InputProps } from "@/components/form";
import { useLandingPageBuilderPrototype, LandingPage, LandingPageSection } from "./hooksPrototype";
import Spinner from "@/components/core/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faCopy,
  faEye,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, MouseEvent } from "react";
import { FormikProps } from "formik";
// Types for SectionPreviewCard props
interface SectionPreviewCardProps {
  section: LandingPageSection;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onEdit?: () => void;
  onDelete?: (sectionId: string) => void;
  onDuplicate?: (sectionId: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  isFirst: boolean;
  isLast: boolean;
  loading: boolean;
}
// Inline SectionPreviewCard component
const SectionPreviewCard = ({
  section,
  index,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  loading,
}: SectionPreviewCardProps) => {
  const sectionTypeLabels: Record<string, string> = {
    hero: "🎯 Hero",
    features: "⭐ Features",
    pricing: "💰 Pricing",
    faq: "❓ FAQ",
    testimonials: "💬 Testimonials",
    blog: "📝 Blog",
    contact: "📧 Contact",
    clients: "🤝 Clients",
    team: "👥 Team",
    about: "ℹ️ About",
    how_it_works: "🔧 How It Works",
    demo_request: "🎬 Demo",
    careers: "💼 Careers",
  };

  return (
    <div
      className={`section-preview-card ${isSelected ? "selected" : ""} ${loading ? "loading" : ""}`}
      onClick={onSelect}
    >
      <div className="section-preview-header">
        <div className="section-info">
          <div className="section-details">
            <h6 className="section-title">{section.sectionTitle}</h6>
            <small className="section-type">
              {sectionTypeLabels[section.sectionType] || section.sectionType}
            </small>
          </div>
        </div>
        <span className="section-badge">{index + 1}</span>
      </div>

      <div className="section-preview-actions">
        <button
          type="button"
          className="btn btn-sm btn-icon"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onEdit?.();
          }}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button
          type="button"
          className="btn btn-sm btn-icon"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onDuplicate?.(section.id);
          }}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <div className="btn-group btn-group-sm ms-auto">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onMoveUp?.();
            }}
            disabled={isFirst || loading}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onMoveDown?.();
            }}
            disabled={isLast || loading}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-icon btn-danger"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (window.confirm("Delete this section?")) onDelete?.(section.id);
          }}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <style>{`
        .section-preview-card { border: 1px solid #dee2e6; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.2s; }
        .section-preview-card:hover { border-color: #007bff; box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1); }
        .section-preview-card.selected { border-color: #007bff; background: #f0f7ff; }
        .section-preview-card.loading { opacity: 0.6; pointer-events: none; }
        .section-preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
        .section-info { display: flex; align-items: center; gap: 0.75rem; }
        .section-details { min-width: 0; }
        .section-title { margin: 0; font-weight: 600; }
        .section-type { color: #6c757d; display: block; }
        .section-badge { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #e9ecef; border-radius: 50%; font-weight: 600; font-size: 0.875rem; }
        .section-preview-actions { display: flex; gap: 0.5rem; align-items: center; }
        .btn-icon { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 0; border: none; background: #f0f0f0; color: #495057; cursor: pointer; }
        .btn-icon:hover:not(:disabled) { background: #007bff; color: white; }
        .btn-icon.btn-danger { background: #f8f9fa; color: #dc3545; }
        .btn-icon.btn-danger:hover:not(:disabled) { background: #dc3545; color: white; }
      `}</style>
    </div>
  );
};

const LandingPageManagementBuilder = () => {
  const builder = useLandingPageBuilderPrototype();

  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [showPageForm, setShowPageForm] = useState(false);
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    builder.fetchPages();
  }, []);

  useEffect(() => {
    if (selectedPageId) {
      builder.fetchSectionsByPageId(selectedPageId);
    }
  }, [selectedPageId]);

  const handleAddPage = async () => {
    if (!pageName.trim()) return;
    const newPage = await builder.createPage({
      name: pageName,
      meta: {},
    });
    if (newPage) {
      setSelectedPageId(newPage.id);
      setPageName("");
      setShowPageForm(false);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      await builder.deletePage(pageId);
      if (selectedPageId === pageId) {
        setSelectedPageId(null);
      }
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!selectedPageId) return;
    await builder.deleteSection(selectedPageId, sectionId);
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null);
    }
  };

  const handleDuplicateSection = async (sectionId: string) => {
    if (!selectedPageId) return;
    await builder.duplicateSection(selectedPageId, sectionId);
  };

  const handleMoveSection = async (sectionId: string, direction: "up" | "down") => {
    const currentIndex = builder.sections.findIndex((s: LandingPageSection) => s.id === sectionId);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === builder.sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newOrder = [...builder.sections];
    [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];

    await builder.reorderSections(
      selectedPageId!,
      newOrder.map((s: LandingPageSection) => s.id)
    );
  };

  const editingSection =
    editingSectionId === "new"
      ? null
      : editingSectionId
        ? builder.sections.find((s: LandingPageSection) => s.id === editingSectionId)
        : null;

  // Type-specific schemas
  const getTypeSpecificSchema = (sectionType: string): InputProps[] => {
    const heroSchema: InputProps[] = [
      {
        name: "heroHeading",
        label: "Hero Heading",
        type: "text",
        placeholder: "Enter hero heading",
        fullWidth: true,
        required: true,
      },
      {
        name: "heroSubheading",
        label: "Hero Subheading",
        type: "text",
        placeholder: "Enter hero subheading",
        fullWidth: true,
      },
      {
        name: "ctaText",
        label: "CTA Button Text",
        type: "text",
        placeholder: "e.g., Get Started",
        fullWidth: true,
      },
      {
        name: "ctaLink",
        label: "CTA Button Link",
        type: "text",
        placeholder: "/signup",
        fullWidth: true,
      },
    ];

    const featuresSchema: InputProps[] = [
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
        label: "Features (JSON array)",
        type: "textarea",
        placeholder: '[{ "icon": "⚡", "title": "Fast", "description": "Lightning quick" }]',
        fullWidth: true,
      },
    ];

    const pricingSchema: InputProps[] = [
      {
        name: "pricingPlans",
        label: "Pricing Plans (JSON array)",
        type: "textarea",
        placeholder: '[{ "name": "Starter", "price": "$29", "features": ["Feature 1"] }]',
        fullWidth: true,
      },
    ];

    const faqSchema: InputProps[] = [
      {
        name: "faqs",
        label: "FAQs (JSON array)",
        type: "textarea",
        placeholder: '[{ "question": "What is this?", "answer": "..." }]',
        fullWidth: true,
      },
    ];

    const testimonialsSchema: InputProps[] = [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { label: "Slider", value: "slider" },
          { label: "Grid", value: "grid" },
        ],
        fullWidth: true,
      },
      {
        name: "testimonials",
        label: "Testimonials (JSON array)",
        type: "textarea",
        placeholder: '[{ "name": "John", "text": "...", "image": "..." }]',
        fullWidth: true,
      },
    ];

    const contactSchema: InputProps[] = [
      {
        name: "contactEmail",
        label: "Contact Email",
        type: "email",
        placeholder: "contact@example.com",
        fullWidth: true,
      },
      {
        name: "contactPhone",
        label: "Contact Phone",
        type: "text",
        placeholder: "+1 (555) 123-4567",
        fullWidth: true,
      },
      {
        name: "contactAddress",
        label: "Contact Address",
        type: "text",
        placeholder: "123 Main St, City, State",
        fullWidth: true,
      },
    ];

    const teamSchema: InputProps[] = [
      {
        name: "teamMembers",
        label: "Team Members (JSON array)",
        type: "textarea",
        placeholder: '[{ "name": "John Doe", "role": "CEO", "image": "..." }]',
        fullWidth: true,
      },
    ];

    const aboutSchema: InputProps[] = [
      {
        name: "aboutContent",
        label: "About Content",
        type: "textarea",
        placeholder: "Enter about us content",
        fullWidth: true,
      },
      {
        name: "aboutStats",
        label: "Stats (JSON array)",
        type: "textarea",
        placeholder: '[{ "number": "100+", "label": "Happy Clients" }]',
        fullWidth: true,
      },
    ];

    const clientsSchema: InputProps[] = [
      {
        name: "clientsLogos",
        label: "Clients Logos (JSON array)",
        type: "textarea",
        placeholder: '[{ "name": "Client", "logo": "url" }]',
        fullWidth: true,
      },
    ];

    const blogSchema: InputProps[] = [
      {
        name: "numberOfPosts",
        label: "Number of Posts to Display",
        type: "number",
        placeholder: "5",
        fullWidth: true,
      },
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: [
          { label: "Grid", value: "grid" },
          { label: "Slider", value: "slider" },
        ],
        fullWidth: true,
      },
    ];

    const howItWorksSchema: InputProps[] = [
      {
        name: "steps",
        label: "Steps (JSON array)",
        type: "textarea",
        placeholder: '[{ "number": 1, "title": "Step 1", "description": "..." }]',
        fullWidth: true,
      },
    ];

    const demoRequestSchema: InputProps[] = [
      {
        name: "demoEmail",
        label: "Demo Contact Email",
        type: "email",
        placeholder: "demo@example.com",
        fullWidth: true,
      },
      {
        name: "formFields",
        label: "Form Fields (JSON array)",
        type: "textarea",
        placeholder: '[{ "name": "fullName", "label": "Full Name", "type": "text" }]',
        fullWidth: true,
      },
    ];

    const careersSchema: InputProps[] = [
      {
        name: "jobOpenings",
        label: "Job Openings (JSON array)",
        type: "textarea",
        placeholder: '[{ "title": "Developer", "description": "...", "location": "..." }]',
        fullWidth: true,
      },
    ];

    const typeSchemas: Record<string, InputProps[]> = {
      hero: heroSchema,
      features: featuresSchema,
      pricing: pricingSchema,
      faq: faqSchema,
      testimonials: testimonialsSchema,
      contact: contactSchema,
      team: teamSchema,
      about: aboutSchema,
      clients: clientsSchema,
      blog: blogSchema,
      how_it_works: howItWorksSchema,
      demo_request: demoRequestSchema,
      careers: careersSchema,
    };

    return typeSchemas[sectionType] || [];
  };

  const SectionForm = () => {
    return (
      <div className="section-form card">
        <div className="card-body">
          <h6 className="card-title mb-3">
            {editingSection ? "Edit Section" : "Create New Section"}
          </h6>

          <Form
            initialValues={{
              sectionTitle: editingSection?.sectionTitle || "",
              sectionType: editingSection?.sectionType || "",
              ...editingSection?.content,
            }}
            inputs={(formik: FormikProps<Record<string, unknown>>) => {
              const schema: InputProps[] = [
                {
                  name: "sectionTitle",
                  label: "Section Title",
                  type: "text",
                  placeholder: "Enter section title",
                  fullWidth: true,
                  required: true,
                },
              ];

              // Only show type selector for new sections
              if (!editingSection) {
                schema.push({
                  name: "sectionType",
                  label: "Section Type",
                  type: "select",
                  options: [
                    { label: "Hero", value: "hero" },
                    { label: "Features", value: "features" },
                    { label: "Pricing", value: "pricing" },
                    { label: "FAQ", value: "faq" },
                    { label: "Testimonials", value: "testimonials" },
                    { label: "Blog", value: "blog" },
                    { label: "Contact", value: "contact" },
                    { label: "Clients & Partners", value: "clients" },
                    { label: "Team", value: "team" },
                    { label: "About", value: "about" },
                    { label: "How It Works", value: "how_it_works" },
                    { label: "Demo Request", value: "demo_request" },
                    { label: "Careers", value: "careers" },
                  ],
                  fullWidth: true,
                  required: true,
                });
              }

              // Add type-specific fields
              const typeSchema = getTypeSpecificSchema(
                editingSection?.sectionType || (formik.values.sectionType as string)
              );
              schema.push(...typeSchema);

              return schema;
            }}
            onFormSubmit={async (values?: Record<string, unknown>) => {
              if (!values) return;
              const { sectionTitle, sectionType, ...content } = values;
              if (editingSection) {
                await builder.updateSection(selectedPageId!, editingSectionId!, {
                  sectionTitle: sectionTitle as string,
                  content,
                });
              } else {
                await builder.createSection(selectedPageId!, {
                  sectionTitle: sectionTitle as string,
                  sectionType: sectionType as LandingPageSection["sectionType"],
                  content,
                });
              }
              setEditingSectionId(null);
            }}
            submitText={editingSection ? "Update Section" : "Create Section"}
          />

          <Button
            outline
            color="secondary"
            className="w-100 mt-3"
            onClick={() => setEditingSectionId(null)}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  };

  const PagesList = () => (
    <div className="pages-list">
      <div className="pages-header mb-3">
        <h5 className="m-0">Pages</h5>
        <Button size="sm" onClick={() => setShowPageForm(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add Page
        </Button>
      </div>

      {showPageForm && (
        <div className="page-form mb-3">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter page name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddPage();
              }}
            />
            <Button color="success" onClick={handleAddPage} disabled={!pageName.trim()}>
              Create
            </Button>
            <Button outline onClick={() => setShowPageForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {builder.loading ? (
        <Spinner />
      ) : builder.pages.length === 0 ? (
        <div className="alert alert-info">No pages yet. Create your first page!</div>
      ) : (
        <div className="pages-items">
          {builder.pages.map((page: LandingPage) => (
            <div
              key={page.id}
              className={`page-item ${selectedPageId === page.id ? "active" : ""}`}
              onClick={() => setSelectedPageId(page.id)}
            >
              <div className="page-name">{page.name}</div>
              <Button
                size="sm"
                outline
                color="danger"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  handleDeletePage(page.id);
                }}
                disabled={builder.saving}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .pages-header { display: flex; justify-content: space-between; align-items: center; }
        .page-item { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border: 1px solid #dee2e6; border-radius: 0.5rem; margin-bottom: 0.5rem; cursor: pointer; transition: all 0.2s; }
        .page-item:hover { border-color: #007bff; }
        .page-item.active { border-color: #007bff; background: #f0f7ff; }
        .page-name { font-weight: 500; flex: 1; }
      `}</style>
    </div>
  );

  const SectionsList = () => (
    <div className="sections-list">
      <div className="sections-header mb-3">
        <h5 className="m-0">Sections</h5>
        <Button size="sm" onClick={() => setEditingSectionId("new")} disabled={!selectedPageId}>
          <FontAwesomeIcon icon={faPlus} /> Add Section
        </Button>
      </div>

      {!selectedPageId ? (
        <div className="alert alert-warning">Select a page to add sections</div>
      ) : builder.loading ? (
        <Spinner />
      ) : builder.sections.length === 0 ? (
        <div className="alert alert-info">No sections yet. Add your first section!</div>
      ) : (
        <div className="sections-items">
          {builder.sections.map((section: LandingPageSection, index: number) => (
            <SectionPreviewCard
              key={section.id}
              section={section}
              index={index}
              isSelected={selectedSectionId === section.id}
              onSelect={() => setSelectedSectionId(section.id)}
              onEdit={() => setEditingSectionId(section.id)}
              onDelete={handleDeleteSection}
              onDuplicate={handleDuplicateSection}
              onMoveUp={() => handleMoveSection(section.id, "up")}
              onMoveDown={() => handleMoveSection(section.id, "down")}
              isFirst={index === 0}
              isLast={index === builder.sections.length - 1}
              loading={builder.saving}
            />
          ))}
        </div>
      )}

      <style>{`
        .sections-header { display: flex; justify-content: space-between; align-items: center; }
        .sections-items { max-height: 600px; overflow-y: auto; }
      `}</style>
    </div>
  );

  return (
    <div className="landing-page-builder">
      <div className="builder-container">
        <div className="builder-sidebar">
          <PagesList />
          <hr />
          <SectionsList />
        </div>

        <div className="builder-content">{editingSectionId && <SectionForm />}</div>
      </div>

      <style>{`
        .landing-page-builder { display: flex; flex-direction: column; gap: 1rem; }
        .builder-container { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .builder-sidebar { display: flex; flex-direction: column; gap: 2rem; }
        .builder-content { display: flex; flex-direction: column; gap: 1rem; }
        @media (max-width: 1200px) { .builder-container { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default LandingPageManagementBuilder;
