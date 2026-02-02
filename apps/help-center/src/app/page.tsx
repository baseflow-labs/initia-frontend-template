import { BookOpen, MessageSquare, Settings, Zap } from "lucide-react";

import { SearchBar } from "@/components/search/SearchBar";
import { SectionCard } from "@/components/sections/SectionCard";
import { getSections } from "@/lib/api/sections";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  // Fetch sections from API at build time
  const sections = await getSections();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">How can we help you?</h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          Search our knowledge base or browse categories below
        </p>
        <SearchBar />
      </div>

      {/* Quick Links */}
      <div className="mb-12 grid gap-6 md:grid-cols-4">
        <QuickLink
          icon={<BookOpen className="h-6 w-6" />}
          title="Getting Started"
          description="Learn the basics"
          href="/getting-started"
        />
        <QuickLink
          icon={<Zap className="h-6 w-6" />}
          title="Popular Articles"
          description="Most viewed guides"
          href="/popular"
        />
        <QuickLink
          icon={<Settings className="h-6 w-6" />}
          title="Account & Settings"
          description="Manage your account"
          href="/account"
        />
        <QuickLink
          icon={<MessageSquare className="h-6 w-6" />}
          title="Contact Support"
          description="Get in touch"
          href="/contact"
        />
      </div>

      {/* Documentation Sections */}
      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Browse by Category</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-2 text-xl font-semibold">Still need help?</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Can&apos;t find what you&apos;re looking for? Our support team is here to help.
        </p>
        <a
          href="/contact"
          className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-medium text-white hover:bg-primary-700"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

function QuickLink({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col items-center rounded-lg border border-gray-200 p-6 text-center transition-colors hover:border-primary-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      <div className="mb-3 text-primary-600">{icon}</div>
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </a>
  );
}
