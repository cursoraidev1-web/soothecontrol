"use client";

import type { ValuesSection as ValuesSectionType } from "@/lib/pageSchema";
import { getLoremValueDesc, getLoremValueTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function Icon({ i }: { i: number }) {
  const paths = [
    // compass
    "M12 2l3 7-3 3-3-3 3-7zM6 18l6-3 6 3",
    // target
    "M12 2a10 10 0 1 0 10 10M12 6a6 6 0 1 0 6 6M12 10a2 2 0 1 0 2 2",
    // shield-check
    "M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4zM9 12l2 2 4-5",
    // spark
    "M12 3l1.6 4.7L18 9.3l-4.4 1.6L12 16l-1.6-5.1L6 9.3l4.4-1.6L12 3z",
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={paths[i % paths.length]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function T6Values({
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
    <section className="t6-section">
      <div className="t6-container">
        <span className="t6-eyebrow">Values</span>
        <h2 className="t6-title">How we work</h2>

        <div className="t6-bento" style={{ marginTop: 18 }}>
          {filled.map((v, idx) => (
            <div key={idx} className="t6-card t6-item" style={{ gridColumn: "span 4", padding: 18 }}>
              <div
                className="t6-chip"
                style={{
                  background: "rgb(var(--t6-accent2-rgb) / 0.10)",
                  borderColor: "rgb(var(--t6-accent2-rgb) / 0.22)",
                  color: "var(--t6-accent2)",
                }}
              >
                <Icon i={idx} />
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
                style={{ fontWeight: 900, fontFamily: "var(--t6-serif)", letterSpacing: "-0.02em" }}
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
                style={{ marginTop: 10, color: "var(--t6-muted)", lineHeight: 1.75 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

