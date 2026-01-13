"use client";

import type { BackedBySection as BackedBySectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T3BackedBy({
  section,
  sectionIndex,
}: {
  section: BackedBySectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const title = section.title || "Trusted by teams who value craft";

  const logos =
    section.logos && section.logos.length > 0
      ? section.logos
      : [
          { name: "Northwind", url: null },
          { name: "Acme Co.", url: null },
          { name: "Globex", url: null },
          { name: "Umbrella", url: null },
          { name: "Initech", url: null },
          { name: "Soylent", url: null },
        ];

  return (
    <section className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">Proof</span>
        <EditableText
          as="h2"
          className="t3-section-title"
          value={title}
          placeholder="Trust title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div
          className="t3-card"
          style={{
            marginTop: 16,
            padding: 16,
            background: "rgba(255,255,255,0.75)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 12,
              alignItems: "center",
            }}
          >
            {logos.map((l, idx) => (
              <div
                key={`${l.name}-${idx}`}
                style={{
                  borderRadius: 14,
                  border: "1px solid rgba(18,18,18,0.10)",
                  padding: 14,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.75)",
                  fontWeight: 800,
                  color: "var(--t3-muted)",
                }}
              >
                {l.url ? (
                  <img
                    src={l.url}
                    alt={l.name}
                    style={{ height: 24, width: "auto", opacity: 0.8, filter: "grayscale(1)" }}
                  />
                ) : (
                  <EditableText
                    as="span"
                    value={l.name}
                    placeholder="Logo name"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextLogos = logos.map((x) => ({ ...x }));
                      nextLogos[idx] = { ...nextLogos[idx], name: next };
                      editor.updateSection(sectionIndex, { ...section, logos: nextLogos });
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

