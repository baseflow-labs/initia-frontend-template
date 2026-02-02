"use client";

import { Clock, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

import { Article } from "@/types/documentation";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [helpful, setHelpful] = useState<boolean | null>(null);

  const updatedDate = new Date(article.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleFeedback = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    // TODO: In production, send feedback to API
    // Example: await fetch('/api/articles/feedback', { method: 'POST', body: JSON.stringify({ articleId: article.id, isHelpful }) })
  };

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
      {/* Article Header */}
      <header className="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
        <h1 className="mb-4 text-4xl font-bold">{article.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {article.author && (
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {article.author.name}
            </div>
          )}
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            Updated {updatedDate}
          </div>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div
        className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary-600 hover:prose-a:text-primary-700"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Feedback Section */}
      <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
        <p className="mb-4 font-semibold">Was this article helpful?</p>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleFeedback(true)}
            className={`flex items-center space-x-2 rounded-lg border px-4 py-2 transition-colors ${
              helpful === true
                ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20"
                : "border-gray-200 hover:border-green-500 dark:border-gray-700"
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Yes</span>
            {article.helpful !== undefined && (
              <span className="text-sm text-gray-500">({article.helpful})</span>
            )}
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className={`flex items-center space-x-2 rounded-lg border px-4 py-2 transition-colors ${
              helpful === false
                ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-900/20"
                : "border-gray-200 hover:border-red-500 dark:border-gray-700"
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
            <span>No</span>
            {article.notHelpful !== undefined && (
              <span className="text-sm text-gray-500">({article.notHelpful})</span>
            )}
          </button>
        </div>
        {helpful !== null && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Thank you for your feedback!
          </p>
        )}
      </div>
    </article>
  );
}
