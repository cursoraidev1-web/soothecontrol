"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { PageKey } from "@/lib/pageSchema";

interface T2HeaderProps {
  businessName: string;
  logoUrl: string | null;
  currentPage: PageKey;
  baseUrl: string;
}

export default function T2Header({
  businessName,
  logoUrl,
  currentPage,
  baseUrl,
}: T2HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm" 
          : "bg-white/50 backdrop-blur-sm border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          {logoUrl ? (
            <Link href={`${baseUrl}/`} className="flex items-center">
              <img
                src={logoUrl}
                alt={businessName}
                className="h-10 w-auto"
              />
            </Link>
          ) : (
            <Link
              href={`${baseUrl}/`}
              className="text-2xl font-extrabold text-slate-900 tracking-tight hover:opacity-80 transition-opacity"
            >
              {businessName}
            </Link>
          )}
          
          <div className="hidden md:flex md:items-center md:gap-1">
            {[
              { label: 'Home', key: 'home', href: `${baseUrl}/` },
              { label: 'About', key: 'about', href: `${baseUrl}/about` },
              { label: 'Contact', key: 'contact', href: `${baseUrl}/contact` },
            ].map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === link.key
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="text-sm font-semibold text-slate-900 hover:text-teal-600 transition-colors">
            Log in
          </a>
          <Link
            href={`${baseUrl}/contact`}
            className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100 border-b border-slate-200" : "max-h-0 opacity-0"
        } bg-white`}
      >
        <div className="space-y-1 px-4 pb-6 pt-2">
          {[
            { label: 'Home', key: 'home', href: `${baseUrl}/` },
            { label: 'About', key: 'about', href: `${baseUrl}/about` },
            { label: 'Contact', key: 'contact', href: `${baseUrl}/contact` },
          ].map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                currentPage === link.key
                  ? "bg-slate-50 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <Link
              href={`${baseUrl}/contact`}
              className="block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-base font-bold text-white shadow-md active:scale-95 transition-transform"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
