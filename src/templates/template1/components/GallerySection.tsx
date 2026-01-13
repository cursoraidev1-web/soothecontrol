"use client";

import { useEffect, useState, useRef } from "react";
import type { GallerySection as GallerySectionType } from "@/lib/pageSchema";
import { getLoremHeadline } from "@/lib/loremIpsum";
import Icon from "@/lib/icons";

interface GallerySectionProps {
  section: GallerySectionType;
}

// Generate placeholder gradient colors
function getPlaceholderGradient(index: number): string {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];
  return gradients[index % gradients.length];
}

function GalleryItem({
  image,
  index,
  isVisible,
}: {
  image: { url: string; alt: string; caption?: string };
  index: number;
  isVisible: boolean;
}) {
  const hasImage = image.url && !image.url.includes("placeholder");

  return (
    <div
      className="t1-gallery-item"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.9)",
        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`,
      }}
    >
      {hasImage ? (
        <img
          src={image.url}
          alt={image.alt}
          loading="lazy"
          className="t1-gallery-image"
        />
      ) : (
        <div
          className="t1-gallery-placeholder"
          style={{ background: getPlaceholderGradient(index) }}
        >
          <div className="t1-gallery-placeholder-icon">
            <Icon name="image" size={32} />
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="t1-gallery-overlay">
        <div className="t1-gallery-overlay-content">
          <Icon name="eye" size={24} />
          {image.caption && (
            <span className="t1-gallery-caption">{image.caption}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GallerySection({ section }: GallerySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = section.title || getLoremHeadline();
  const subtitle = section.subtitle || "Gallery";

  // Ensure at least 6 images for display
  const images =
    section.images && section.images.length > 0
      ? section.images.map((img, index) => ({
          url: img.url || "",
          alt: img.alt || `Gallery Image ${index + 1}`,
          caption: img.caption,
        }))
      : Array.from({ length: 6 }, (_, i) => ({
          url: "",
          alt: `Gallery Image ${i + 1}`,
          caption: `Project ${i + 1}`,
        }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="t1-section t1-gallery-section">
      <div className="t1-container">
        <div className="t1-gallery-header">
          <span className="t1-label">{subtitle}</span>
          <h2 className="t1-section-title">{title}</h2>
        </div>

        <div className="t1-gallery-grid">
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              image={image}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
