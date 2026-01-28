import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Help Center</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find answers and support for all your questions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600 dark:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/getting-started"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/popular"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Popular Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@example.com"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Email Support
                </a>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          <p>&copy; {currentYear} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
