import Link from "next/link";
import { Article } from "@/types/documentation";
import { Clock, Eye } from "lucide-react";

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">No articles found in this section.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </div>
  );
}

function ArticleListItem({ article }: { article: Article }) {
  const updatedDate = new Date(article.updatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Link href={`${article.slug}`} className="group">
        <h3 className="mb-2 text-xl font-semibold group-hover:text-primary-600">{article.title}</h3>
        {article.summary && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">{article.summary}</p>
        )}
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            Updated {updatedDate}
          </div>
          {article.viewCount !== undefined && (
            <div className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {article.viewCount.toLocaleString()} views
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
