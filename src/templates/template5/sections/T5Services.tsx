"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import { getLoremServiceDesc, getLoremServiceTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function Icon({ i }: { i: number }) {
  // Template5: crisp “product” icons (distinct from t3/t4).
  const idx = i % 4;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {idx === 0 ? (
        <>
          <path d="M4 8h16" strokeLinecap="round" />
          <path d="M6 8l2 12h8l2-12" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
        </>
      ) : null}
      {idx === 1 ? (
        <>
          <path d="M12 3v6" strokeLinecap="round" />
          <path d="M12 15v6" strokeLinecap="round" />
          <path d="M3 12h6" strokeLinecap="round" />
          <path d="M15 12h6" strokeLinecap="round" />
          <path d="M12 12l3-3" strokeLinecap="round" />
          <path d="M12 12l-3 3" strokeLinecap="round" />
        </>
      ) : null}
      {idx === 2 ? (
        <>
          <path d="M7 4h10" strokeLinecap="round" />
          <path d="M6 8h12" strokeLinecap="round" />
          <path d="M8 8v12h8V8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 12h4" strokeLinecap="round" />
        </>
      ) : null}
      {idx === 3 ? (
        <>
          <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" strokeLinejoin="round" />
        </>
      ) : null}
    </svg>
  );
}

export default function T5Services({
  section,
  sectionIndex,
}: {
  section: ServicesSectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const items =
    section.items && section.items.length > 0
      ? section.items
      : [{ title: "", desc: "" }, { title: "", desc: "" }, { title: "", desc: "" }];

  const filled = items.map((it) => ({
    title: it.title || getLoremServiceTitle(),
    desc: it.desc || getLoremServiceDesc(),
  }));

  return (
    <section id="services" className="t5-section">
      <div className="t5-container">
        <span className="t5-eyebrow">Services</span>
        <h2 className="t5-title">What we deliver</h2>
        <p className="t5-sub">Clean design, strong structure, and sections that build trust.</p>

        <div className="t5-bento" style={{ marginTop: 18 }}>
          {filled.map((s, idx) => (
            <div
              key={idx}
              className="t5-card t5-item"
              style={{ gridColumn: "span 4", padding: 18 }}
            >
              <div className="t5-chip">
                <Icon i={idx} />
              </div>
              <EditableText
                as="h3"
                value={s.title}
                placeholder="Service title"
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filled.map((x) => ({ ...x }));
                  nextItems[idx] = { ...nextItems[idx], title: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              <EditableText
                as="p"
                value={s.desc}
                placeholder="Service description"
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

