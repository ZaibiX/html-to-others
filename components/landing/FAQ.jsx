// components/landing/FAQ.jsx
"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is my data safe?",
    a: "Absolutely. We do not store your files. Everything is processed in-memory.",
  },
  {
    q: "What file types can I upload?",
    a: "Currently we support `.html` files. More formats coming soon!",
  },
  {
    q: "Is it free to use?",
    a: "Yes! FileCrafter is completely free for basic usage.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="py-20 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((item, idx) => (
          <div
            key={idx}
            className="border rounded p-4 cursor-pointer"
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            <div className="flex justify-between items-center text-gray-800 font-medium">
              <span>{item.q}</span>
              <span>{openIdx === idx ? "−" : "+"}</span>
            </div>
            {openIdx === idx && <p className="mt-2 text-gray-600">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
