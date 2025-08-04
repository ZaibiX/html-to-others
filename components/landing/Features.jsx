// components/landing/Features.jsx
"use client";

import { FaFilePdf, FaFileWord, FaCloudUploadAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaCloudUploadAlt size={32} />,
    title: "Simple Upload",
    description: "Just drag and drop or browse to upload your HTML file securely.",
  },
  {
    icon: <FaFilePdf size={32} />,
    title: "Convert to PDF",
    description: "Generate pixel-perfect PDF files using Puppeteer.",
  },
  {
    icon: <FaFileWord size={32} />,
    title: "Convert to DOCX",
    description: "Turn your HTML into editable Word documents.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Features</h2>
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <div key={idx} className="text-center border rounded p-6 shadow hover:shadow-md transition bg-blue-50">
            <div className="text-blue-600 mb-4">{f.icon}</div>
            <h3 className="font-semibold text-lg text-gray-700 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
