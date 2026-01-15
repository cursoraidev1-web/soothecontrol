"use client";

import Link from "next/link";
import { useState } from "react";
import type { PageKey } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T3Header({
  businessName,
  logoUrl,
  currentPage,
  baseUrl,
  profile,
}: {
  businessName: string;
  logoUrl: string | null;
  currentPage: PageKey | null;
  baseUrl: string;
  profile?: {
    socials?: Record<string, unknown> | null;
  };
}) {
  const editor = useInlineEditor();
  
  // Get navigation labels from profile socials (or use defaults)
  const socials = (profile?.socials || {}) as Record<string, unknown>;
  const navLabels = (socials.nav_labels as Record<string, string>) || {};
  const navHome = navLabels.home || "Home";
  const navAbout = navLabels.about || "About";
  const navContact = navLabels.contact || "Contact";
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="t3-header">
      <div className="t3-container">
        <div className="t3-header-inner">
          <Link href={`${baseUrl}/`} className="t3-brand" aria-label={businessName}>
            {logoUrl ? (
              <img src={logoUrl} alt={businessName} style={{ height: 34, width: "auto" }} />
            ) : (
              <span className="t3-brand-mark" aria-hidden="true" />
            )}
            <span className="t3-brand-name">
              <EditableText
                value={businessName}
                onCommit={(next) => editor?.updateProfileField?.("business_name", next)}
                style={{ display: "inline" }}
              />
            </span>
          </Link>

          <nav className="t3-nav" aria-label="Main">
            <Link href={`${baseUrl}/`} data-active={currentPage === "home"}>
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
            <Link href={`${baseUrl}/about`} data-active={currentPage === "about"}>
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
            <Link href={`${baseUrl}/contact`} data-active={currentPage === "contact"}>
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

          <div className="t3-header-actions">
            <Link href={`${baseUrl}/contact`} className="t3-cta">
              Get a quote
            </Link>
            <button
              type="button"
              className="t3-menu-btn"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <span className="t3-menu-ico" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="t3-mobile" role="dialog" aria-modal="true">
          <button
            type="button"
            className="t3-mobile-backdrop"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="t3-mobile-panel">
            <div className="t3-mobile-top">
              <div className="t3-mobile-title">Menu</div>
              <button
                type="button"
                className="t3-mobile-close"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="t3-mobile-links" aria-label="Mobile">
              <Link href={`${baseUrl}/`} onClick={() => setMobileOpen(false)}>
                {navHome}
              </Link>
              <Link href={`${baseUrl}/about`} onClick={() => setMobileOpen(false)}>
                {navAbout}
              </Link>
              <Link href={`${baseUrl}/contact`} onClick={() => setMobileOpen(false)}>
                {navContact}
              </Link>
            </div>
            <div className="t3-mobile-cta">
              <Link href={`${baseUrl}/contact`} className="t3-cta" onClick={() => setMobileOpen(false)}>
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

