"use client";

import { useEffect, useState, useRef } from "react";
import type { TimelineSection as TimelineSectionType } from "@/lib/pageSchema";

interface TimelineSectionProps {
  section: TimelineSectionType;
}

// Default timeline items
const defaultTimelineItems = [
  {
    year: "2018",
    title: "Company Founded",
    description: "Started with a vision to transform the industry with innovative solutions.",
  },
  {
    year: "2019",
    title: "First Major Client",
    description: "Partnered with Fortune 500 companies, establishing our reputation for excellence.",
  },
  {
    year: "2021",
    title: "Team Expansion",
    description: "Grew to 50+ talented professionals, expanding our capabilities.",
  },
  {
    year: "2023",
    title: "Industry Recognition",
    description: "Received multiple awards for innovation and customer satisfaction.",
  },
  {
    year: "2024",
    title: "Global Reach",
    description: "Expanded operations to serve clients across 20+ countries.",
  },
];

function TimelineItem({
  item,
  index,
  isVisible,
}: {
  item: typeof defaultTimelineItems[0];
  index: number;
  isVisible: boolean;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`t1-timeline-item ${isEven ? "t1-timeline-item-left" : "t1-timeline-item-right"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateX(0)"
          : isEven
          ? "translateX(-50px)"
          : "translateX(50px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
      }}
    >
      {/* Content Card */}
      <div className="t1-timeline-card">
        <span className="t1-timeline-year">{item.year}</span>
        <h3 className="t1-timeline-title">{item.title}</h3>
        <p className="t1-timeline-description">{item.description}</p>
      </div>

      {/* Center Dot */}
      <div className="t1-timeline-dot">
        <div className="t1-timeline-dot-inner" />
      </div>
    </div>
  );
}

export default function TimelineSection({ section }: TimelineSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const items =
    section.items && section.items.length > 0 && section.items[0].title
      ? section.items
      : defaultTimelineItems;

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
    <section ref={sectionRef} className="t1-section t1-timeline-section">
      <div className="t1-container">
        {/* Section Header */}
        <div className="t1-timeline-header">
          {section.subtitle && (
            <span className="t1-label">{section.subtitle}</span>
          )}
          <h2 className="t1-section-title">
            {section.title || "Our Journey"}
          </h2>
        </div>

        {/* Timeline */}
        <div className="t1-timeline">
          {/* Center Line */}
          <div className="t1-timeline-line" />

          {/* Timeline Items */}
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
