"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  name?: string;
  role?: string;
}

export function Navbar({ name = "Aak", role = "Full Stack Developer" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About me", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Achievements", href: "#achievements" },
    { label: "Socials", href: "#socials" },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-8 pb-4 flex items-center justify-between gap-6">
      {/* Brand & Role */}
      <div className="flex items-center gap-6 lg:gap-14 min-w-0">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 hover:text-slate-700 transition-colors shrink-0"
        >
          {name}
        </Link>
        <span className="hidden sm:inline-block text-base lg:text-lg text-slate-700 font-medium tracking-wide whitespace-nowrap truncate">
          {role}
        </span>
      </div>

      {/* Desktop Navigation Links (All strictly single line with whitespace-nowrap) */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-9 text-base lg:text-lg font-medium text-slate-800 shrink-0">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="whitespace-nowrap hover:text-slate-950 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-slate-900 hover:after:w-full after:transition-all after:duration-200"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="p-2 text-slate-800 hover:text-slate-950 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-6 right-6 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-xl p-6 z-50 flex flex-col gap-4">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {role}
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-800 hover:text-slate-950 py-1 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
