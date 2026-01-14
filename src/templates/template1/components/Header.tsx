"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { PageKey } from "@/lib/pageSchema";

interface HeaderProps {
  businessName: string;
  logoUrl: string | null;
  currentPage: PageKey | null;
  baseUrl: string;
}

export default function Header({
  businessName,
  logoUrl,
  currentPage,
  baseUrl,
}: HeaderProps) {
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
    <header className={`t1-header ${scrolled ? "scrolled" : ""}`}>
      <div className="t1-header-content">
        <div>
          {logoUrl ? (
            <Link href={`${baseUrl}/`} className="t1-logo-text">
              <img
                src={logoUrl}
                alt={businessName}
                className="t1-logo"
              />
            </Link>
          ) : (
            <Link href={`${baseUrl}/`} className="t1-logo-text">
              {businessName}
            </Link>
          )}
        </div>

        <nav className="t1-nav" aria-label="Main navigation">
          <Link
            href={`${baseUrl}/`}
            className={`t1-nav-link ${currentPage === "home" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            href={`${baseUrl}/about`}
            className={`t1-nav-link ${currentPage === "about" ? "active" : ""}`}
          >
            About Us
          </Link>
          <Link
            href={`${baseUrl}/contact`}
            className={`t1-nav-link ${currentPage === "contact" ? "active" : ""}`}
          >
            Contact Us
          </Link>
        </nav>

        <button
          type="button"
          className="t1-mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="t1-mobile-menu open">
          <Link
            href={`${baseUrl}/`}
            className={`t1-mobile-menu-link ${currentPage === "home" ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href={`${baseUrl}/about`}
            className={`t1-mobile-menu-link ${currentPage === "about" ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href={`${baseUrl}/contact`}
            className={`t1-mobile-menu-link ${currentPage === "contact" ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
