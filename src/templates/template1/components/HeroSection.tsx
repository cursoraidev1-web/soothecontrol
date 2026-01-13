"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import {
  getLoremHeadline,
  getLoremParagraph,
} from "@/lib/loremIpsum";

interface HeroSectionProps {
  section: HeroSectionType;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get Started";
  const ctaHref = section.ctaHref || "#";

  return (
    <section className="t1-hero t1-fade-in">
      <div className="t1-hero-content">
        <h1 className="t1-hero-headline">{headline}</h1>
        <p className="t1-hero-subtext">{subtext}</p>
        {ctaText && ctaHref && (
          <a href={ctaHref} className="t1-hero-cta">
            {ctaText}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "8px" }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
