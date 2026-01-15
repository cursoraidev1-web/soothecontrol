"use client";

import type { ValuesSection as ValuesSectionType } from "@/lib/pageSchema";
import { getLoremValueDesc, getLoremValueTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T5Values({
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
    <section className="t5-section">
      <div className="t5-container">
        <span className="t5-eyebrow">Values</span>
        <h2 className="t5-title">How we work</h2>
        <p className="t5-sub">Modern standards: clarity, speed, and trust.</p>

        <div className="t5-bento" style={{ marginTop: 18 }}>
          {filled.map((v, idx) => (
            <div key={idx} className="t5-card t5-item" style={{ gridColumn: "span 4", padding: 18 }}>
              <div
                className="t5-chip"
                style={{ background: "rgba(219,39,119,0.08)", borderColor: "rgba(219,39,119,0.18)", color: "var(--t5-accent2)" }}
              >
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

