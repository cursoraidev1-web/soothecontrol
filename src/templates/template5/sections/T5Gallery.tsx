"use client";

import type { GallerySection as GallerySectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T5Gallery({
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
          { url: "", alt: "" },
          { url: "", alt: "" },
          { url: "", alt: "" },
          { url: "", alt: "" },
        ];

  return (
    <section className="t5-section">
      <div className="t5-container">
        <span className="t5-eyebrow">Gallery</span>
        <EditableText
          as="h2"
          className="t5-title"
          value={title}
          placeholder="Gallery title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <p className="t5-sub">Add real photos for instant credibility.</p>

        <div className="t5-bento" style={{ marginTop: 18 }}>
          {images.map((it, idx) => (
            <div key={idx} className="t5-card" style={{ gridColumn: "span 6", overflow: "hidden" }}>
              <div
                style={{
                  height: 260,
                  background:
                    it.url ||
                    "linear-gradient(135deg, rgb(var(--t5-accent-rgb) / 0.16), rgb(var(--t5-accent2-rgb) / 0.12))",
                  borderBottom: "1px solid rgba(11,18,32,0.10)",
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
                  style={{ color: "var(--t5-muted)", fontWeight: 800 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

