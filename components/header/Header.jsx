"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = (
    <>
      <Link href="#features" className="text-gray-700 hover:text-black text-lg">
        Features
      </Link>
      <Link href="#convert" className="text-gray-700 hover:text-black text-lg">
        Convert
      </Link>
      <Link href="#faq" className="text-gray-700 hover:text-black text-lg">
        FAQ
      </Link>
    </>
  );

  return (
    <header className="w-full p-4 shadow bg-white fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          FileCrafter
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks}
          <Button onClick={()=>{alert("Login Functionality will be added soon. :)")}}>Login</Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Button className="px-3 py-1 text-sm">Login</Button>
          <button onClick={() => setMobileOpen(true)} className="text-3xl text-gray-700">
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-start p-6">
          <button onClick={() => setMobileOpen(false)} className="text-3xl mb-8 text-gray-700">
            <FiX />
          </button>
          <div className="flex flex-col gap-6 text-xl text-gray-700">
            {navLinks}
          </div>
        </div>
      )}
    </header>
  );
}
