"use client";

import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function T6Testimonials({
  section,
  sectionIndex,
}: {
  section: TestimonialsSectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const title = section.title || getLoremHeadline();
  const items =
    section.items && section.items.length > 0
      ? section.items
      : [
          { name: "Alex Morgan", role: "Client", quote: getLoremParagraph(), company: "" },
          { name: "Sam Lee", role: "Operations", quote: getLoremParagraph(), company: "" },
          { name: "Jordan Patel", role: "Founder", quote: getLoremParagraph(), company: "" },
        ];

  const filled = items.map((t) => ({
    name: t.name || "Customer",
    role: t.role || "",
    quote: t.quote || getLoremParagraph(),
    company: t.company || "",
  }));

  return (
    <section className="t6-section">
      <div className="t6-container">
        <span className="t6-eyebrow">Testimonials</span>
        <EditableText
          as="h2"
          className="t6-title"
          value={title}
          placeholder="Testimonials title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div className="t6-bento" style={{ marginTop: 18 }}>
          {filled.map((t, idx) => (
            <div key={`${t.name}-${idx}`} className="t6-card t6-item" style={{ gridColumn: "span 4", padding: 18 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div className="t6-chip" style={{ width: 48, height: 48 }}>
                  <span style={{ fontWeight: 950 }}>{initials(t.name)}</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <EditableText
                    as="div"
                    value={t.name}
                    placeholder="Name"
                    style={{ fontWeight: 900 }}
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filled.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], name: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                  />
                  <div style={{ color: "var(--t6-muted)", fontSize: 13, fontWeight: 800 }}>
                    <EditableText
                      as="span"
                      value={t.role}
                      placeholder="Role"
                      onCommit={(next) => {
                        if (!editor || sectionIndex == null) return;
                        const nextItems = filled.map((x) => ({ ...x }));
                        nextItems[idx] = { ...nextItems[idx], role: next };
                        editor.updateSection(sectionIndex, { ...section, items: nextItems });
                      }}
                    />
                    {t.company ? (
                      <>
                        {" · "}
                        <EditableText
                          as="span"
                          value={t.company}
                          placeholder="Company"
                          onCommit={(next) => {
                            if (!editor || sectionIndex == null) return;
                            const nextItems = filled.map((x) => ({ ...x }));
                            nextItems[idx] = { ...nextItems[idx], company: next };
                            editor.updateSection(sectionIndex, { ...section, items: nextItems });
                          }}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <EditableText
                as="p"
                value={t.quote}
                placeholder="Quote"
                multiline
                style={{ marginTop: 12, color: "var(--t6-muted)", lineHeight: 1.75 }}
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filled.map((x) => ({ ...x }));
                  nextItems[idx] = { ...nextItems[idx], quote: next };
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

