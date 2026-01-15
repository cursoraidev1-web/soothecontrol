"use client";

import type { UseCasesSection as UseCasesSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph, getLoremShortText } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface T2UseCasesProps {
  section: UseCasesSectionType;
  sectionIndex?: number;
}

export default function T2UseCases({ section, sectionIndex }: T2UseCasesProps) {
  const editor = useInlineEditor();
  const title = section.title || "Use cases";
  const description = section.description || getLoremParagraph();

  const items =
    section.items && section.items.length > 0
      ? section.items
      : [
          { title: "", description: "", linkText: "Learn more", linkHref: "#" },
          { title: "", description: "", linkText: "Learn more", linkHref: "#" },
          { title: "", description: "", linkText: "Learn more", linkHref: "#" },
        ];

  const filled = items.map((it) => ({
    title: it.title || getLoremHeadline(),
    description: it.description || getLoremShortText(),
    linkText: it.linkText || "Learn more",
    linkHref: it.linkHref || "#",
  }));

  return (
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-gray-600 uppercase">
            Use cases
          </span>
          <EditableText
            as="h2"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            value={title}
            placeholder="Use cases title"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
          <EditableText
            as="p"
            className="mt-4 text-lg text-gray-600"
            value={description}
            placeholder="Use cases description"
            multiline
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, description: next });
            }}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filled.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-gray-300"
            >
              <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 blur-2xl opacity-60 transition-opacity group-hover:opacity-90" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <EditableText
                    as="h3"
                    className="text-xl font-semibold text-gray-900"
                    value={item.title}
                    placeholder="Use case title"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filled.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], title: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                  />
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-900">
                    {idx + 1}
                  </span>
                </div>
                <EditableText
                  as="p"
                  className="mt-3 text-gray-600 leading-relaxed"
                  value={item.description}
                  placeholder="Use case description"
                  multiline
                  onCommit={(next) => {
                    if (!editor || sectionIndex == null) return;
                    const nextItems = filled.map((x) => ({ ...x }));
                    nextItems[idx] = { ...nextItems[idx], description: next };
                    editor.updateSection(sectionIndex, { ...section, items: nextItems });
                  }}
                />
                <a
                  href={item.linkHref}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-gray-900 transition-colors hover:text-gray-700"
                >
                  <EditableText
                    as="span"
                    value={item.linkText}
                    placeholder="Link text"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filled.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], linkText: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                  />
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

