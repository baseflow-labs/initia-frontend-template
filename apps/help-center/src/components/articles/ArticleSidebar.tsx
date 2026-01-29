import Link from "next/link";
import { Article } from "@/types/documentation";
import { FileText } from "lucide-react";

interface ArticleSidebarProps {
  article: Article;
  relatedArticles: Article[];
  sectionSlug: string;
  subsectionSlug: string;
}

export function ArticleSidebar({
  article,
  relatedArticles,
  sectionSlug,
  subsectionSlug,
}: ArticleSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Article Stats */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 font-semibold">Article Stats</h3>
        <div className="space-y-3 text-sm">
          {article.viewCount !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Views</span>
              <span className="font-medium">{article.viewCount.toLocaleString()}</span>
            </div>
          )}
          {article.helpful !== undefined && article.notHelpful !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Helpful</span>
              <span className="font-medium">
                {Math.round((article.helpful / (article.helpful + article.notHelpful)) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 font-semibold">Related Articles</h3>
          <ul className="space-y-3">
            {relatedArticles.slice(0, 5).map((related) => (
              <li key={related.id}>
                <Link
                  href={`/sections/${sectionSlug}/${subsectionSlug}/${related.slug}`}
                  className="group flex items-start space-x-2 text-sm hover:text-primary-600"
                >
                  <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="line-clamp-2">{related.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Need More Help */}
      <div className="rounded-lg border border-gray-200 bg-primary-50 p-6 dark:border-gray-700 dark:bg-primary-900/20">
        <h3 className="mb-2 font-semibold">Need more help?</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          Contact Support
        </Link>
      </div>
    </aside>
  );
}
