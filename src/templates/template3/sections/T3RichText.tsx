"use client";

import type { RichTextSection as RichTextSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";
import EditableHtml from "@/components/inline-editor/EditableHtml";

export default function T3RichText({
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
    <section className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">{label}</span>
        {title || editor?.enabled ? (
          <EditableText
            as="h2"
            className="t3-section-title"
            value={title}
            placeholder="Section title"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
        ) : null}

        <div
          className="t3-card"
          style={{ marginTop: 16, padding: 22, background: "rgba(255,255,255,0.75)" }}
        >
          <EditableHtml
            html={body}
            onCommit={(nextHtml) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, body: nextHtml });
            }}
            className="t3-muted"
          />
        </div>
      </div>
    </section>
  );
}

