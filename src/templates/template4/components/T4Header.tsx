"use client";

import Link from "next/link";
import type { PageKey } from "@/lib/pageSchema";

export default function T4Header({
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
    <header className="t4-header">
      <div className="t4-container">
        <div className="t4-header-inner">
          <Link href={`${baseUrl}/`} className="t4-brand" aria-label={businessName}>
            {logoUrl ? (
              <img src={logoUrl} alt={businessName} style={{ height: 34, width: "auto" }} />
            ) : (
              <span className="t4-mark" aria-hidden="true" />
            )}
            <span className="t4-name">{businessName}</span>
          </Link>

          <nav className="t4-nav" aria-label="Main">
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

          <Link href={`${baseUrl}/contact`} className="t4-cta">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

