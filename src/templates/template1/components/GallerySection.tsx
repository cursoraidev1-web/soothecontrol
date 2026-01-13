"use client";

import type { GallerySection as GallerySectionType } from "@/lib/pageSchema";
import { getLoremHeadline } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface GallerySectionProps {
  section: GallerySectionType;
  sectionIndex?: number;
}

export default function GallerySection({ section, sectionIndex }: GallerySectionProps) {
  const editor = useInlineEditor();
  const title = section.title || getLoremHeadline();
  
  // Ensure at least 6 images for display
  const images = section.images && section.images.length > 0
    ? section.images
    : Array.from({ length: 6 }, (_, i) => ({
        url: `https://via.placeholder.com/400x300?text=Image+${i + 1}`,
        alt: `Gallery Image ${i + 1}`,
      }));

  // Fill empty images with placeholder
  const filledImages = images.map((img, index) => ({
    url: img.url || `https://via.placeholder.com/400x300?text=Image+${index + 1}`,
    alt: img.alt || `Gallery Image ${index + 1}`,
  }));

  return (
    <section className="t1-section">
      <div className="t1-container">
        <span className="t1-label" style={{ display: "block", textAlign: "center", marginBottom: "var(--spacing-sm)" }}>
          Gallery
        </span>
        <EditableText
          as="h2"
          className="t1-section-title"
          value={title}
          placeholder="Gallery title"
          style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <div className="t1-gallery-grid">
          {filledImages.map((image, index) => (
            <div key={index} className="t1-gallery-item">
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "var(--radius-md)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
