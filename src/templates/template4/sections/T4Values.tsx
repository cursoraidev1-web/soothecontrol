"use client";

import type { ValuesSection as ValuesSectionType } from "@/lib/pageSchema";
import { getLoremValueDesc, getLoremValueTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T4Values({
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
    <section className="t4-section">
      <div className="t4-container">
        <span className="t4-eyebrow">Values</span>
        <h2 className="t4-title">How we work</h2>

        <div className="t4-bento" style={{ marginTop: 18 }}>
          {filled.map((v, idx) => (
            <div key={idx} className="t4-card t4-item" style={{ gridColumn: "span 4", padding: 18 }}>
              <div className="t4-chip" style={{ background: "rgba(6,182,212,0.14)", borderColor: "rgba(6,182,212,0.26)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {/* shield (t4) */}
                  <path
                    d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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

