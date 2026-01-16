"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import { getLoremServiceDesc, getLoremServiceTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function Icon({ i }: { i: number }) {
  // Template3: warm editorial line icons (distinct from t4/t5).
  const paths = [
    // leaf
    "M5 19c7-1 12-6 14-14C11 7 6 12 5 19z",
    // compass
    "M12 2l3.2 7.8L23 12l-7.8 3.2L12 22l-3.2-6.8L1 12l7.8-2.2L12 2z",
    // spark
    "M12 3l1.6 4.7L18 9.3l-4.4 1.6L12 16l-1.6-5.1L6 9.3l4.4-1.6L12 3z",
    // hand/heart-ish
    "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z",
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={paths[i % paths.length]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function T3Services({
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
    <section id="services" className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">Services</span>
        <h2 className="t3-section-title">What we do — with taste</h2>
        <p className="t3-section-sub">
          Not just “a website”. A complete presence: clarity, credibility, and conversion.
        </p>

        <div className="t3-grid-3" style={{ marginTop: 18 }}>
          {filled.map((s, idx) => (
            <div key={idx} className="t3-card t3-item">
              <div className="t3-badge">
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

