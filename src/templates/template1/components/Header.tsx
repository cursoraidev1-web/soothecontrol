"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { PageKey } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface HeaderProps {
  businessName: string;
  logoUrl: string | null;
  currentPage: PageKey | null;
  baseUrl: string;
  profile?: {
    socials?: Record<string, unknown> | null;
  };
}

export default function Header({
  businessName,
  logoUrl,
  currentPage,
  baseUrl,
  profile,
}: HeaderProps) {
  const editor = useInlineEditor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Get navigation labels from profile socials (or use defaults)
  const socials = (profile?.socials || {}) as Record<string, unknown>;
  const navLabels = (socials.nav_labels as Record<string, string>) || {};
  const navHome = navLabels.home || "Home";
  const navAbout = navLabels.about || "About Us";
  const navContact = navLabels.contact || "Contact Us";

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
              <EditableText
                value={businessName}
                onCommit={(next) => editor?.updateProfileField?.("business_name", next)}
                style={{ display: "inline" }}
              />
            </Link>
          )}
        </div>

        <nav className="t1-nav" aria-label="Main navigation">
          <Link
            href={`${baseUrl}/`}
            className={`t1-nav-link ${currentPage === "home" ? "active" : ""}`}
          >
            <EditableText
              value={navHome}
              onCommit={(next) => {
                // Store in profile socials as nav_labels
                const currentSocials = socials;
                const updatedSocials = {
                  ...currentSocials,
                  nav_labels: {
                    ...(navLabels || {}),
                    home: next,
                  },
                };
                editor?.updateProfileField?.("socials", updatedSocials);
              }}
              style={{ display: "inline" }}
            />
          </Link>
          <Link
            href={`${baseUrl}/about`}
            className={`t1-nav-link ${currentPage === "about" ? "active" : ""}`}
          >
            <EditableText
              value={navAbout}
              onCommit={(next) => {
                const updatedSocials = {
                  ...socials,
                  nav_labels: {
                    ...(navLabels || {}),
                    about: next,
                  },
                };
                editor?.updateProfileField?.("socials", updatedSocials);
              }}
              style={{ display: "inline" }}
            />
          </Link>
          <Link
            href={`${baseUrl}/contact`}
            className={`t1-nav-link ${currentPage === "contact" ? "active" : ""}`}
          >
            <EditableText
              value={navContact}
              onCommit={(next) => {
                const updatedSocials = {
                  ...socials,
                  nav_labels: {
                    ...(navLabels || {}),
                    contact: next,
                  },
                };
                editor?.updateProfileField?.("socials", updatedSocials);
              }}
              style={{ display: "inline" }}
            />
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
            <EditableText
              value={navHome}
              onCommit={(next) => {
                const updatedSocials = {
                  ...socials,
                  nav_labels: {
                    ...(navLabels || {}),
                    home: next,
                  },
                };
                editor?.updateProfileField?.("socials", updatedSocials);
              }}
              style={{ display: "inline" }}
            />
          </Link>
          <Link
            href={`${baseUrl}/about`}
            className={`t1-mobile-menu-link ${currentPage === "about" ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <EditableText
              value={navAbout}
              onCommit={(next) => {
                const updatedSocials = {
                  ...socials,
                  nav_labels: {
                    ...(navLabels || {}),
                    about: next,
                  },
                };
                editor?.updateProfileField?.("socials", updatedSocials);
              }}
              style={{ display: "inline" }}
            />
          </Link>
          <Link
            href={`${baseUrl}/contact`}
            className={`t1-mobile-menu-link ${currentPage === "contact" ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <EditableText
              value={navContact}
              onCommit={(next) => {
                const updatedSocials = {
                  ...socials,
                  nav_labels: {
                    ...(navLabels || {}),
                    contact: next,
                  },
                };
                editor?.updateProfileField?.("socials", updatedSocials);
              }}
              style={{ display: "inline" }}
            />
          </Link>
        </div>
      )}
    </header>
  );
}
