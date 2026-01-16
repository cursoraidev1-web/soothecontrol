"use client";

import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface T2TestimonialsProps {
  section: TestimonialsSectionType;
  sectionIndex?: number;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function T2Testimonials({ section, sectionIndex }: T2TestimonialsProps) {
  const editor = useInlineEditor();
  const title = section.title || getLoremHeadline();

  const items =
    section.items && section.items.length > 0
      ? section.items
      : [
          { name: "Alex Morgan", role: "Homeowner", quote: getLoremParagraph(), company: "" },
          { name: "Sam Lee", role: "Operations Lead", quote: getLoremParagraph(), company: "" },
          { name: "Jordan Patel", role: "Founder", quote: getLoremParagraph(), company: "" },
        ];

  const filled = items.map((t) => ({
    name: t.name || "Customer Name",
    role: t.role || "Role",
    company: t.company || "",
    quote: t.quote || getLoremParagraph(),
  }));

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-gray-600 uppercase">
            Testimonials
          </span>
          <EditableText
            as="h2"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            value={title}
            placeholder="Testimonials title"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
          <p className="mt-4 text-lg text-gray-600">
            Real words from people who’ve worked with us.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {filled.map((t, idx) => (
            <figure
              key={`${t.name}-${idx}`}
              className="relative overflow-hidden rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200"
            >
              <div className="absolute left-6 top-6 text-5xl font-black text-gray-200">
                “
              </div>
              <EditableText
                as="blockquote"
                className="relative mt-6 text-gray-700 leading-relaxed"
                value={t.quote}
                placeholder="Quote"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filled.map((x) => ({ ...x }));
                  nextItems[idx] = { ...nextItems[idx], quote: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              <figcaption className="mt-8 flex items-center gap-4 border-t border-gray-200 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900 ring-1 ring-gray-200">
                  {initials(t.name)}
                </div>
                <div className="min-w-0">
                  <EditableText
                    as="div"
                    className="font-semibold text-gray-900"
                    value={t.name}
                    placeholder="Name"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filled.map((x) => ({ ...x }));
                      nextItems[idx] = { ...nextItems[idx], name: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                  />
                  <div className="text-sm text-gray-600">
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
                        {" • "}
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
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

