"use client";

import { useEffect, useState, useRef } from "react";
import type { ValuesSection as ValuesSectionType } from "@/lib/pageSchema";
import {
  getLoremValueTitle,
  getLoremValueDesc,
} from "@/lib/loremIpsum";
import { getIcon, type IconName } from "@/lib/icons";

interface ValuesSectionProps {
  section: ValuesSectionType;
}

// Default icons for values
const defaultValueIcons: IconName[] = [
  "heart",
  "star",
  "shield",
  "target",
  "handshake",
  "eye",
];

// Default values
const defaultValues = [
  {
    title: "Customer First",
    desc: "We put our customers at the heart of everything we do, ensuring exceptional experiences.",
    icon: "heart",
  },
  {
    title: "Excellence",
    desc: "We strive for excellence in every project, delivering quality that exceeds expectations.",
    icon: "star",
  },
  {
    title: "Integrity",
    desc: "We operate with honesty and transparency, building trust through ethical practices.",
    icon: "shield",
  },
  {
    title: "Innovation",
    desc: "We embrace new ideas and technologies to deliver cutting-edge solutions.",
    icon: "lightbulb",
  },
];

function ValueCard({
  value,
  index,
  isVisible,
}: {
  value: { title: string; desc: string; icon?: string };
  index: number;
  isVisible: boolean;
}) {
  const iconName = value.icon || defaultValueIcons[index % defaultValueIcons.length];

  return (
    <div
      className="t1-value-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.95)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
      }}
    >
      <div className="t1-value-icon">
        {getIcon(iconName, 28)}
      </div>
      <h3 className="t1-value-title">{value.title}</h3>
      <p className="t1-value-desc">{value.desc}</p>
    </div>
  );
}

export default function ValuesSection({ section }: ValuesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = section.title || "What Drives Us";
  const subtitle = section.subtitle || "Our Values";

  // Fill empty values with defaults
  const values =
    section.items && section.items.length > 0 && section.items[0].title
      ? section.items.map((value, index) => ({
          title: value.title || getLoremValueTitle(),
          desc: value.desc || getLoremValueDesc(),
          icon: value.icon || defaultValueIcons[index % defaultValueIcons.length],
        }))
      : defaultValues;

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
    <section ref={sectionRef} className="t1-section t1-values-section">
      <div className="t1-container">
        <div className="t1-values-header">
          <span className="t1-label">{subtitle}</span>
          <h2 className="t1-section-heading">{title}</h2>
        </div>

        <div className="t1-values-grid">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              value={value}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
