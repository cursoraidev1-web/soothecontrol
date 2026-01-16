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

export default function T3Testimonials({
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
        ];

  const filled = items.map((t) => ({
    name: t.name || "Customer Name",
    role: t.role || "Role",
    quote: t.quote || getLoremParagraph(),
    company: t.company || "",
  }));

  return (
    <section className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">Testimonials</span>
        <EditableText
          as="h2"
          className="t3-section-title"
          value={title}
          placeholder="Testimonials title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <p className="t3-section-sub">Short, specific, believable—proof that builds trust.</p>

        <div className="t3-two-col" style={{ marginTop: 18 }}>
          {filled.map((t, idx) => (
            <div key={`${t.name}-${idx}`} className="t3-card t3-item">
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 16,
                    background: "rgba(15,118,110,0.12)",
                    border: "1px solid rgba(15,118,110,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    color: "var(--t3-accent)",
                  }}
                >
                  {initials(t.name)}
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
                  <div className="t3-muted" style={{ fontSize: 13, fontWeight: 700 }}>
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

