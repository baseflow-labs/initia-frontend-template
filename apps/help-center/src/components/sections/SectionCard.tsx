import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

import { Section } from "@/types/documentation";

interface SectionCardProps {
  section: Section;
}

export function SectionCard({ section }: SectionCardProps) {
  return (
    <Link
      href={`/sections/${section.slug}`}
      className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-primary-500 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {section.icon && <span className="text-2xl">{section.icon}</span>}
          <h3 className="text-xl font-semibold group-hover:text-primary-600">{section.title}</h3>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{section.description}</p>
      {section.articleCount !== undefined && (
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <FileText className="mr-1 h-4 w-4" />
          {section.articleCount} article{section.articleCount !== 1 ? "s" : ""}
        </div>
      )}
    </Link>
  );
}
