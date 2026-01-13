"use client";

import type { RichTextSection as RichTextSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";

interface RichTextSectionProps {
  section: RichTextSectionType;
}

export default function RichTextSection({ section }: RichTextSectionProps) {
  const title = section.title || "";
  const body = section.body || getLoremParagraph();

  // Check if body contains two-column layout indicators or use default layout
  const hasTwoColumn = body.includes('class="t1-two-col"') || body.includes('class="t1-richtext-two-col"');

  return (
    <section className="t1-section">
      <div className="t1-container">
        {title && (
          <>
            <span className="t1-label">About</span>
            <h2 className="t1-section-heading">{title}</h2>
          </>
        )}
        <div
          className={`t1-richtext ${hasTwoColumn ? "t1-richtext-two-col" : ""}`}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </section>
  );
}
