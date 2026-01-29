import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSection, getSections } from "@/lib/api/sections";
import { getSubsections } from "@/lib/api/subsections";
import { SubsectionCard } from "@/components/sections/SubsectionCard";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

interface SectionPageProps {
  params: {
    sectionSlug: string;
  };
}

export const revalidate = 3600;

// Generate static paths for all sections
export async function generateStaticParams() {
  const sections = await getSections();
  return sections.map((section) => ({
    sectionSlug: section.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const section = await getSection(params.sectionSlug);

  if (!section) {
    return {
      title: "Section Not Found",
    };
  }

  return {
    title: section.title,
    description: section.description,
    openGraph: {
      title: section.title,
      description: section.description,
    },
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const section = await getSection(params.sectionSlug);

  if (!section) {
    notFound();
  }

  const subsections = await getSubsections(section.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Help Center", href: "/" },
          { label: section.title, href: `/sections/${params.sectionSlug}` },
        ]}
      />

      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{section.title}</h1>
        {section.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">{section.description}</p>
        )}
      </div>

      {subsections.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {subsections.map((subsection) => (
            <SubsectionCard
              key={subsection.id}
              subsection={subsection}
              sectionSlug={params.sectionSlug}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">No articles found in this section.</p>
        </div>
      )}
    </div>
  );
}
