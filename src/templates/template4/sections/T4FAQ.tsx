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
    getLoremShortText(),
    getLoremShortText(),
    getLoremShortText(),
  ];
  return as[Math.floor(Math.random() * as.length)];
}

export default function T4FAQ({
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
    <section className="t4-section">
      <div className="t4-container">
        <span className="t4-eyebrow">FAQ</span>
        <EditableText
          as="h2"
          className="t4-title"
          value={title}
          placeholder="FAQ title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div className="t4-bento" style={{ marginTop: 18 }}>
          {filled.map((it, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="t4-card" style={{ gridColumn: "span 6", padding: 18 }}>
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
                    style={{ fontFamily: "var(--t4-serif)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0, flex: 1 }}
                  />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                      flexShrink: 0,
                    }}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                    style={{ color: "var(--t4-muted)", lineHeight: 1.7 }}
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

