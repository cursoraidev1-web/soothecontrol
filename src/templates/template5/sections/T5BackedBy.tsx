"use client";

import type { BackedBySection as BackedBySectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T5BackedBy({
  section,
  sectionIndex,
}: {
  section: BackedBySectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const title = section.title || "Trusted by teams who care about quality";

  const logos =
    section.logos && section.logos.length > 0
      ? section.logos
      : [
          { name: "Partner One", url: null },
          { name: "Partner Two", url: null },
          { name: "Partner Three", url: null },
          { name: "Partner Four", url: null },
          { name: "Partner Five", url: null },
          { name: "Partner Six", url: null },
        ];

  return (
    <section className="t5-section">
      <div className="t5-container">
        <span className="t5-eyebrow">Proof</span>
        <EditableText
          as="h2"
          className="t5-title"
          value={title}
          placeholder="Trust title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <div className="t5-card" style={{ marginTop: 16, padding: 14 }}>
          <div className="t5-bento">
            {logos.map((l, idx) => (
              <div
                key={`${l.name}-${idx}`}
                className="t5-tile"
                style={{ gridColumn: "span 4", textAlign: "center", fontWeight: 900, color: "var(--t5-muted)" }}
              >
                {l.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={l.url} alt={l.name} style={{ height: 22, width: "auto", opacity: 0.85, filter: "grayscale(1)" }} />
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

