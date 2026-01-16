"use client";

import type { UseCasesSection as UseCasesSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph, getLoremShortText } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T6UseCases({
  section,
  sectionIndex,
}: {
  section: UseCasesSectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const title = section.title || "Use cases";
  const description = section.description || getLoremParagraph();

  const items =
    section.items && section.items.length > 0
      ? section.items
      : [
          { title: "", description: "", linkText: "Learn more", linkHref: "#" },
          { title: "", description: "", linkText: "Learn more", linkHref: "#" },
          { title: "", description: "", linkText: "Learn more", linkHref: "#" },
        ];

  const filled = items.map((it) => ({
    title: it.title || getLoremHeadline(),
    description: it.description || getLoremShortText(),
    linkText: it.linkText || "Learn more",
    linkHref: it.linkHref || "#",
  }));

  return (
    <section className="t6-section">
      <div className="t6-container">
        <span className="t6-eyebrow">Use cases</span>
        <EditableText
          as="h2"
          className="t6-title"
          value={title}
          placeholder="Use cases title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <EditableText
          as="p"
          className="t6-sub"
          value={description}
          placeholder="Use cases description"
          multiline
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, description: next });
          }}
        />

        <div className="t6-bento" style={{ marginTop: 18 }}>
          {filled.map((it, idx) => (
            <div key={idx} className="t6-card t6-item" style={{ gridColumn: "span 6", padding: 18 }}>
              <div className="t6-chip" style={{ width: 40, height: 40 }}>
                <span style={{ fontWeight: 950 }}>{idx + 1}</span>
              </div>
              <EditableText
                as="h3"
                value={it.title}
                placeholder="Item title"
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filled.map((x) => ({ ...x }));
                  nextItems[idx] = { ...nextItems[idx], title: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
                style={{ fontWeight: 900, fontFamily: "var(--t6-serif)", letterSpacing: "-0.02em" }}
              />
              <EditableText
                as="p"
                value={it.description}
                placeholder="Item description"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filled.map((x) => ({ ...x }));
                  nextItems[idx] = { ...nextItems[idx], description: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
                style={{ marginTop: 10, color: "var(--t6-muted)", lineHeight: 1.75 }}
              />
              <a
                href={it.linkHref}
                style={{
                  marginTop: 12,
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "center",
                  color: "rgba(255,255,255,0.92)",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                <EditableText
                  as="span"
                  value={it.linkText}
                  placeholder="Link text"
                  onCommit={(next) => {
                    if (!editor || sectionIndex == null) return;
                    const nextItems = filled.map((x) => ({ ...x }));
                    nextItems[idx] = { ...nextItems[idx], linkText: next };
                    editor.updateSection(sectionIndex, { ...section, items: nextItems });
                  }}
                />
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

