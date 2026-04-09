import { Section } from "@/types/documentation";

import { getManualTree } from "./userManual";

export async function getSections(): Promise<Section[]> {
  try {
    const tree = await getManualTree();

    return tree.sections.map((section, index) => {
      const sectionSubsections = tree.subsections.filter(
        (subsection) => subsection.sectionId === section.id
      );
      const articleCount = sectionSubsections.reduce(
        (count, subsection) =>
          count + tree.articles.filter((article) => article.subsectionId === subsection.id).length,
        0
      );

      return {
        id: section.id,
        slug: section.slug,
        title: section.title,
        description: section.description,
        order: index + 1,
        articleCount,
      };
    });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return [];
  }
}

export async function getSection(slug: string): Promise<Section | null> {
  try {
    const sections = await getSections();
    return sections.find((section) => section.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching section:", error);
    return null;
  }
}
