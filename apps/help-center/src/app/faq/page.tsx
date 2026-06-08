import { Metadata } from "next";

import { getFaqs } from "@/lib/api/faqs";
import { SearchBar } from "@/components/search/SearchBar";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions",
};

export const revalidate = 3600;

const FaqPage = async () => {
  const faqs = await getFaqs();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Find quick answers to common questions.
        </p>
        <SearchBar />
      </div>

      {faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold">
                {faq.title}
              </summary>
              <div className="mt-4 text-gray-700 dark:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: faq.content }} />
                {faq.link && (
                  <a
                    href={faq.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-primary-600 hover:text-primary-700"
                  >
                    Learn more
                  </a>
                )}
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-400">No FAQ entries found.</p>
        </div>
      )}
    </div>
  );
};

export default FaqPage;
