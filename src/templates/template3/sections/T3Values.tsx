"use client";

import type { ValuesSection as ValuesSectionType } from "@/lib/pageSchema";
import { getLoremValueDesc, getLoremValueTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T3Values({
  section,
  sectionIndex,
}: {
  section: ValuesSectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const items =
    section.items && section.items.length > 0
      ? section.items
      : [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }];

  const filled = items.map((it) => ({
    title: it.title || getLoremValueTitle(),
    desc: it.desc || getLoremValueDesc(),
  }));

  return (
    <section className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">Values</span>
        <h2 className="t3-section-title">The way we work</h2>
        <p className="t3-section-sub">
          Premium isn’t a color — it’s decisions, consistency, and the small details.
        </p>

        <div className="t3-grid-3" style={{ marginTop: 18 }}>
          {filled.map((v, idx) => (
            <div key={idx} className="t3-card t3-item">
              <div className="t3-badge" style={{ background: "rgba(180,83,9,0.10)", color: "var(--t3-accent2)", borderColor: "rgba(180,83,9,0.18)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <EditableText
                as="h3"
                value={v.title}
                placeholder="Value title"
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filled.map((x) => ({ ...x }));
                  nextItems[idx] = { ...nextItems[idx], title: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              <EditableText
                as="p"
                value={v.desc}
                placeholder="Value description"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filled.map((x) => ({ ...x }));
                  nextItems[idx] = { ...nextItems[idx], desc: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

