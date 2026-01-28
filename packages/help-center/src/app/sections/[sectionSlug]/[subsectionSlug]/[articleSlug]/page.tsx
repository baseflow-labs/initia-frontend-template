import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSection, getSections } from "@/lib/api/sections";
import { getSubsection, getSubsections } from "@/lib/api/subsections";
import { getArticle, getArticlesBySubsection } from "@/lib/api/articles";
import { ArticleContent } from "@/components/articles/ArticleContent";
import { ArticleSidebar } from "@/components/articles/ArticleSidebar";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

interface ArticlePageProps {
  params: {
    sectionSlug: string;
    subsectionSlug: string;
    articleSlug: string;
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
      const articles = await getArticlesBySubsection(subsection.id);
      for (const article of articles) {
        paths.push({
          sectionSlug: section.slug,
          subsectionSlug: subsection.slug,
          articleSlug: article.slug,
        });
      }
    }
  }

  return paths;
}

// Generate metadata
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const section = await getSection(params.sectionSlug);
  const subsection = section ? await getSubsection(section.id, params.subsectionSlug) : null;
  const article = subsection ? await getArticle(subsection.id, params.articleSlug) : null;

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.title,
    description: article.summary || article.title,
    openGraph: {
      title: article.title,
      description: article.summary || article.title,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const section = await getSection(params.sectionSlug);

  if (!section) {
    notFound();
  }

  const subsection = await getSubsection(section.id, params.subsectionSlug);

  if (!subsection) {
    notFound();
  }

  const article = await getArticle(subsection.id, params.articleSlug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getArticlesBySubsection(subsection.id);

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
          {
            label: article.title,
            href: `/sections/${params.sectionSlug}/${params.subsectionSlug}/${params.articleSlug}`,
          },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <ArticleContent article={article} />
        <ArticleSidebar
          article={article}
          relatedArticles={relatedArticles.filter((a) => a.id !== article.id)}
          sectionSlug={params.sectionSlug}
          subsectionSlug={params.subsectionSlug}
        />
      </div>
    </div>
  );
}
