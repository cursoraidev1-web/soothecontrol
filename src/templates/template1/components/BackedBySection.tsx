"use client";

import type { BackedBySection as BackedBySectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface BackedBySectionProps {
  section: BackedBySectionType;
  sectionIndex?: number;
}

export default function BackedBySection({ section, sectionIndex }: BackedBySectionProps) {
  const editor = useInlineEditor();
  const title = section.title || "Backed by the best companies and visionary angels";
  
  // Ensure at least 3 logos for display
  const logos = section.logos && section.logos.length > 0
    ? section.logos
    : [
        { name: "Partner One", url: null },
        { name: "Partner Two", url: null },
        { name: "Partner Three", url: null },
      ];

  // Fill empty logos with placeholder content
  const filledLogos = logos.map((logo) => ({
    name: logo.name || "Partner",
    url: logo.url,
  }));

  return (
    <section className="t1-section">
      <div className="t1-container">
        <div style={{ 
          textAlign: "center", 
          marginBottom: "var(--spacing-2xl)",
          paddingTop: "var(--spacing-xl)",
          borderTop: "1px solid var(--color-border)"
        }}>
          <span className="t1-label" style={{ display: "block", marginBottom: "var(--spacing-md)" }}>
            Partners
          </span>
          <EditableText
            as="h2"
            className="t1-section-title"
            value={title}
            placeholder="Partners title"
            style={{ marginBottom: 0 }}
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
        </div>
        <div className="t1-backed-by-grid">
          {filledLogos.map((logo, index) => (
            <div key={index} className="t1-backed-by-logo">
              {logo.url ? (
                <img
                  src={logo.url}
                  alt={logo.name}
                  style={{ maxWidth: "100%", height: "auto", opacity: 0.7 }}
                />
              ) : (
                <div style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-secondary)",
                  textAlign: "center",
                  padding: "var(--spacing-md)",
                  opacity: 0.6
                }}>
                  <EditableText
                    as="span"
                    value={logo.name}
                    placeholder="Logo name"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextLogos = filledLogos.map((x) => ({ ...x }));
                      nextLogos[index] = { ...nextLogos[index], name: next };
                      editor.updateSection(sectionIndex, { ...section, logos: nextLogos });
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
