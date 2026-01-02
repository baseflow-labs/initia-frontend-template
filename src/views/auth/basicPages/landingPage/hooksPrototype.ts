import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/store/actions/notifications";

export interface LandingPage {
  id: string;
  name: string;
  meta: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface LandingPageSection {
  id: string;
  pageId: string;
  sectionType:
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
  sectionTitle: string;
  content: Record<string, unknown>;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const MOCK_PAGES: LandingPage[] = [
  {
    id: "page-1",
    name: "Home Page",
    meta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "page-2",
    name: "Pricing Page",
    meta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MOCK_SECTIONS: Record<string, LandingPageSection[]> = {
  "page-1": [
    {
      id: "section-1",
      pageId: "page-1",
      sectionType: "hero",
      sectionTitle: "Welcome Section",
      content: {
        heroHeading: "Welcome to our platform",
        heroSubheading: "Build amazing landing pages",
        ctaText: "Get Started",
        ctaLink: "/signup",
      },
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "section-2",
      pageId: "page-1",
      sectionType: "features",
      sectionTitle: "Features Section",
      content: {
        variant: "horizontal",
        featuresList: [
          { icon: "⚡", title: "Fast", description: "Lightning quick performance" },
          { icon: "🔒", title: "Secure", description: "Bank-level security" },
          { icon: "📱", title: "Responsive", description: "Works on all devices" },
        ],
      },
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  "page-2": [
    {
      id: "section-3",
      pageId: "page-2",
      sectionType: "pricing",
      sectionTitle: "Pricing Plans",
      content: {
        pricingPlans: [
          { name: "Starter", price: "$29", features: ["Feature 1", "Feature 2"] },
          { name: "Pro", price: "$79", features: ["Feature 1", "Feature 2", "Feature 3"] },
        ],
      },
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

export const useLandingPageBuilderPrototype = () => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState<LandingPage[]>([...MOCK_PAGES]);
  const [sections, setSections] = useState<LandingPageSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Simulate API delay
  const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      await delay();
      setPages([...MOCK_PAGES]);
    } catch {
      dispatch(
        addNotification({
          msg: "Failed to fetch pages",
          type: "err",
        })
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const createPage = useCallback(
    async (data: Omit<LandingPage, "id" | "createdAt" | "updatedAt">) => {
      setSaving(true);
      try {
        await delay();
        const newPage: LandingPage = {
          id: `page-${Date.now()}`,
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setPages((prev) => [...prev, newPage]);
        MOCK_PAGES.push(newPage);
        MOCK_SECTIONS[newPage.id] = [];

        dispatch(
          addNotification({
            msg: "Page created successfully",
          })
        );
        return newPage;
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to create page",
            type: "err",
          })
        );
        return null;
      } finally {
        setSaving(false);
      }
    },
    [dispatch]
  );

  const updatePage = useCallback(
    async (pageId: string, data: Partial<Omit<LandingPage, "id" | "createdAt">>) => {
      setSaving(true);
      try {
        await delay();
        setPages((prev) =>
          prev.map((page) =>
            page.id === pageId ? { ...page, ...data, updatedAt: new Date().toISOString() } : page
          )
        );

        const mockIndex = MOCK_PAGES.findIndex((p) => p.id === pageId);
        if (mockIndex !== -1) {
          MOCK_PAGES[mockIndex] = {
            ...MOCK_PAGES[mockIndex],
            ...data,
            updatedAt: new Date().toISOString(),
          };
        }

        dispatch(
          addNotification({
            msg: "Page updated successfully",
          })
        );
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to update page",
            type: "err",
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [dispatch]
  );

  const deletePage = useCallback(
    async (pageId: string) => {
      setSaving(true);
      try {
        await delay();
        setPages((prev) => prev.filter((page) => page.id !== pageId));
        const mockIndex = MOCK_PAGES.findIndex((p) => p.id === pageId);
        if (mockIndex !== -1) {
          MOCK_PAGES.splice(mockIndex, 1);
        }
        delete MOCK_SECTIONS[pageId];

        dispatch(
          addNotification({
            msg: "Page deleted successfully",
          })
        );
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to delete page",
            type: "err",
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [dispatch]
  );

  const reorderPages = useCallback(
    async (pageIds: string[]) => {
      setSaving(true);
      try {
        await delay();
        // Reorder pages based on the provided order
        const reorderedPages = pageIds
          .map((id) => pages.find((p) => p.id === id))
          .filter((p): p is LandingPage => !!p);
        setPages(reorderedPages);

        dispatch(
          addNotification({
            msg: "Pages reordered",
          })
        );
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to reorder pages",
            type: "err",
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [pages, dispatch]
  );

  const fetchSectionsByPageId = useCallback(
    async (pageId: string) => {
      setLoading(true);
      try {
        await delay();
        const pageSections = MOCK_SECTIONS[pageId] || [];
        setSections([...pageSections]);
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to fetch sections",
            type: "err",
          })
        );
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const createSection = useCallback(
    async (
      pageId: string,
      data: Omit<LandingPageSection, "id" | "order" | "createdAt" | "updatedAt" | "pageId">
    ) => {
      setSaving(true);
      try {
        await delay();
        const newSection: LandingPageSection = {
          id: `section-${Date.now()}`,
          ...data,
          pageId,
          order: sections.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setSections((prev) => [...prev, newSection]);

        if (!MOCK_SECTIONS[pageId]) {
          MOCK_SECTIONS[pageId] = [];
        }
        MOCK_SECTIONS[pageId].push(newSection);

        dispatch(
          addNotification({
            msg: "Section created successfully",
          })
        );
        return newSection;
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to create section",
            type: "err",
          })
        );
        return null;
      } finally {
        setSaving(false);
      }
    },
    [sections, dispatch]
  );

  const updateSection = useCallback(
    async (
      pageId: string,
      sectionId: string,
      data: Partial<Omit<LandingPageSection, "id" | "pageId" | "createdAt">>
    ) => {
      setSaving(true);
      try {
        await delay();
        setSections((prev) =>
          prev.map((section) =>
            section.id === sectionId
              ? { ...section, ...data, updatedAt: new Date().toISOString() }
              : section
          )
        );

        if (MOCK_SECTIONS[pageId]) {
          const sectionIndex = MOCK_SECTIONS[pageId].findIndex((s) => s.id === sectionId);
          if (sectionIndex !== -1) {
            MOCK_SECTIONS[pageId][sectionIndex] = {
              ...MOCK_SECTIONS[pageId][sectionIndex],
              ...data,
              updatedAt: new Date().toISOString(),
            };
          }
        }

        dispatch(
          addNotification({
            msg: "Section updated successfully",
          })
        );
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to update section",
            type: "err",
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [dispatch]
  );

  const deleteSection = useCallback(
    async (pageId: string, sectionId: string) => {
      setSaving(true);
      try {
        await delay();
        setSections((prev) => prev.filter((section) => section.id !== sectionId));

        if (MOCK_SECTIONS[pageId]) {
          MOCK_SECTIONS[pageId] = MOCK_SECTIONS[pageId].filter((s) => s.id !== sectionId);
        }

        dispatch(
          addNotification({
            msg: "Section deleted successfully",
          })
        );
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to delete section",
            type: "err",
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [dispatch]
  );

  const duplicateSection = useCallback(
    async (pageId: string, sectionId: string) => {
      setSaving(true);
      try {
        await delay();
        const sectionToDuplicate = sections.find((s) => s.id === sectionId);
        if (!sectionToDuplicate) throw new Error("Section not found");

        const newSection: LandingPageSection = {
          ...sectionToDuplicate,
          id: `section-${Date.now()}`,
          order: sections.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setSections((prev) => [...prev, newSection]);

        if (MOCK_SECTIONS[pageId]) {
          MOCK_SECTIONS[pageId].push(newSection);
        }

        dispatch(
          addNotification({
            msg: "Section duplicated successfully",
          })
        );
        return newSection;
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to duplicate section",
            type: "err",
          })
        );
        return null;
      } finally {
        setSaving(false);
      }
    },
    [sections, dispatch]
  );

  const reorderSections = useCallback(
    async (pageId: string, sectionIds: string[]) => {
      setSaving(true);
      try {
        await delay();
        const reorderedSections = sectionIds
          .map((id) => sections.find((s) => s.id === id))
          .filter((s): s is LandingPageSection => !!s)
          .map((s, index) => ({ ...s, order: index }));

        setSections(reorderedSections);

        if (MOCK_SECTIONS[pageId]) {
          MOCK_SECTIONS[pageId] = reorderedSections;
        }

        dispatch(
          addNotification({
            msg: "Sections reordered",
          })
        );
      } catch {
        dispatch(
          addNotification({
            msg: "Failed to reorder sections",
            type: "err",
          })
        );
      } finally {
        setSaving(false);
      }
    },
    [sections, dispatch]
  );

  return {
    pages,
    sections,
    loading,
    saving,
    fetchPages,
    createPage,
    updatePage,
    deletePage,
    reorderPages,
    fetchSectionsByPageId,
    createSection,
    updateSection,
    deleteSection,
    duplicateSection,
    reorderSections,
  };
};
