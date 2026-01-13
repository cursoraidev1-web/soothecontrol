"use client";

import { useEffect, useState, useRef } from "react";
import type { FeaturesSection as FeaturesSectionType } from "@/lib/pageSchema";
import { getIcon } from "@/lib/icons";

interface FeaturesSectionProps {
  section: FeaturesSectionType;
}

// Default features
const defaultFeatures = [
  {
    icon: "zap",
    title: "Lightning Fast",
    description: "Experience blazing fast performance that keeps you ahead of the competition.",
  },
  {
    icon: "shield",
    title: "Secure & Reliable",
    description: "Enterprise-grade security to keep your data safe and protected 24/7.",
  },
  {
    icon: "trending",
    title: "Scalable Growth",
    description: "Built to grow with your business, from startup to enterprise scale.",
  },
  {
    icon: "headphones",
    title: "24/7 Support",
    description: "Round-the-clock expert support to help you whenever you need it.",
  },
  {
    icon: "globe",
    title: "Global Reach",
    description: "Connect with customers worldwide through our global infrastructure.",
  },
  {
    icon: "sparkles",
    title: "Innovation First",
    description: "Cutting-edge technology and continuous improvements to stay ahead.",
  },
];

function FeatureCard({
  feature,
  index,
  isVisible,
}: {
  feature: typeof defaultFeatures[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="t1-feature-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
      }}
    >
      <div className="t1-feature-icon">
        {getIcon(feature.icon, 24)}
      </div>
      <h3 className="t1-feature-title">{feature.title}</h3>
      <p className="t1-feature-description">{feature.description}</p>
    </div>
  );
}

export default function FeaturesSection({ section }: FeaturesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features =
    section.items && section.items.length > 0 && section.items[0].title
      ? section.items
      : defaultFeatures;

  const columns = section.columns || 3;

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
    <section ref={sectionRef} className="t1-section t1-features-section">
      <div className="t1-container">
        {/* Section Header */}
        <div className="t1-features-header">
          {section.subtitle && (
            <span className="t1-label">{section.subtitle}</span>
          )}
          <h2 className="t1-section-title">
            {section.title || "Why Choose Us"}
          </h2>
        </div>

        {/* Features Grid */}
        <div 
          className="t1-features-grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
