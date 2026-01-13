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
            <div style={{ marginTop: 18, color: "var(--t3-muted)", fontSize: 13, fontWeight: 600 }}>
              Response time: typically under 1 business day
            </div>
          </div>

          <div className="t3-card t3-hero-art">
            <div className="t3-art-surface">
              <div className="t3-stat-row">
                <div className="t3-stat">
                  <b>4.9</b>
                  <span>Avg rating</span>
                </div>
                <div className="t3-stat">
                  <b>24h</b>
                  <span>Fast replies</span>
                </div>
                <div className="t3-stat">
                  <b>100%</b>
                  <span>Quality-first</span>
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div
                  style={{
                    borderRadius: 16,
                    border: "1px solid rgba(18,18,18,0.10)",
                    background: "rgba(255,255,255,0.65)",
                    padding: 16,
                  }}
                >
                  <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
                    A site that feels expensive
                  </div>
                  <div className="t3-muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
                    Clear hierarchy, strong visuals, and sections that build trust.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

