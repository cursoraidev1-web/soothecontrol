"use client";

import type { RichTextSection as RichTextSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";
import EditableHtml from "@/components/inline-editor/EditableHtml";

export default function T6RichText({
  section,
  sectionIndex,
  label = "About",
}: {
  section: RichTextSectionType;
  sectionIndex?: number;
  label?: string;
}) {
  const editor = useInlineEditor();
  const title = section.title || "";
  const body = section.body || `<p>${getLoremParagraph()}</p>`;

  return (
    <section className="t6-section">
      <div className="t6-container">
        <span className="t6-eyebrow">{label}</span>
        {(title || editor?.enabled) ? (
          <EditableText
            as="h2"
            className="t6-title"
            value={title}
            placeholder="Section title"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
        ) : null}
        <div className="t6-card t6-prose" style={{ marginTop: 16, padding: 18 }}>
          <EditableHtml
            html={body}
            className=""
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

