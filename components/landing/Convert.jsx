// components/landing/Convert.jsx
"use client";

import Link from "next/link";

export default function Convert() {
  return (
    <section id="convert" className="py-20 bg-blue-50 text-center px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Convert?</h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        Upload your HTML file and get a high-quality DOCX or PDF in seconds.
      </p>
      <Link href="/convert" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
        Upload & Convert
      </Link>
    </section>
  );
}
