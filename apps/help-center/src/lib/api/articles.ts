import { getManualTree, searchManualArticles } from "./userManual";

import { Article } from "@/types/documentation";

export async function getArticlesBySubsection(subsectionId: string): Promise<Article[]> {
  try {
    const tree = await getManualTree();

    return tree.articles
      .filter((article) => article.subsectionId === subsectionId)
      .map((article) => ({
        id: article.id,
        slug: article.slug,
        subsectionId: article.subsectionId,
        title: article.title,
        summary: article.summary,
        content: article.content,
        author: { name: "Support Team" },
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function getArticle(subsectionId: string, slug: string): Promise<Article | null> {
  try {
    const articles = await getArticlesBySubsection(subsectionId);
    return articles.find((article) => article.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const tree = await getManualTree();
    const filtered = searchManualArticles(tree.articles, query);

    return filtered.map((article) => ({
      id: article.id,
      slug: article.slug,
      subsectionId: article.subsectionId,
      title: article.title,
      summary: article.summary,
      content: article.content,
      author: { name: "Support Team" },
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    }));
  } catch (error) {
    console.error("Error searching articles:", error);
    return [];
  }
}
