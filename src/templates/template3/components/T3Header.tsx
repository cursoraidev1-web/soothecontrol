"use client";

import Link from "next/link";
import type { PageKey } from "@/lib/pageSchema";

export default function T3Header({
  businessName,
  logoUrl,
  currentPage,
  baseUrl,
}: {
  businessName: string;
  logoUrl: string | null;
  currentPage: PageKey;
  baseUrl: string;
}) {
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
            <span className="t3-brand-name">{businessName}</span>
          </Link>

          <nav className="t3-nav" aria-label="Main">
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

          <Link href={`${baseUrl}/contact`} className="t3-cta">
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}

