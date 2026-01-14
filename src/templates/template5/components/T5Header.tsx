"use client";

import Link from "next/link";
import type { PageKey } from "@/lib/pageSchema";

export default function T5Header({
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
  return (
    <header className="t5-header">
      <div className="t5-container">
        <div className="t5-header-inner">
          <Link href={`${baseUrl}/`} className="t5-brand" aria-label={businessName}>
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt={businessName} style={{ height: 34, width: "auto" }} />
            ) : (
              <span className="t5-mark" aria-hidden="true" />
            )}
            <span className="t5-name">{businessName}</span>
          </Link>

          <nav className="t5-nav" aria-label="Main">
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

          <Link href={`${baseUrl}/contact`} className="t5-cta">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

