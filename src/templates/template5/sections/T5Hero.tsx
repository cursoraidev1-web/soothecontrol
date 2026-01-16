"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T5Hero({
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
  const ctaText = section.ctaText || "Get a quote";
  const ctaHref = section.ctaHref || "#contact";

  return (
    <section className="t5-hero">
      <div className="t5-container">
        <div style={{ maxWidth: "800px" }}>
          <span className="t5-eyebrow">Designed for {businessName}</span>
            <EditableText
              as="h1"
              className="t5-h1"
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
              className="t5-lead"
              value={subtext}
              placeholder="Hero subtext"
              multiline
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, subtext: next });
              }}
            />

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <a className="t5-cta" href={ctaHref}>
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
                  border: "1px solid rgba(11,18,32,0.14)",
                  background: "rgba(255,255,255,0.70)",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "var(--t5-ink)",
                }}
              >
                View services
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}

