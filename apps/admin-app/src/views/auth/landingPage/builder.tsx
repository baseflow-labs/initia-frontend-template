import CollapseGroup from "@initia/shared/ui/components/collapse";
import Button from "@initia/shared/ui/components/core/button";
import Form, { InputProps } from "@initia/shared/ui/components/form";
import Modal from "@initia/shared/ui/components/modal";
import { faGripVertical, faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";

import * as LandingApi from "@/api/landingContent";
import type { LandingPage, LandingSection, SectionType } from "@/api/landingContent";

// ─── Section-type form content schemas ────────────────────────────────────────

const SECTION_TYPES: { label: string; value: SectionType }[] = [
  { label: "Hero", value: "hero" },
  { label: "Features", value: "features" },
  { label: "Pricing", value: "pricing" },
  { label: "FAQ", value: "faq" },
  { label: "Testimonials", value: "testimonials" },
  { label: "Blog", value: "blog" },
  { label: "Contact", value: "contact" },
  { label: "Clients / Partners", value: "clients" },
  { label: "Team", value: "team" },
  { label: "About", value: "about" },
  { label: "How It Works", value: "how_it_works" },
  { label: "Demo Request", value: "demo_request" },
  { label: "Careers", value: "careers" },
  { label: "CTA", value: "cta" },
  { label: "Privacy Policy", value: "privacy_policy" },
  { label: "Terms of Service", value: "terms_of_service" },
  { label: "Footer", value: "footer" },
  { label: "Prompt Input", value: "prompt_input" },
  { label: "Partners", value: "partners" },
  { label: "Text Blocks", value: "text_blocks" },
  { label: "Carousel", value: "carousel" },
  { label: "Image Blocks", value: "image_blocks" },
  { label: "Video Blocks", value: "video_blocks" },
  { label: "Social Links", value: "social_links" },
  { label: "Accordion", value: "accordion" },
  { label: "Chat / Command Prompt", value: "chat_prompt" },
  { label: "Google Map", value: "google_map" },
  { label: "Blog Single", value: "blog_single" },
  { label: "Blog List", value: "blog_list" },
  { label: "Blog Carousel", value: "blog_carousel" },
];

function getSectionContentSchema(type?: SectionType): InputProps[] {
  switch (type) {
    case "hero":
      return [
        { name: "heading", label: "Heading", type: "text", fullWidth: true, required: true },
        { name: "subheading", label: "Subheading", type: "text", fullWidth: true },
        { name: "backgroundImage", label: "Background Image URL", type: "text", fullWidth: true },
        { name: "ctaText", label: "CTA Button Text", type: "text", fullWidth: true },
        { name: "ctaLink", label: "CTA Button Link", type: "text", fullWidth: true },
        { name: "secondaryCtaText", label: "Secondary CTA Text", type: "text", fullWidth: true },
        { name: "secondaryCtaLink", label: "Secondary CTA Link", type: "text", fullWidth: true },
      ];
    case "features":
      return [
        {
          name: "variant",
          label: "Layout Variant",
          type: "select",
          fullWidth: true,
          options: [
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ],
        },
        {
          name: "features",
          label: "Features (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"id":"1","title":"Fast","description":"Very fast","icon":"⚡"}]',
        },
      ];
    case "pricing":
      return [
        {
          name: "plans",
          label: "Pricing Plans (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder:
            '[{"id":"1","name":"Pro","price":"$49","interval":"mo","features":["Unlimited users"],"highlighted":true}]',
        },
      ];
    case "faq":
      return [
        {
          name: "faqs",
          label: "FAQ Items (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"id":"1","question":"What is this?","answer":"This is our product."}]',
        },
      ];
    case "testimonials":
      return [
        {
          name: "variant",
          label: "Display Variant",
          type: "select",
          fullWidth: true,
          options: [
            { label: "Slider", value: "slider" },
            { label: "Fixed", value: "fixed" },
          ],
        },
        {
          name: "layout",
          label: "Layout",
          type: "select",
          fullWidth: true,
          options: [
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ],
        },
        {
          name: "testimonials",
          label: "Testimonials (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"id":"1","name":"Alice","role":"CEO","content":"Amazing!","rating":5}]',
        },
      ];
    case "blog":
      return [
        {
          name: "variant",
          label: "Display Variant",
          type: "select",
          fullWidth: true,
          options: [
            { label: "Slider", value: "slider" },
            { label: "Fixed", value: "fixed" },
          ],
        },
        { name: "numberOfPosts", label: "Number of Posts", type: "number", fullWidth: true },
        {
          name: "posts",
          label: "Blog Posts Override (JSON array, optional)",
          type: "textarea",
          fullWidth: true,
          placeholder: '[{"id":"1","title":"Post Title","excerpt":"Summary","author":"Jane"}]',
        },
      ];
    case "contact":
      return [
        { name: "email", label: "Contact Email", type: "email", fullWidth: true },
        { name: "phone", label: "Contact Phone", type: "text", fullWidth: true },
        { name: "address", label: "Address", type: "text", fullWidth: true },
        {
          name: "mapLocation",
          label: "Map Embed URL / Coordinates",
          type: "text",
          fullWidth: true,
        },
      ];
    case "clients":
      return [
        {
          name: "logos",
          label: "Client Logos (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"id":"1","name":"ACME","logo":"https://example.com/logo.png"}]',
        },
      ];
    case "team":
      return [
        {
          name: "members",
          label: "Team Members (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"id":"1","name":"John Doe","role":"CTO","bio":"Engineering lead"}]',
        },
      ];
    case "about":
      return [
        {
          name: "content",
          label: "About Content",
          type: "textarea",
          fullWidth: true,
          required: true,
        },
        { name: "image", label: "Image URL", type: "text", fullWidth: true },
        {
          name: "statistics",
          label: "Statistics (JSON array)",
          type: "textarea",
          fullWidth: true,
          placeholder: '[{"id":"1","label":"Users","value":"50k+"}]',
        },
      ];
    case "how_it_works":
      return [
        {
          name: "steps",
          label: "Steps (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder:
            '[{"id":"1","title":"Sign Up","description":"Create your account","icon":"🚀"}]',
        },
      ];
    case "demo_request":
      return [
        { name: "submitText", label: "Submit Button Text", type: "text", fullWidth: true },
        {
          name: "formFields",
          label: "Form Fields (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"name":"email","label":"Email","type":"email","required":true}]',
        },
      ];
    case "careers":
      return [
        {
          name: "jobOpenings",
          label: "Job Openings (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder:
            '[{"id":"1","title":"Frontend Engineer","department":"Engineering","location":"Remote"}]',
        },
      ];
    case "cta":
      return [
        { name: "heading", label: "Heading", type: "text", fullWidth: true, required: true },
        { name: "description", label: "Description", type: "textarea", fullWidth: true },
        { name: "buttonText", label: "Button Text", type: "text", fullWidth: true },
        { name: "buttonLink", label: "Button Link", type: "text", fullWidth: true },
      ];
    case "privacy_policy":
    case "terms_of_service":
      return [
        { name: "content", label: "Content", type: "textarea", fullWidth: true, required: true },
      ];
    case "footer":
      return [
        { name: "copyright", label: "Copyright", type: "text", fullWidth: true },
        {
          name: "links",
          label: "Links (JSON array)",
          type: "textarea",
          fullWidth: true,
          placeholder: '[{"label":"Privacy","url":"/privacy-policy"}]',
        },
      ];
    case "prompt_input":
    case "chat_prompt":
      return [
        {
          name: "placeholder",
          label: "Placeholder",
          type: "text",
          fullWidth: true,
          required: true,
        },
        { name: "submitText", label: "Submit Text", type: "text", fullWidth: true },
      ];
    case "partners":
    case "image_blocks":
      return [
        {
          name: "items",
          label: "Items (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"title":"Item","image":"https://...","link":"https://..."}]',
        },
      ];
    case "text_blocks":
      return [
        {
          name: "blocks",
          label: "Blocks (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"title":"Block","text":"Body text"}]',
        },
      ];
    case "carousel":
      return [
        {
          name: "slides",
          label: "Slides (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"title":"Slide","description":"...","image":"https://..."}]',
        },
      ];
    case "video_blocks":
      return [
        {
          name: "videos",
          label: "Videos (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"title":"Video","url":"https://youtube.com/..."}]',
        },
      ];
    case "social_links":
      return [
        {
          name: "links",
          label: "Social Links (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"platform":"x","url":"https://x.com/..."}]',
        },
      ];
    case "accordion":
      return [
        {
          name: "items",
          label: "Accordion Items (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"title":"Q","content":"A"}]',
        },
      ];
    case "google_map":
      return [
        { name: "embedUrl", label: "Embed URL", type: "text", fullWidth: true, required: true },
        { name: "address", label: "Address", type: "text", fullWidth: true },
      ];
    case "blog_single":
      return [
        { name: "title", label: "Post Title", type: "text", fullWidth: true, required: true },
        { name: "excerpt", label: "Excerpt", type: "textarea", fullWidth: true },
        { name: "content", label: "Content", type: "textarea", fullWidth: true, required: true },
        { name: "image", label: "Image URL", type: "text", fullWidth: true },
      ];
    case "blog_list":
      return [
        {
          name: "posts",
          label: "Posts (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"id":"1","title":"Post","excerpt":"...","slug":"post"}]',
        },
      ];
    case "blog_carousel":
      return [
        {
          name: "posts",
          label: "Posts (JSON array)",
          type: "textarea",
          fullWidth: true,
          required: true,
          placeholder: '[{"id":"1","title":"Post","excerpt":"...","slug":"post"}]',
        },
      ];
    default:
      return [];
  }
}

function parseJsonContent(raw: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") {
      try {
        result[k] = JSON.parse(v);
      } catch {
        result[k] = v;
      }
    } else {
      result[k] = v;
    }
  }
  return result;
}

