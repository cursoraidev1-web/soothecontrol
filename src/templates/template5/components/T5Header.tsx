"use client";

import Link from "next/link";
import type { PageKey } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T5Header({
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
            <span className="t5-name">
              <EditableText
                value={businessName}
                onCommit={(next) => editor?.updateProfileField?.("business_name", next)}
                style={{ display: "inline" }}
              />
            </span>
          </Link>

          <nav className="t5-nav" aria-label="Main">
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

          <Link href={`${baseUrl}/contact`} className="t5-cta">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

