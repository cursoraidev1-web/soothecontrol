"use client";

import type { GallerySection as GallerySectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T6Gallery({
  section,
  sectionIndex,
}: {
  section: GallerySectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const title = section.title || "Gallery";
  const images =
    section.images && section.images.length > 0
      ? section.images
      : [
          { url: "", alt: "A polished detail shot" },
          { url: "", alt: "Clean spacing and hierarchy" },
          { url: "", alt: "Modern bento layout" },
          { url: "", alt: "Elegant cards and type" },
        ];

  return (
    <section className="t6-section">
      <div className="t6-container">
        <span className="t6-eyebrow">Gallery</span>
        <EditableText
          as="h2"
          className="t6-title"
          value={title}
          placeholder="Gallery title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />

        <div className="t6-bento" style={{ marginTop: 18 }}>
          {images.map((it, idx) => (
            <div key={idx} className="t6-card" style={{ gridColumn: "span 6", overflow: "hidden" }}>
              <div
                style={{
                  height: 260,
                  background:
                    it.url ||
                    "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(96,165,250,0.14))",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {it.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.url}
                    alt={it.alt || "Gallery"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : null}
              </div>
              <div style={{ padding: 14 }}>
                <EditableText
                  as="div"
                  value={it.alt || ""}
                  placeholder="Alt/caption"
                  onCommit={(next) => {
                    if (!editor || sectionIndex == null) return;
                    const nextImages = images.map((x) => ({ ...x }));
                    nextImages[idx] = { ...nextImages[idx], alt: next };
                    editor.updateSection(sectionIndex, { ...section, images: nextImages });
                  }}
                  style={{ color: "var(--t6-muted)", fontWeight: 800 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

