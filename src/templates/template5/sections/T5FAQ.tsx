"use client";

import { useState } from "react";
import type { FAQSection as FAQSectionType } from "@/lib/pageSchema";
import { getLoremShortText } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function loremQuestion() {
  const qs = [
    "How fast can we launch?",
    "Can I edit the content myself?",
    "Do you support custom domains?",
    "What if I need changes later?",
    "Is this mobile-friendly?",
  ];
  return qs[Math.floor(Math.random() * qs.length)];
}

function loremAnswer() {
  const as = [
    "Yes—everything is responsive, clean, and designed to convert.",
    "You can edit text directly in preview mode, then save your draft.",
    "Custom domains and subdomains are supported with automatic routing.",
    getLoremShortText(),
    getLoremShortText(),
  ];
  return as[Math.floor(Math.random() * as.length)];
}

export default function T5FAQ({
  section,
  sectionIndex,
}: {
  section: FAQSectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const title = section.title || "FAQs";
  const items =
    section.items && section.items.length > 0
      ? section.items
      : [
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
        ];

  const filled = items.map((it) => ({
    question: it.question || loremQuestion(),
    answer: it.answer || loremAnswer(),
  }));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="t5-section">
      <div className="t5-container">
        <span className="t5-eyebrow">FAQ</span>
        <EditableText
          as="h2"
          className="t5-title"
          value={title}
          placeholder="FAQ title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div className="t5-bento" style={{ marginTop: 18 }}>
          {filled.map((it, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="t5-card" style={{ gridColumn: "span 6", padding: 18 }}>
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
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
                    as="h3"
                    value={it.question}
                    placeholder="Question"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filled.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], question: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                    style={{ fontFamily: "var(--t5-serif)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, flex: 1 }}
                  />
                  <span
                    aria-hidden="true"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      border: "1px solid rgba(37,99,235,0.22)",
                      background: "rgba(37,99,235,0.08)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--t5-accent)",
                      fontWeight: 900,
                      fontSize: 18,
                      lineHeight: 1,
                    }}
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? "1000px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease, margin-top 0.3s ease",
                    marginTop: isOpen ? 10 : 0,
                  }}
                >
                  <EditableText
                    as="p"
                    value={it.answer}
                    placeholder="Answer"
                    multiline
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filled.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], answer: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                    style={{ color: "var(--t5-muted)", lineHeight: 1.75 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

