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

export default function T4Testimonials({
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
    name: t.name || "Customer Name",
    role: t.role || "Role",
    quote: t.quote || getLoremParagraph(),
    company: t.company || "",
  }));

  return (
    <section className="t4-section">
      <div className="t4-container">
        <span className="t4-eyebrow">Testimonials</span>
        <EditableText
          as="h2"
          className="t4-title"
          value={title}
          placeholder="Testimonials title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div className="t4-bento" style={{ marginTop: 18 }}>
          {filled.map((t, idx) => (
            <div key={`${t.name}-${idx}`} className="t4-card t4-item" style={{ gridColumn: "span 4", padding: 18 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  className="t4-chip"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 16,
                    background: "rgba(6,182,212,0.14)",
                    borderColor: "rgba(6,182,212,0.26)",
                  }}
                >
                  <span style={{ fontWeight: 900 }}>{initials(t.name)}</span>
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
                  <div style={{ color: "var(--t4-muted)", fontSize: 13, fontWeight: 800 }}>
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
                style={{ marginTop: 12 }}
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

