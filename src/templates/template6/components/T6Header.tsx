"use client";

import Link from "next/link";
import type { PageKey } from "@/lib/pageSchema";
import { useState } from "react";

export default function T6Header({
  businessName,
  logoUrl,
  currentPage,
  baseUrl,
}: {
  businessName: string;
  logoUrl: string | null;
  currentPage: PageKey | null;
  baseUrl: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="t6-header">
      <div className="t6-container">
        <div className="t6-header-inner">
          <Link href={`${baseUrl}/`} className="t6-brand" aria-label={businessName}>
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={businessName} style={{ height: 34, width: "auto" }} />
            ) : (
              <span className="t6-mark" aria-hidden="true" />
            )}
            <span className="t6-name">{businessName}</span>
          </Link>

          <nav className="t6-nav" aria-label="Main">
            <Link href={`${baseUrl}/`} data-active={currentPage === "home"}>
              Home
            </Link>
            <Link href={`${baseUrl}/about`} data-active={currentPage === "about"}>
              About
            </Link>
            <Link href={`${baseUrl}/contact`} data-active={currentPage === "contact"}>
              Contact
            </Link>
          </nav>

          <div className="t6-header-actions">
            <Link href={`${baseUrl}/contact`} className="t6-cta">
              Get started
            </Link>
            <button
              type="button"
              className="t6-menu-btn"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <span className="t6-menu-ico" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen ? (
        <div className="t6-mobile" role="dialog" aria-modal="true">
          <button
            type="button"
            className="t6-mobile-backdrop"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="t6-mobile-panel">
            <div className="t6-mobile-top">
              <div className="t6-mobile-title">Menu</div>
              <button
                type="button"
                className="t6-mobile-close"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="t6-mobile-links" aria-label="Mobile">
              <Link href={`${baseUrl}/`} onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link href={`${baseUrl}/about`} onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href={`${baseUrl}/contact`} onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </div>
            <div className="t6-mobile-cta">
              <Link href={`${baseUrl}/contact`} className="t6-cta" onClick={() => setMobileOpen(false)}>
                Get started
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

