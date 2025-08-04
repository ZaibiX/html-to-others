"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 px-6 md:px-12 mt-16 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">FileCrafter</h2>
          <p className="mt-2 text-sm text-gray-600">
            Convert HTML files to DOCX or PDF effortlessly. Clean, reliable,
            and accurate file crafting for all your needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="#features" className="hover:text-blue-600">
                Features
              </Link>
            </li>
            <li>
              <Link href="#convert" className="hover:text-blue-600">
                Convert
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-blue-600">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-blue-600">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect</h3>
          <p className="text-sm">hello@filecrafter.io</p>
          <div className="flex gap-4 mt-3">
            <a href="#" className="hover:text-blue-600" aria-label="Twitter">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.5.58-2.3.69.83-.5 1.46-1.28 1.76-2.23-.8.47-1.68.8-2.6.98a4.15 4.15 0 0 0-7.06 3.78 11.8 11.8 0 0 1-8.6-4.36 4.12 4.12 0 0 0 1.3 5.53A4.1 4.1 0 0 1 2.8 9v.05c0 1.9 1.35 3.48 3.14 3.84a4.18 4.18 0 0 1-1.88.07 4.14 4.14 0 0 0 3.86 2.87 8.33 8.33 0 0 1-5.14 1.78c-.34 0-.67-.02-1-.06A11.76 11.76 0 0 0 8.29 21c7.55 0 11.7-6.26 11.7-11.7 0-.18 0-.36-.01-.54A8.2 8.2 0 0 0 22.46 6z" />
              </svg>
            </a>
            <a href="#" className="hover:text-blue-600" aria-label="GitHub">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.47 2 2 6.58 2 12.17c0 4.46 2.87 8.24 6.84 9.58.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.38-3.37-1.38-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.07 1.53 1.07.89 1.56 2.34 1.1 2.91.84.09-.67.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.23 9.23 0 0 1 5 0C16.5 5.97 17.33 6.25 17.33 6.25c.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.58 5.07.36.33.68.96.68 1.93v2.87c0 .27.18.58.7.48A10.17 10.17 0 0 0 22 12.17C22 6.58 17.52 2 12 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} FileCrafter. All rights reserved.
      </p>
    </footer>
  );
}
