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
        <div className="t5-grid">
          <div>
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

            <div style={{ marginTop: 14, color: "var(--t5-muted)", fontWeight: 700, fontSize: 13 }}>
              Clean layout · Strong typography · Great on mobile
            </div>
          </div>

          <div className="t5-card" style={{ padding: 16 }}>
            <div
              style={{
                borderRadius: 16,
                border: "1px solid rgba(11,18,32,0.10)",
                background:
                  "radial-gradient(520px 280px at 20% 20%, rgba(37,99,235,0.18), transparent 55%), radial-gradient(520px 300px at 80% 30%, rgba(219,39,119,0.14), transparent 60%), rgba(255,255,255,0.80)",
                minHeight: 360,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: 14 }} className="t5-bento">
                <div className="t5-tile" style={{ gridColumn: "span 7" }}>
                  <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>Modern structure</div>
                  <div style={{ marginTop: 8, color: "var(--t5-muted)", lineHeight: 1.6 }}>
                    Bento blocks and premium spacing.
                  </div>
                </div>
                <div className="t5-tile" style={{ gridColumn: "span 5" }}>
                  <div style={{ fontWeight: 900 }}>Trust</div>
                  <div style={{ marginTop: 8, color: "var(--t5-muted)" }}>Proof + testimonials</div>
                </div>
                <div className="t5-tile" style={{ gridColumn: "span 6" }}>
                  <div style={{ fontWeight: 900 }}>Clarity</div>
                  <div style={{ marginTop: 8, color: "var(--t5-muted)" }}>Readable, elegant type</div>
                </div>
                <div className="t5-tile" style={{ gridColumn: "span 6" }}>
                  <div style={{ fontWeight: 900 }}>Speed</div>
                  <div style={{ marginTop: 8, color: "var(--t5-muted)" }}>Light and responsive</div>
                </div>
                <div className="t5-tile" style={{ gridColumn: "span 12" }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(11,18,32,0.12)", color: "var(--t5-muted)", fontWeight: 800, fontSize: 12 }}>
                      Modern
                    </span>
                    <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(11,18,32,0.12)", color: "var(--t5-muted)", fontWeight: 800, fontSize: 12 }}>
                      Clean
                    </span>
                    <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(11,18,32,0.12)", color: "var(--t5-muted)", fontWeight: 800, fontSize: 12 }}>
                      Premium
                    </span>
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

