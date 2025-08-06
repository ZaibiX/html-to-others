'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import axios from "axios";
export default function Hero() {
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState('pdf');
  const [convertedFileUrl, setConvertedFileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
  const uploadedFile = e.target.files[0];
  console.log("File name is ", uploadedFile.name)

  if (!uploadedFile) return;

  // Validate extension
  if (!uploadedFile.name.endsWith('.html')) {
    alert('Only .html files are allowed.');
    return;
  }

  setFile(uploadedFile);
  setConvertedFileUrl('');
};


  const handleConvert = async () => {
    if (!file) return alert('Please upload a file first.');

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setConvertedFileUrl('');

    // try {
    //   const res = await fetch(`/api/convert-to-${conversionType}`, {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (!res.ok) throw new Error('Conversion failed');
    //   const blob = await res.blob();
    //   const url = URL.createObjectURL(blob);
    //   setConvertedFileUrl(url);
    // } catch (err) {
    //   alert(err.message);
    // } finally {
    //   setLoading(false);
    // }

    
  try {
    const response = await axios.post(`/api/convert-to-${conversionType}`, formData, {
      responseType: 'blob', // important
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // const url = URL.createObjectURL(response.data);
    // setConvertedFileUrl(url);
    const mimeType =
  conversionType === 'pdf'
    ? 'application/pdf'
    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

const blob = new Blob([response.data], { type: mimeType });
const url = URL.createObjectURL(blob);
setConvertedFileUrl(url);
  } catch (err) {
    alert('Conversion failed: ' + err.message);
  } finally {
    setLoading(false);
  }
  };

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white py-20 px-6 sm:px-10 lg:px-20 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left - Text and Functionality */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Convert HTML to PDF or DOCX Instantly
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Upload your HTML file and download a polished document in seconds.
          </p>

          <div className="space-y-4">
            {/* Upload */}
            <label className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg px-4 py-6 bg-white hover:bg-gray-50 transition text-gray-600 text-sm text-center">
              <input
                type="file"
                accept=".html"
                onChange={handleUpload}
                className="hidden"
              />
              {file ? (
                <span className="font-medium">{file.name}</span>
              ) : (
                <span>Click to upload your .html file</span>
              )}
            </label>

            {/* Options */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/2"
              >
                <option value="pdf">Convert to PDF</option>
                <option value="docx">Convert to DOCX</option>
              </select>

              <button
                onClick={handleConvert}
                disabled={loading || !file}
                className="bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-1/2 hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Converting...' : 'Convert'}
              </button>
            </div>

            {/* Download */}
            {convertedFileUrl && (
              <a
                href={convertedFileUrl}
                download={`converted.${conversionType}`}
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
                Download {conversionType.toUpperCase()}
              </a>
            )}
          </div>
        </div>

        {/* Right - Illustration/Icon */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10">
            <DocumentTextIcon className="w-24 h-24 text-blue-500 mx-auto" />
            <p className="text-center text-sm text-gray-500 mt-2">HTML → PDF / DOCX</p>
          </div>
        </div>
      </div>
    </section>
  );
}
