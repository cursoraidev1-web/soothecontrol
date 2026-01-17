"use client";

import { useState } from "react";
import type { FAQSection as FAQSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph, getLoremSentence } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T3FAQ({
  section,
  sectionIndex,
}: {
  section: FAQSectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const [open, setOpen] = useState<number | null>(0);
  const title = section.title || getLoremHeadline();

  const items =
    section.items && section.items.length > 0
      ? section.items
      : Array.from({ length: 6 }, (_, i) => ({
          question: `Question ${i + 1}: ${getLoremSentence()}`,
          answer: getLoremParagraph(),
        }));

  return (
    <section className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">FAQ</span>
        <EditableText
          as="h2"
          className="t3-section-title"
          value={title}
          placeholder="FAQ title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div className="t3-card" style={{ marginTop: 16, padding: 10, background: "rgba(255,255,255,0.75)" }}>
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(18,18,18,0.10)",
                  background: "rgba(255,255,255,0.78)",
                  padding: 14,
                  margin: 10,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                  }}
                >
                  <EditableText
                    as="span"
                    value={it.question}
                    placeholder="Question"
                    style={{ fontWeight: 900, fontSize: 15 }}
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = items.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], question: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                  />
                  <span className="t3-badge" aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                {isOpen ? (
                  <EditableText
                    as="p"
                    value={it.answer}
                    placeholder="Answer"
                    multiline
                    style={{ marginTop: 10 }}
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = items.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], answer: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