function serializeContentForForm(content: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(content)) {
    result[k] =
      Array.isArray(v) || (v !== null && typeof v === "object")
        ? JSON.stringify(v, null, 2)
        : (v ?? "");
  }
  return result;
}

// ─── Section editor ────────────────────────────────────────────────────────────

const SectionEditor = ({
  section,
  onSaved,
  onDeleted,
}: {
  section: LandingSection;
  onSaved: (s: LandingSection) => void;
  onDeleted: () => void;
}) => {
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const schema = (formik: FormikProps<Record<string, unknown>>): InputProps[] => [
    { name: "title", label: "Section Title", type: "text", fullWidth: true, required: true },
    { name: "subtitle", label: "Section Subtitle", type: "text", fullWidth: true },
    {
      name: "sectionType",
      label: "Section Type",
      type: "select",
      fullWidth: true,
      required: true,
      options: SECTION_TYPES,
    },
    ...getSectionContentSchema((formik.values.sectionType as SectionType) || section.type),
  ];

  const initialValues: Record<string, unknown> = {
    title: section.title,
    subtitle: section.subtitle ?? "",
    sectionType: section.type,
    ...serializeContentForForm(section.content),
  };

  const handleSave = async (values?: Record<string, unknown>) => {
    if (!values) return;
    setSaving(true);
    try {
      const { title, subtitle, sectionType, ...rest } = values;
      const updated = await LandingApi.updateSection(section.id, {
        title: title as string,
        subtitle: subtitle as string,
        type: sectionType as SectionType,
        content: parseJsonContent(rest),
      });
      onSaved(updated);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t("Auth.LandingPage.Builder.Section.DeleteConfirm", "Delete this section?")))
      return;
    setDeleting(true);
    try {
      await LandingApi.deleteSection(section.id);
      onDeleted();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <Form
        inputs={schema}
        initialValues={initialValues}
        onFormSubmit={handleSave}
        submitText={saving ? "Saving…" : t("Global.Form.Labels.Save")}
        loading={saving}
      />
      <div className="mt-2">
        <Button outline color="danger" className="w-100" onClick={handleDelete} disabled={deleting}>
          {deleting ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            t("Global.Form.Labels.Delete", "Delete Section")
          )}
        </Button>
      </div>
    </div>
  );
};

