"use client";

import { useEffect, useState, useRef } from "react";
import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import {
  getLoremServiceTitle,
  getLoremServiceDesc,
} from "@/lib/loremIpsum";
import { getIcon, type IconName } from "@/lib/icons";

interface ServicesSectionProps {
  section: ServicesSectionType;
}

// Default icons for services
const defaultServiceIcons: IconName[] = [
  "sparkles",
  "rocket",
  "shield",
  "chart",
  "globe",
  "zap",
  "lightbulb",
  "target",
  "layers",
];

// Default services with icons
const defaultServices = [
  {
    title: "Strategic Consulting",
    desc: "Expert guidance to help you navigate complex challenges and achieve your business goals.",
    icon: "lightbulb",
  },
  {
    title: "Digital Solutions",
    desc: "Cutting-edge technology solutions designed to streamline operations and boost efficiency.",
    icon: "rocket",
  },
  {
    title: "Growth Marketing",
    desc: "Data-driven marketing strategies that deliver measurable results and sustainable growth.",
    icon: "chart",
  },
];

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; desc: string; icon?: string };
  index: number;
  isVisible: boolean;
}) {
  const iconName = service.icon || defaultServiceIcons[index % defaultServiceIcons.length];

  return (
    <div
      className="t1-service-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
      }}
    >
      {/* Service Number Badge */}
      <div className="t1-service-number">{String(index + 1).padStart(2, "0")}</div>

      {/* Icon */}
      <div className="t1-service-icon">
        {getIcon(iconName, 28)}
      </div>

      {/* Content */}
      <h3 className="t1-service-title">{service.title}</h3>
      <p className="t1-service-desc">{service.desc}</p>

      {/* Learn More Link */}
      <a href="#" className="t1-service-link">
        Learn more
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function ServicesSection({ section }: ServicesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = section.title || "What We Offer";
  const subtitle = section.subtitle || "Services";

  // Fill empty services with defaults
  const services =
    section.items && section.items.length > 0 && section.items[0].title
      ? section.items.map((service, index) => ({
          title: service.title || getLoremServiceTitle(),
          desc: service.desc || getLoremServiceDesc(),
          icon: service.icon || defaultServiceIcons[index % defaultServiceIcons.length],
        }))
      : defaultServices;

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
    <section ref={sectionRef} className="t1-section t1-services-section t1-bg-light">
      <div className="t1-container">
        <div className="t1-services-header">
          <span className="t1-label">{subtitle}</span>
          <h2 className="t1-section-heading">{title}</h2>
        </div>

        <div className="t1-services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
