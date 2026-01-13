"use client";

import { useEffect, useState, useRef } from "react";
import type { ProcessSection as ProcessSectionType } from "@/lib/pageSchema";
import { getIcon } from "@/lib/icons";

interface ProcessSectionProps {
  section: ProcessSectionType;
}

// Default process steps
const defaultSteps = [
  {
    title: "Discovery",
    description: "We start by understanding your needs, goals, and vision through an in-depth consultation.",
    icon: "clipboard",
  },
  {
    title: "Strategy",
    description: "Our team develops a customized plan tailored to your specific requirements and timeline.",
    icon: "lightbulb",
  },
  {
    title: "Execution",
    description: "We bring your vision to life with precision, keeping you informed every step of the way.",
    icon: "rocket",
  },
  {
    title: "Delivery",
    description: "Your project is delivered on time, with ongoing support to ensure complete satisfaction.",
    icon: "checkCircle",
  },
];

function ProcessStep({
  step,
  index,
  total,
  isVisible,
}: {
  step: typeof defaultSteps[0];
  index: number;
  total: number;
  isVisible: boolean;
}) {
  const isLast = index === total - 1;

  return (
    <div
      className="t1-process-step"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
      }}
    >
      {/* Step Number & Icon */}
      <div className="t1-process-icon-wrapper">
        <div className="t1-process-number">{String(index + 1).padStart(2, "0")}</div>
        <div className="t1-process-icon">
          {getIcon(step.icon, 28)}
        </div>
        {/* Connector Line */}
        {!isLast && <div className="t1-process-connector" />}
      </div>

      {/* Content */}
      <div className="t1-process-content">
        <h3 className="t1-process-title">{step.title}</h3>
        <p className="t1-process-description">{step.description}</p>
      </div>
    </div>
  );
}

export default function ProcessSection({ section }: ProcessSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const steps =
    section.steps && section.steps.length > 0 && section.steps[0].title
      ? section.steps
      : defaultSteps;

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
    <section ref={sectionRef} className="t1-section t1-process-section">
      {/* Background Decoration */}
      <div className="t1-process-bg">
        <div className="t1-process-bg-gradient" />
      </div>

      <div className="t1-container">
        {/* Section Header */}
        <div className="t1-process-header">
          {section.subtitle && (
            <span className="t1-label">{section.subtitle}</span>
          )}
          <h2 className="t1-section-title">
            {section.title || "How It Works"}
          </h2>
        </div>

        {/* Process Steps */}
        <div className="t1-process-grid">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              step={step}
              index={index}
              total={steps.length}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
