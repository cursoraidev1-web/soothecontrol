"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T4Hero({
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
    <section className="t4-hero">
      <div className="t4-container">
        <div className="t4-grid">
          <div>
            <span className="t4-eyebrow">Built for {businessName}</span>
            <EditableText
              as="h1"
              className="t4-h1"
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
              className="t4-lead"
              value={subtext}
              placeholder="Hero subtext"
              multiline
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, subtext: next });
              }}
            />

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <a className="t4-cta" href={ctaHref}>
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
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                  textDecoration: "none",
                  fontWeight: 800,
                  fontSize: 14,
                  color: "var(--t4-ink)",
                }}
              >
                View services
              </a>
            </div>

            <div style={{ marginTop: 14, color: "var(--t4-muted)", fontWeight: 700, fontSize: 13 }}>
              Transparent pricing · Fast replies · Clean, modern design
            </div>
          </div>

          <div className="t4-card" style={{ padding: 16 }}>
            <div
              style={{
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.10)",
                background:
                  "radial-gradient(540px 300px at 20% 20%, rgb(var(--t4-accent-rgb) / 0.26), transparent 55%), radial-gradient(520px 320px at 80% 30%, rgb(var(--t4-accent2-rgb) / 0.20), transparent 60%), rgba(255,255,255,0.05)",
                minHeight: 360,
                overflow: "hidden",
              }}
            >
              <div style={{ padding: 14 }} className="t4-bento">
                <div className="t4-tile" style={{ gridColumn: "span 7" }}>
                  <div style={{ fontWeight: 900, letterSpacing: "-0.02em" }}>Elegant sections</div>
                  <div style={{ marginTop: 8, color: "var(--t4-muted)", lineHeight: 1.6 }}>
                    Bento layout, glass cards, and premium motion.
                  </div>
                </div>
                <div className="t4-tile" style={{ gridColumn: "span 5" }}>
                  <div style={{ fontWeight: 900 }}>Trust</div>
                  <div style={{ marginTop: 8, color: "var(--t4-muted)" }}>Testimonials + proof</div>
                </div>
                <div className="t4-tile" style={{ gridColumn: "span 6" }}>
                  <div style={{ fontWeight: 900 }}>Speed</div>
                  <div style={{ marginTop: 8, color: "var(--t4-muted)" }}>Lightweight & responsive</div>
                </div>
                <div className="t4-tile" style={{ gridColumn: "span 6" }}>
                  <div style={{ fontWeight: 900 }}>Clarity</div>
                  <div style={{ marginTop: 8, color: "var(--t4-muted)" }}>Clean hierarchy</div>
                </div>
                <div className="t4-tile" style={{ gridColumn: "span 12" }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", color: "var(--t4-muted)", fontWeight: 800, fontSize: 12 }}>
                      Modern
                    </span>
                    <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", color: "var(--t4-muted)", fontWeight: 800, fontSize: 12 }}>
                      Elegant
                    </span>
                    <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", color: "var(--t4-muted)", fontWeight: 800, fontSize: 12 }}>
                      High-converting
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

