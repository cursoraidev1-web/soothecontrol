"use client";

import type { CTABannerSection as CTABannerSectionType } from "@/lib/pageSchema";
import Icon from "@/lib/icons";

interface CTABannerSectionProps {
  section: CTABannerSectionType;
}

export default function CTABannerSection({ section }: CTABannerSectionProps) {
  const style = section.style || "gradient";

  return (
    <section className={`t1-cta-banner-section t1-cta-banner-${style}`}>
      {/* Background Decorations */}
      <div className="t1-cta-banner-bg">
        <div className="t1-cta-banner-shape t1-cta-banner-shape-1" />
        <div className="t1-cta-banner-shape t1-cta-banner-shape-2" />
      </div>

      <div className="t1-container">
        <div className="t1-cta-banner-content">
          <h2 className="t1-cta-banner-headline">
            {section.headline || "Ready to Transform Your Business?"}
          </h2>
          {section.subtext && (
            <p className="t1-cta-banner-subtext">{section.subtext}</p>
          )}

          <div className="t1-cta-banner-buttons">
            <a 
              href={section.primaryCTA?.href || "#"} 
              className="t1-cta-banner-btn t1-cta-banner-btn-primary"
            >
              {section.primaryCTA?.text || "Get Started"}
              <Icon name="arrowRight" size={18} />
            </a>
            {section.secondaryCTA && (
              <a 
                href={section.secondaryCTA.href} 
                className="t1-cta-banner-btn t1-cta-banner-btn-secondary"
              >
                {section.secondaryCTA.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
