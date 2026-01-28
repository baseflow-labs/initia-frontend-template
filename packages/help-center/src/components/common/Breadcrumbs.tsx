import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
          {index === items.length - 1 ? (
            <span className="font-medium text-gray-900 dark:text-gray-100">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-primary-600 dark:hover:text-primary-400">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
