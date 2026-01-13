"use client";

import type { GallerySection as GallerySectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T4Gallery({
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
    <section className="t4-section">
      <div className="t4-container">
        <span className="t4-eyebrow">Gallery</span>
        <EditableText
          as="h2"
          className="t4-title"
          value={title}
          placeholder="Gallery title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <p className="t4-sub">Add real photos for instant credibility.</p>

        <div className="t4-bento" style={{ marginTop: 18 }}>
          {images.map((it, idx) => (
            <div key={idx} className="t4-card" style={{ gridColumn: "span 6", overflow: "hidden" }}>
              <div
                style={{
                  height: 260,
                  background:
                    it.url ||
                    "linear-gradient(135deg, rgba(124,58,237,0.20), rgba(6,182,212,0.14))",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {it.url ? (
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
                  style={{ color: "var(--t4-muted)", fontWeight: 800 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

