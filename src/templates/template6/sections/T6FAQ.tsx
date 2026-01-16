"use client";

import { useState } from "react";
import type { FAQSection as FAQSectionType } from "@/lib/pageSchema";
import { getLoremShortText } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function loremQuestion() {
  const qs = [
    "How quickly can we get this live?",
    "Can I edit content myself?",
    "Do you support subdomains and custom domains?",
    "Is it mobile-friendly?",
    "Can we add extra pages later?",
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

export default function T6FAQ({
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
      : [{ question: "", answer: "" }, { question: "", answer: "" }, { question: "", answer: "" }, { question: "", answer: "" }];

  const filled = items.map((it) => ({
    question: it.question || loremQuestion(),
    answer: it.answer || loremAnswer(),
  }));

  return (
    <section className="t6-section">
      <div className="t6-container">
        <span className="t6-eyebrow">FAQ</span>
        <EditableText
          as="h2"
          className="t6-title"
          value={title}
          placeholder="FAQ title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <p className="t6-sub">Quick answers to common questions.</p>

        <div className="t6-bento" style={{ marginTop: 18 }}>
          {filled.map((it, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="t6-card" style={{ gridColumn: "span 6", padding: 18 }}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
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
                    style={{
                      fontFamily: "var(--t6-serif)",
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      margin: 0,
                      flex: 1,
                    }}
                  />
                  <span
                    aria-hidden="true"
                    className="t6-chip"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      flexShrink: 0,
                      background: "rgba(34,197,94,0.10)",
                      borderColor: "rgba(34,197,94,0.22)",
                      color: "var(--t6-accent)",
                    }}
                  >
                    <span style={{ fontWeight: 950, fontSize: 18, lineHeight: 1 }}>
                      {isOpen ? "–" : "+"}
                    </span>
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
                    style={{ color: "var(--t6-muted)", lineHeight: 1.75 }}
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

