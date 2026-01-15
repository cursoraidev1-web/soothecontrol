"use client";

import { useState } from "react";
import type { FAQSection as FAQSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph, getLoremSentence } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface T2FAQProps {
  section: FAQSectionType;
  sectionIndex?: number;
}

export default function T2FAQ({ section, sectionIndex }: T2FAQProps) {
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

  const filled = items.map((it) => ({
    question: it.question || getLoremSentence(),
    answer: it.answer || getLoremParagraph(),
  }));

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-gray-600 uppercase">
            FAQ
          </span>
          <EditableText
            as="h2"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            value={title}
            placeholder="FAQ title"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
          <p className="mt-4 text-lg text-gray-600">
            Quick answers to common questions.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {filled.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white ring-1 ring-gray-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-gray-900">
                    <EditableText
                      as="span"
                      value={item.question}
                      placeholder="Question"
                      onCommit={(next) => {
                        if (!editor || sectionIndex == null) return;
                        const nextItems = filled.map((x) => ({ ...x }));
                        nextItems[idx] = { ...nextItems[idx], question: next };
                        editor.updateSection(sectionIndex, { ...section, items: nextItems });
                      }}
                    />
                  </span>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900">
                    <svg
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                <div className={`${isOpen ? "block" : "hidden"} px-6 pb-6`}>
                  <EditableText
                    as="p"
                    className="text-gray-600 leading-relaxed"
                    value={item.answer}
                    placeholder="Answer"
                    multiline
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filled.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], answer: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
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

