"use client";

import type { GallerySection as GallerySectionType } from "@/lib/pageSchema";
import { getLoremHeadline } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T3Gallery({
  section,
  sectionIndex,
}: {
  section: GallerySectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const title = section.title || getLoremHeadline();

  const images =
    section.images && section.images.length > 0
      ? section.images
      : Array.from({ length: 8 }, (_, i) => ({
          url: `https://via.placeholder.com/600x600?text=Image+${i + 1}`,
          alt: `Gallery image ${i + 1}`,
        }));

  return (
    <section className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">Gallery</span>
        <EditableText
          as="h2"
          className="t3-section-title"
          value={title}
          placeholder="Gallery title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 12,
          }}
        >
          {images.slice(0, 8).map((img, idx) => {
            const span = idx === 0 ? 7 : idx === 1 ? 5 : 4;
            return (
              <div
                key={idx}
                className="t3-card"
                style={{
                  gridColumn: `span ${span}`,
                  overflow: "hidden",
                  borderRadius: "var(--t3-radius)",
                }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: 260,
                    objectFit: "cover",
                    display: "block",
                    filter: "saturate(1.02)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

