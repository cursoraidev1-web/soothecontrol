"use client";

import type { RichTextSection as RichTextSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";
import EditableHtml from "@/components/inline-editor/EditableHtml";

interface T2RichTextProps {
  section: RichTextSectionType;
  sectionIndex?: number;
  label?: string;
}

export default function T2RichText({ section, sectionIndex, label }: T2RichTextProps) {
  const editor = useInlineEditor();
  const title = section.title || "";
  const body = section.body || getLoremParagraph();

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {label ? (
            <div className="mb-4">
              <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                {label}
              </span>
            </div>
          ) : null}
          {title || editor?.enabled ? (
            <EditableText
              as="h2"
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              value={title}
              placeholder="Section title"
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, title: next });
              }}
            />
          ) : null}

          <EditableHtml
            className={[
              "mt-6 text-gray-600 leading-relaxed",
              "[&_p]:mt-4",
              "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900",
              "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900",
              "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6",
              "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6",
              "[&_li]:mt-2",
              "[&_a]:font-semibold [&_a]:text-gray-900 [&_a]:underline [&_a]:underline-offset-4",
              "[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:text-gray-700",
            ].join(" ")}
            html={body}
            onCommit={(nextHtml) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, body: nextHtml });
            }}
          />
        </div>
      </div>
    </section>
  );
}

