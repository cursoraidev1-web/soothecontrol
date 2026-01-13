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

  // #region agent log
  useEffect(() => {
    // Check if Tailwind classes are applied
    const header = document.querySelector('header');
    const computedStyles = header ? window.getComputedStyle(header) : null;
    const hasTailwindStyles = computedStyles && (
      computedStyles.position === 'sticky' ||
      computedStyles.backdropFilter !== 'none' ||
      computedStyles.backgroundColor !== 'rgba(0, 0, 0, 0)'
    );
    
    // Check if CSS file is loaded
    const stylesheets = Array.from(document.styleSheets);
    const hasTailwindCSS = stylesheets.some(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        return rules.some(rule => {
          const cssText = rule.cssText || '';
          return cssText.includes('.bg-white') || cssText.includes('.sticky') || cssText.includes('tailwind');
        });
      } catch (e) {
        return false;
      }
    });

    fetch('http://127.0.0.1:7242/ingest/964fc30c-b698-4731-8f08-53848077e169',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'T2Header.tsx:30',message:'Checking Tailwind CSS application',data:{hasTailwindStyles,hasTailwindCSS,stylesheetsCount:stylesheets.length,headerClasses:'sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md transition-all'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }, []);
  // #endregion

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
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
              className="text-xl font-bold text-gray-900 transition-colors hover:text-gray-700"
            >
              {businessName}
            </Link>
          )}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link
              href={`${baseUrl}/`}
              className={`text-sm font-medium transition-colors ${
                currentPage === "home"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href={`${baseUrl}/about`}
              className={`text-sm font-medium transition-colors ${
                currentPage === "about"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              href={`${baseUrl}/contact`}
              className={`text-sm font-medium transition-colors ${
                currentPage === "contact"
                  ? "text-gray-900"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <Link
            href={`${baseUrl}/contact`}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
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
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <Link
              href={`${baseUrl}/`}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                currentPage === "home"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={`${baseUrl}/about`}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                currentPage === "about"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={`${baseUrl}/contact`}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                currentPage === "contact"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href={`${baseUrl}/contact`}
              className="mt-2 block rounded-lg bg-gray-900 px-3 py-2 text-center text-base font-semibold text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
