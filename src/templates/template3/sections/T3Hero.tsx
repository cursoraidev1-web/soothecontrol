"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T3Hero({
  section,
  sectionIndex,
  businessName,
}: {
  section: HeroSectionType;
  sectionIndex?: number;
  businessName: string;
}) {
  const editor = useInlineEditor();
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Book a free consult";

  return (
    <section className="t3-hero">
      <div className="t3-container">
        <div className="t3-hero-grid">
          <div>
            <span className="t3-eyebrow">Crafted for {businessName}</span>
            <EditableText
              as="h1"
              className="t3-h1"
              value={headline}
              placeholder="Hero headline"
              multiline
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, headline: next });
              }}
            />
            <EditableText
              as="p"
              className="t3-lead"
              value={subtext}
              placeholder="Hero subtext"
              multiline
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, subtext: next });
              }}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
              <a className="t3-cta" href={section.ctaHref || "#contact"}>
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
                href="#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  padding: "10px 14px",
                  border: "1px solid rgba(18,18,18,0.14)",
                  background: "rgba(255,255,255,0.7)",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "var(--t3-ink)",
                }}
              >
                See services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

