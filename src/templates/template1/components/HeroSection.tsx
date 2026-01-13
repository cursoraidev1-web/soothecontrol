"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import {
  getLoremHeadline,
  getLoremParagraph,
} from "@/lib/loremIpsum";
import Icon from "@/lib/icons";

interface HeroSectionProps {
  section: HeroSectionType;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get Started";
  const ctaHref = section.ctaHref || "#";
  const showTrustBadges = section.showTrustBadges !== false;

  return (
    <section className="t1-hero">
      {/* Floating Decorative Elements */}
      <div className="t1-hero-decorations">
        <div className="t1-hero-orb t1-hero-orb-1" />
        <div className="t1-hero-orb t1-hero-orb-2" />
        <div className="t1-hero-orb t1-hero-orb-3" />
        
        {/* Floating shapes */}
        <div className="t1-hero-shape t1-hero-shape-1">
          <Icon name="star" size={24} />
        </div>
        <div className="t1-hero-shape t1-hero-shape-2">
          <Icon name="sparkles" size={20} />
        </div>
        <div className="t1-hero-shape t1-hero-shape-3">
          <Icon name="zap" size={18} />
        </div>
        
        {/* Grid pattern */}
        <div className="t1-hero-grid" />
      </div>

      {/* Content */}
      <div className="t1-hero-content">
        {/* Badge */}
        <div className="t1-hero-badge">
          <span className="t1-hero-badge-dot" />
          <span>Trusted by 500+ businesses worldwide</span>
        </div>

        <h1 className="t1-hero-headline">{headline}</h1>
        <p className="t1-hero-subtext">{subtext}</p>

        {/* CTA Buttons */}
        <div className="t1-hero-cta-group">
          {ctaText && ctaHref && (
            <a href={ctaHref} className="t1-hero-cta t1-hero-cta-primary">
              {ctaText}
              <Icon name="arrowRight" size={18} />
            </a>
          )}
          <a href="#contact" className="t1-hero-cta t1-hero-cta-secondary">
            Learn More
          </a>
        </div>

        {/* Trust Badges */}
        {showTrustBadges && (
          <div className="t1-hero-trust">
            <div className="t1-hero-trust-item">
              <Icon name="shield" size={18} />
              <span>Secure</span>
            </div>
            <div className="t1-hero-trust-item">
              <Icon name="zap" size={18} />
              <span>Fast</span>
            </div>
            <div className="t1-hero-trust-item">
              <Icon name="headphones" size={18} />
              <span>24/7 Support</span>
            </div>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="t1-hero-scroll">
        <div className="t1-hero-scroll-mouse">
          <div className="t1-hero-scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
