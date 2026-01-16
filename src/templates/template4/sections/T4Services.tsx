"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import { getLoremServiceDesc, getLoremServiceTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function Icon({ i }: { i: number }) {
  // Template4: sharp, futuristic “neon” line icons.
  const paths = [
    // hex
    "M8 3l8 0 5 9-5 9H8L3 12 8 3z",
    // circuit-ish
    "M6 7h8a4 4 0 0 1 0 8H9m9-8v0m0 8v0M6 17h6",
    // prism
    "M12 3l9 6-9 12L3 9l9-6z",
    // waveform
    "M4 13c2 0 2-6 4-6s2 12 4 12 2-12 4-12 2 6 4 6",
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={paths[i % paths.length]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function T4Services({
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
    <section id="services" className="t4-section">
      <div className="t4-container">
        <span className="t4-eyebrow">Services</span>
        <h2 className="t4-title">What we deliver</h2>
        <p className="t4-sub">
          Clean design, strong structure, and sections that build trust—without feeling generic.
        </p>

        <div className="t4-bento" style={{ marginTop: 18 }}>
          {filled.map((s, idx) => (
            <div
              key={idx}
              className="t4-card t4-item"
              style={{ gridColumn: "span 4", padding: 18 }}
            >
              <div className="t4-chip">
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

