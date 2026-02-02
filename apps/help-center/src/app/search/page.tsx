import { Metadata } from "next";

import { searchArticles } from "@/lib/api/articles";
import { ArticleList } from "@/components/articles/ArticleList";
import { SearchBar } from "@/components/search/SearchBar";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";

  return {
    title: query ? `Search results for "${query}"` : "Search",
    description: "Search our help center for answers",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const results = query ? await searchArticles(query) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Search Help Center</h1>
        <SearchBar />
      </div>

      {query && (
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {results.length > 0
              ? `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
              : `No results found for "${query}"`}
          </p>
        </div>
      )}

      {results.length > 0 ? (
        <ArticleList articles={results} />
      ) : query ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            We couldn&apos;t find any articles matching your search.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try using different keywords or browse our categories.
          </p>
        </div>
      ) : null}
    </div>
  );
}
