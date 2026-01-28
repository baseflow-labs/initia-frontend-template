import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSection, getSections } from "@/lib/api/sections";
import { getSubsection, getSubsections } from "@/lib/api/subsections";
import { getArticlesBySubsection } from "@/lib/api/articles";
import { ArticleList } from "@/components/articles/ArticleList";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

interface SubsectionPageProps {
  params: {
    sectionSlug: string;
    subsectionSlug: string;
  };
}

export const revalidate = 3600;

// Generate static paths
export async function generateStaticParams() {
  const sections = await getSections();
  const paths = [];

  for (const section of sections) {
    const subsections = await getSubsections(section.id);
    for (const subsection of subsections) {
      paths.push({
        sectionSlug: section.slug,
        subsectionSlug: subsection.slug,
      });
    }
  }

  return paths;
}

// Generate metadata
export async function generateMetadata({ params }: SubsectionPageProps): Promise<Metadata> {
  const section = await getSection(params.sectionSlug);
  const subsection = section ? await getSubsection(section.id, params.subsectionSlug) : null;

  if (!subsection) {
    return {
      title: "Subsection Not Found",
    };
  }

  return {
    title: `${subsection.title} - ${section?.title}`,
    description: subsection.description,
  };
}

export default async function SubsectionPage({ params }: SubsectionPageProps) {
  const section = await getSection(params.sectionSlug);

  if (!section) {
    notFound();
  }

  const subsection = await getSubsection(section.id, params.subsectionSlug);

  if (!subsection) {
    notFound();
  }

  const articles = await getArticlesBySubsection(subsection.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Help Center", href: "/" },
          { label: section.title, href: `/sections/${params.sectionSlug}` },
          {
            label: subsection.title,
            href: `/sections/${params.sectionSlug}/${params.subsectionSlug}`,
          },
        ]}
      />

      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{subsection.title}</h1>
        {subsection.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">{subsection.description}</p>
        )}
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}
