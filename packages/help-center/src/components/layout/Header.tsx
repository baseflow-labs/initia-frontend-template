"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary-600">Help Center</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="/getting-started"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            Getting Started
          </Link>
          <Link
            href="/popular"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            Popular
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden">
          <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/getting-started"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Getting Started
            </Link>
            <Link
              href="/popular"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Popular
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
