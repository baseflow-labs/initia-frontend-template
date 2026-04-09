import { Subsection } from "@/types/documentation";

import { getManualTree } from "./userManual";

export async function getSubsections(sectionId: string): Promise<Subsection[]> {
  try {
    const tree = await getManualTree();

    return tree.subsections
      .filter((subsection) => subsection.sectionId === sectionId)
      .map((subsection, index) => ({
        id: subsection.id,
        slug: subsection.slug,
        sectionId: subsection.sectionId,
        title: subsection.title,
        description: subsection.description,
        order: index + 1,
        articleCount: tree.articles.filter((article) => article.subsectionId === subsection.id)
          .length,
      }));
  } catch (error) {
    console.error("Error fetching subsections:", error);
    return [];
  }
}

export async function getSubsection(sectionId: string, slug: string): Promise<Subsection | null> {
  try {
    const subsections = await getSubsections(sectionId);
    return subsections.find((subsection) => subsection.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching subsection:", error);
    return null;
  }
}
