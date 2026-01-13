"use client";

import type { RichTextSection as RichTextSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";
import EditableHtml from "@/components/inline-editor/EditableHtml";

interface RichTextSectionProps {
  section: RichTextSectionType;
  sectionIndex?: number;
}

export default function RichTextSection({ section, sectionIndex }: RichTextSectionProps) {
  const editor = useInlineEditor();
  const title = section.title || "";
  const body = section.body || getLoremParagraph();

  // Check if body contains two-column layout indicators or use default layout
  const hasTwoColumn = body.includes('class="t1-two-col"') || body.includes('class="t1-richtext-two-col"');

  return (
    <section className="t1-section">
      <div className="t1-container">
        {(title || editor?.enabled) && (
          <>
            <span className="t1-label">About</span>
            <EditableText
              as="h2"
              className="t1-section-heading"
              value={title}
              placeholder="Section title"
              onCommit={(next) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, title: next });
              }}
            />
          </>
        )}
        <EditableHtml
          className={`t1-richtext ${hasTwoColumn ? "t1-richtext-two-col" : ""}`}
          html={body}
          onCommit={(nextHtml) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, body: nextHtml });
          }}
        />
      </div>
    </section>
  );
}
