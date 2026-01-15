"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GallerySection, HeroSection as HeroSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

type Slide = { url: string; alt: string };

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

export default function T6HeroSlider({
  section,
  sectionIndex,
  businessName,
  gallery,
}: {
  section: HeroSectionType;
  sectionIndex?: number;
  businessName: string;
  gallery: GallerySection | null;
}) {
  const editor = useInlineEditor();
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get a quote";
  const ctaHref = section.ctaHref || "#contact";

  const slides: Slide[] = useMemo(() => {
    const fromGallery =
      gallery?.images?.filter((i) => (i.url || "").trim().length > 0).map((i) => ({
        url: i.url,
        alt: i.alt || businessName,
      })) ?? [];
    if (fromGallery.length >= 2) return fromGallery;

    // Fallback demo slides (works without adding fields to schema).
    return [
      {
        url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
        alt: "Team collaboration",
      },
      {
        url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
        alt: "Strategy session",
      },
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
        alt: "Working together",
      },
    ];
  }, [gallery?.images, businessName]);

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (isPaused) return;
    const t = window.setInterval(() => {
      setActive((v) => clampIndex(v + 1, slides.length));
    }, 4500);
    return () => window.clearInterval(t);
  }, [slides.length, isPaused]);

  const prev = () => setActive((v) => clampIndex(v - 1, slides.length));
  const next = () => setActive((v) => clampIndex(v + 1, slides.length));

  return (
    <section className="t6-hero">
      <div className="t6-container">
        <div className="t6-grid">
          <div>
            <span className="t6-eyebrow">Featured work</span>
            <EditableText
              as="h1"
              className="t6-h1"
              value={headline}
              placeholder="Hero headline"
              multiline
              onCommit={(nextText) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, headline: nextText });
              }}
            />
            <EditableText
              as="p"
              className="t6-lead"
              value={subtext}
              placeholder="Hero subtext"
              multiline
              onCommit={(nextText) => {
                if (!editor || sectionIndex == null) return;
                editor.updateSection(sectionIndex, { ...section, subtext: nextText });
              }}
            />

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <a className="t6-cta" href={ctaHref}>
                <EditableText
                  as="span"
                  value={ctaText}
                  placeholder="CTA"
                  onCommit={(nextText) => {
                    if (!editor || sectionIndex == null) return;
                    editor.updateSection(sectionIndex, { ...section, ctaText: nextText });
                  }}
                />
              </a>
              <a
                href="#services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 999,
                  padding: "10px 14px",
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                  textDecoration: "none",
                  fontWeight: 900,
                  fontSize: 14,
                  color: "var(--t6-ink)",
                }}
              >
                View services
              </a>
            </div>

            <div style={{ marginTop: 12, color: "var(--t6-muted)", fontWeight: 800, fontSize: 13 }}>
              Tip: add images in the Gallery section to power this slider.
            </div>
          </div>

          <div className="t6-card" style={{ padding: 16 }}>
            <div
              className="t6-slider"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX ?? null;
              }}
              onTouchEnd={(e) => {
                const start = touchStartX.current;
                const end = e.changedTouches[0]?.clientX ?? null;
                touchStartX.current = null;
                if (start == null || end == null) return;
                const dx = end - start;
                if (Math.abs(dx) < 40) return;
                if (dx > 0) prev();
                else next();
              }}
            >
              {slides.map((s, idx) => (
                <div key={`${s.url}-${idx}`} className={`t6-slide ${idx === active ? "is-active" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="t6-slide-media" src={s.url} alt={s.alt} loading={idx === active ? "eager" : "lazy"} />
                  <div className="t6-slide-overlay" />
                </div>
              ))}

              <div className="t6-slider-controls">
                <div className="t6-dots" aria-label="Slides">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`t6-dot ${i === active ? "is-active" : ""}`}
                      onClick={() => setActive(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" className="t6-arrow" onClick={prev} aria-label="Previous slide">
                    ‹
                  </button>
                  <button type="button" className="t6-arrow" onClick={next} aria-label="Next slide">
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

