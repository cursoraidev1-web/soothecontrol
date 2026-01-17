"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface T2HeroProps {
  section: HeroSectionType;
  sectionIndex?: number;
  businessName: string;
  logoUrl: string | null;
  isHomePage?: boolean;
  pageLabel?: string;
}

export default function T2Hero({
  section,
  sectionIndex,
  businessName,
  logoUrl,
  isHomePage = false,
  pageLabel,
}: T2HeroProps) {
  const editor = useInlineEditor();
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get Started";
  const ctaHref = section.ctaHref || "#";

  if (isHomePage) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-12 items-center">
            <div className="max-w-2xl">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={businessName}
                  className="h-12 w-auto mb-6"
                />
              )}
              <EditableText
                as="h1"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-6xl"
                value={headline}
                placeholder="Headline"
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  editor.updateSection(sectionIndex, { ...section, headline: next });
                }}
              />
              <EditableText
                as="p"
                className="mt-6 text-lg leading-8 text-gray-600 max-w-xl"
                value={subtext}
                placeholder="Subtext"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  editor.updateSection(sectionIndex, { ...section, subtext: next });
                }}
              />
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={ctaHref}
                  className="w-full rounded-lg bg-gray-900 px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl sm:w-auto"
                >
                  <EditableText
                    as="span"
                    value={ctaText}
                    placeholder="CTA"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      editor.updateSection(sectionIndex, { ...section, ctaText: next });
                    }}
                  />
                </a>
                <a
                  href="#contact"
                  className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-base font-semibold text-gray-900 transition-all hover:bg-gray-50 sm:w-auto"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // About/Contact page hero (smaller)
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 border-b border-gray-200">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative text-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 block">
            {pageLabel || ""}
          </span>
          <EditableText
            as="h1"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            value={headline || `About ${businessName}`}
            placeholder="Page headline"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, headline: next });
            }}
          />
          {subtext && (
            <EditableText
              as="p"
              className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
              value={subtext}
              placeholder="Page subtext"
              multiline
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, subtext: next });
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
