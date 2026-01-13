"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import {
  getLoremHeadline,
  getLoremParagraph,
} from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface HeroSectionProps {
  section: HeroSectionType;
  sectionIndex?: number;
}

export default function HeroSection({ section, sectionIndex }: HeroSectionProps) {
  const editor = useInlineEditor();
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get Started";
  const ctaHref = section.ctaHref || "#";

  return (
    <section className="t1-hero t1-fade-in">
      <div className="t1-hero-content">
        <EditableText
          as="h1"
          className="t1-hero-headline"
          value={headline}
          placeholder="Headline"
          sectionIndex={sectionIndex}
          field="headline"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, headline: next });
          }}
        />
        <EditableText
          as="p"
          className="t1-hero-subtext"
          value={subtext}
          placeholder="Subtext"
          multiline
          sectionIndex={sectionIndex}
          field="subtext"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, subtext: next });
          }}
        />
        {ctaText && ctaHref && (
          <a href={ctaHref} className="t1-hero-cta">
            <EditableText
              as="span"
              value={ctaText}
              placeholder="Button text"
              sectionIndex={sectionIndex}
              field="ctaText"
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, ctaText: next });
              }}
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "8px" }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
