"use client";

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
        <p className="t5-sub">Quick answers to common questions.</p>

        <div className="t5-bento" style={{ marginTop: 18 }}>
          {filled.map((it, idx) => (
            <div key={idx} className="t5-card" style={{ gridColumn: "span 6", padding: 18 }}>
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
                style={{ fontFamily: "var(--t5-serif)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}
              />
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
                style={{ marginTop: 10, color: "var(--t5-muted)", lineHeight: 1.75 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

