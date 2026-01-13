"use client";

import { useState } from "react";
import type { FAQSection as FAQSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph, getLoremSentence } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface FAQSectionProps {
  section: FAQSectionType;
  sectionIndex?: number;
}

export default function FAQSection({ section, sectionIndex }: FAQSectionProps) {
  const editor = useInlineEditor();
  const title = section.title || getLoremHeadline();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  // Ensure at least 5 FAQs for display
  const faqs = section.items && section.items.length > 0
    ? section.items
    : Array.from({ length: 5 }, (_, i) => ({
        question: `Question ${i + 1}: ${getLoremSentence()}`,
        answer: getLoremParagraph(),
      }));

  // Fill empty FAQs with lorem ipsum
  const filledFAQs = faqs.map((faq) => ({
    question: faq.question || getLoremSentence(),
    answer: faq.answer || getLoremParagraph(),
  }));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="t1-section">
      <div className="t1-container">
        <span className="t1-label" style={{ display: "block", textAlign: "center", marginBottom: "var(--spacing-sm)" }}>
          FAQ
        </span>
        <EditableText
          as="h2"
          className="t1-section-title"
          value={title}
          placeholder="FAQ title"
          style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <div className="t1-faq-list">
          {filledFAQs.map((faq, index) => (
            <div
              key={index}
              className="t1-faq-item"
              style={{
                borderBottom: index < filledFAQs.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <button
                className="t1-faq-question"
                onClick={() => toggleFAQ(index)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "var(--spacing-md) 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "var(--font-size-lg)",
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                }}
              >
                <EditableText
                  as="span"
                  value={faq.question}
                  placeholder="Question"
                  onCommit={(next) => {
                    if (!editor || sectionIndex == null) return;
                    const nextItems = filledFAQs.map((x) => ({ ...x }));
                    nextItems[index] = { ...nextItems[index], question: next };
                    editor.updateSection(sectionIndex, { ...section, items: nextItems });
                  }}
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{
                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    flexShrink: 0,
                    marginLeft: "var(--spacing-md)",
                  }}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                className="t1-faq-answer"
                style={{
                  maxHeight: openIndex === index ? "1000px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, padding 0.3s ease",
                  padding: openIndex === index ? "0 0 var(--spacing-md) 0" : "0",
                }}
              >
                <EditableText
                  as="p"
                  value={faq.answer}
                  placeholder="Answer"
                  multiline
                  style={{
                    fontSize: "var(--font-size-base)",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                  }}
                  onCommit={(next) => {
                    if (!editor || sectionIndex == null) return;
                    const nextItems = filledFAQs.map((x) => ({ ...x }));
                    nextItems[index] = { ...nextItems[index], answer: next };
                    editor.updateSection(sectionIndex, { ...section, items: nextItems });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
