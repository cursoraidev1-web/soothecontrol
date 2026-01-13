"use client";

import type { ContactBannerSection as ContactBannerSectionType } from "@/lib/pageSchema";
import Icon from "@/lib/icons";

interface ContactBannerSectionProps {
  section: ContactBannerSectionType;
}

export default function ContactBannerSection({ section }: ContactBannerSectionProps) {
  const headline = section.headline || "Ready to Get Started?";
  const subtext = section.subtext || "Contact us today and let's discuss how we can help you achieve your goals.";
  const ctaText = section.ctaText || "Contact Us";
  const ctaHref = section.ctaHref || "#contact";

  return (
    <section className="t1-contact-banner">
      {/* Background Decorations */}
      <div className="t1-contact-banner-bg">
        <div className="t1-contact-banner-orb t1-contact-banner-orb-1" />
        <div className="t1-contact-banner-orb t1-contact-banner-orb-2" />
        <div className="t1-contact-banner-orb t1-contact-banner-orb-3" />
        
        {/* Grid pattern overlay */}
        <div className="t1-contact-banner-grid" />
      </div>

      {/* Content */}
      <div className="t1-container">
        <div className="t1-contact-banner-content">
          <h1 className="t1-contact-banner-headline">{headline}</h1>
          <p className="t1-contact-banner-subtext">{subtext}</p>

          {/* Quick Contact Options */}
          <div className="t1-contact-banner-options">
            <a href={ctaHref} className="t1-contact-banner-cta">
              {ctaText}
              <Icon name="arrowRight" size={20} />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="t1-contact-banner-badges">
            <div className="t1-contact-badge">
              <Icon name="zap" size={16} />
              <span>Fast Response</span>
            </div>
            <div className="t1-contact-badge">
              <Icon name="shield" size={16} />
              <span>100% Secure</span>
            </div>
            <div className="t1-contact-badge">
              <Icon name="headphones" size={16} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
