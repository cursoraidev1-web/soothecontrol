"use client";

import type { RichTextSection as RichTextSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";
import EditableHtml from "@/components/inline-editor/EditableHtml";

export default function T4RichText({
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
    <section className="t4-section">
      <div className="t4-container">
        <span className="t4-eyebrow">{label}</span>
        {(title || editor?.enabled) ? (
          <EditableText
            as="h2"
            className="t4-title"
            value={title}
            placeholder="Section title"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
        ) : null}
        <div className="t4-card" style={{ marginTop: 16, padding: 18 }}>
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

