import Link from "next/link";
import { Subsection } from "@/types/documentation";
import { ChevronRight, FileText } from "lucide-react";

interface SubsectionCardProps {
  subsection: Subsection;
  sectionSlug: string;
}

export function SubsectionCard({ subsection, sectionSlug }: SubsectionCardProps) {
  return (
    <Link
      href={`/sections/${sectionSlug}/${subsection.slug}`}
      className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold group-hover:text-primary-600">{subsection.title}</h3>
        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
      </div>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{subsection.description}</p>
      {subsection.articleCount !== undefined && (
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FileText className="mr-1 h-4 w-4" />
          {subsection.articleCount} article{subsection.articleCount !== 1 ? "s" : ""}
        </div>
      )}
    </Link>
  );
}