// ─── Add Section modal ─────────────────────────────────────────────────────────

const AddSectionModal = ({
  pageId,
  nextOrder,
  isOpen,
  onClose,
  onCreated,
}: {
  pageId: string;
  nextOrder: number;
  isOpen: boolean;
  onClose: () => void;
  onCreated: (s: LandingSection) => void;
}) => {
  const [saving, setSaving] = useState(false);

  const schema = (formik: FormikProps<Record<string, unknown>>): InputProps[] => [
    { name: "title", label: "Section Title", type: "text", fullWidth: true, required: true },
    { name: "subtitle", label: "Section Subtitle", type: "text", fullWidth: true },
    {
      name: "sectionType",
      label: "Section Type",
      type: "select",
      fullWidth: true,
      required: true,
      options: SECTION_TYPES,
    },
    ...getSectionContentSchema(formik.values.sectionType as SectionType),
  ];

  const handleSubmit = async (values?: Record<string, unknown>) => {
    if (!values) return;
    setSaving(true);
    try {
      const { title, subtitle, sectionType, ...rest } = values;
      const created = await LandingApi.createSection({
        title: title as string,
        subtitle: subtitle as string,
        type: sectionType as SectionType,
        content: parseJsonContent(rest),
        order: nextOrder,
        pageId,
      });
      onCreated(created);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Section" className="modal-lg">
      <Form
        inputs={schema}
        initialValues={{}}
        onFormSubmit={handleSubmit}
        submitText={saving ? "Adding…" : "Add Section"}
        loading={saving}
      />
    </Modal>
  );
};

// ─── Add Page modal ────────────────────────────────────────────────────────────

const AddPageModal = ({
  isOpen,
  onClose,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (p: LandingPage) => void;
}) => {
  const [saving, setSaving] = useState(false);

  const schema = (_f: FormikProps<Record<string, unknown>>): InputProps[] => [
    {
      name: "title",
      label: "Page Title",
      type: "text",
      fullWidth: true,
      required: true,
      placeholder: "Home",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      fullWidth: true,
      required: true,
      placeholder: "home",
    },
    {
      name: "locale",
      label: "Locale",
      type: "select",
      fullWidth: true,
      options: [
        { label: "English (en)", value: "en" },
        { label: "Arabic (ar)", value: "ar" },
      ],
    },
    { name: "metaTitle", label: "Meta Title", type: "text", fullWidth: true },
    { name: "metaDescription", label: "Meta Description", type: "textarea", fullWidth: true },
    { name: "metaKeywords", label: "Meta Keywords", type: "text", fullWidth: true },
  ];

  const handleSubmit = async (values?: Record<string, unknown>) => {
    if (!values) return;
    setSaving(true);
    try {
      const created = await LandingApi.createPage({
        title: values.title as string,
        slug: values.slug as string,
        locale: (values.locale as string) || "en",
        metadata: {
          title: values.metaTitle as string,
          description: values.metaDescription as string,
          keywords: values.metaKeywords as string,
        },
      });
      onCreated(created);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Page" className="modal-lg">
      <Form
        inputs={schema}
        initialValues={{ locale: "en" }}
        onFormSubmit={handleSubmit}
        submitText={saving ? "Creating…" : "Create Page"}
        loading={saving}
      />
    </Modal>
  );
};

// ─── Page editor (sections list + drag-reorder) ────────────────────────────────

const PageEditor = ({
  page,
  onPageUpdated,
  onPageDeleted,
}: {
  page: LandingPage;
  onPageUpdated: (p: LandingPage) => void;
  onPageDeleted: () => void;
}) => {
  const { t } = useTranslation();
  const [sections, setSections] = useState<LandingSection[]>([]);
  const [showAddSection, setShowAddSection] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dragRef = useRef<number | null>(null);

  useEffect(() => {
    setSections(page.sections ?? []);
  }, [page.id, page.sections]);

  const emitUpdate = (next: LandingSection[]) => {
    const updated = { ...page, sections: next };
    onPageUpdated(updated);
  };

  const handleDragStart = (index: number) => {
    dragRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const from = dragRef.current;
    if (from === null || from === index) return;
    const reordered = [...sections];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(index, 0, moved);
    dragRef.current = index;
    setSections(reordered);
  };

  const handleDragEnd = async () => {
    dragRef.current = null;
    await LandingApi.reorderSections(
      page.id,
      sections.map((s) => s.id)
    );
    emitUpdate(sections);
  };

  const sectionCollapseItems = sections.map((section, i) => ({
    title: (
      <span
        className="d-flex align-items-center gap-2"
        draggable
        onDragStart={() => handleDragStart(i)}
        onDragOver={(e) => handleDragOver(e, i)}
        onDragEnd={handleDragEnd}
        style={{ cursor: "grab", userSelect: "none" }}
      >
        <FontAwesomeIcon icon={faGripVertical} className="text-muted" />
        {section.title} <span className="badge bg-secondary ms-1">{section.type}</span>
      </span>
    ) as unknown as string,
    content: (
      <SectionEditor
        key={section.id}
        section={section}
        onSaved={(updated) => {
          const next = sections.map((s) => (s.id === updated.id ? updated : s));
          setSections(next);
          emitUpdate(next);
        }}
        onDeleted={() => {
          const next = sections.filter((s) => s.id !== section.id);
          setSections(next);
          emitUpdate(next);
        }}
      />
    ),
  }));

  const handleDeletePage = async () => {
    if (
      !confirm(
        t(
          "Auth.LandingPage.Builder.Page.DeleteConfirm",
          "Delete this entire page and all its sections?"
        )
      )
    )
      return;
    setDeleting(true);
    try {
      await LandingApi.deletePage(page.id);
      onPageDeleted();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small">
          {sections.length} section{sections.length !== 1 ? "s" : ""}
        </span>
        <Button size="sm" onClick={() => setShowAddSection(true)}>
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          {t("Auth.LandingPage.Builder.Section.Add", "Add Section")}
        </Button>
      </div>

      {sections.length === 0 && (
        <p className="text-muted small text-center py-3">
          {t("Auth.LandingPage.Builder.Section.Empty", "No sections yet. Add one above.")}
        </p>
      )}

      <CollapseGroup items={sectionCollapseItems} />

      <div className="mt-3">
        <Button
          outline
          color="danger"
          className="w-100"
          onClick={handleDeletePage}
          disabled={deleting}
        >
          {deleting ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            t("Auth.LandingPage.Builder.Page.Delete", "Delete Page")
          )}
        </Button>
      </div>

      <AddSectionModal
        pageId={page.id}
        nextOrder={sections.length}
        isOpen={showAddSection}
        onClose={() => setShowAddSection(false)}
        onCreated={(s) => {
          const next = [...sections, s];
          setSections(next);
          emitUpdate(next);
        }}
      />
    </Fragment>
  );
};

// ─── Main Builder ──────────────────────────────────────────────────────────────

interface LandingPageManagementBuilderProps {
  onPageSelect?: (page: LandingPage | null) => void;
}

const LandingPageManagementBuilder = ({ onPageSelect }: LandingPageManagementBuilderProps) => {
  const { t } = useTranslation();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddPage, setShowAddPage] = useState(false);

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await LandingApi.getAllPages();
      setPages(fetched ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const pageCollapseItems = pages.map((page) => ({
    title: `${page.title} (/${page.slug}) [${page.locale}]`,
    content: (
      <PageEditor
        key={page.id}
        page={page}
        onPageUpdated={(updated) => {
          setPages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
          onPageSelect?.(updated);
        }}
        onPageDeleted={() => {
          setPages((prev) => prev.filter((p) => p.id !== page.id));
          onPageSelect?.(null);
        }}
      />
    ),
  }));

  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between align-items-center">
        <strong>{t("Auth.LandingPage.Builder.Title", "Pages")}</strong>
        <div className="d-flex gap-2">
          <Button size="sm" outline onClick={fetchPages} disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "↺"}
          </Button>
          <Button size="sm" onClick={() => setShowAddPage(true)}>
            <FontAwesomeIcon icon={faPlus} className="me-1" />
            {t("Auth.LandingPage.Builder.Page.Add", "New Page")}
          </Button>
        </div>
      </div>

      <div className="card-body overflow-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
        {loading ? (
          <div className="text-center py-4">
            <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          </div>
        ) : pages.length === 0 ? (
          <p className="text-muted text-center py-4">
            {t("Auth.LandingPage.Builder.Page.Empty", "No pages yet. Create one to get started.")}
          </p>
        ) : (
          <CollapseGroup items={pageCollapseItems} />
        )}
      </div>

      <AddPageModal
        isOpen={showAddPage}
        onClose={() => setShowAddPage(false)}
        onCreated={(page) => {
          setPages((prev) => [...prev, page]);
          onPageSelect?.(page);
        }}
      />
    </div>
  );
};

export default LandingPageManagementBuilder;
