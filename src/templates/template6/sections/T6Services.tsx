"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import { getLoremServiceDesc, getLoremServiceTitle } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function Icon({ i }: { i: number }) {
  // Template6: “motion” icon set (pairs well with the slider hero).
  const paths = [
    // aperture
    "M12 2l3 5-2 3h-2L9 7l3-5zM6 7l3 5-1 3-4 1-2-3 4-6zM18 7l4 6-2 3-4-1-1-3 3-5zM8 15h8l2 3-3 4H9l-3-4 2-3z",
    // layers
    "M12 3l9 6-9 6-9-6 9-6zM3 13l9 6 9-6",
    // rocket-ish
    "M14 3c4 1 7 4 7 8-4 2-7 2-10 0-2-3-2-6 0-8 1-1 2-1 3 0zM9 11l-4 4m0 4l4-4",
    // wand
    "M4 20l10-10m2-2l4-4M14 4l6 6",
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={paths[i % paths.length]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function T6Services({
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
    <section id="services" className="t6-section">
      <div className="t6-container">
        <span className="t6-eyebrow">Services</span>
        <h2 className="t6-title">What we build</h2>

        <div className="t6-bento" style={{ marginTop: 18 }}>
          {filled.map((s, idx) => (
            <div
              key={idx}
              className="t6-card t6-item"
              style={{ gridColumn: "span 4", padding: 18 }}
            >
              <div className="t6-chip">
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
                style={{ fontWeight: 900, fontFamily: "var(--t6-serif)", letterSpacing: "-0.02em" }}
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
                style={{ marginTop: 10, color: "var(--t6-muted)", lineHeight: 1.75 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

