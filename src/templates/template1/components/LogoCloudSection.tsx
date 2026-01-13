"use client";

import { useEffect, useState, useRef } from "react";
import type { LogoCloudSection as LogoCloudSectionType } from "@/lib/pageSchema";

interface LogoCloudSectionProps {
  section: LogoCloudSectionType;
}

// Default company names for placeholder
const defaultLogos = [
  { name: "Acme Corp", image: "" },
  { name: "TechFlow", image: "" },
  { name: "Innovate", image: "" },
  { name: "GlobalSync", image: "" },
  { name: "DataPro", image: "" },
  { name: "CloudBase", image: "" },
];

// Generate consistent gradient for placeholder logos
function getLogoGradient(name: string): string {
  const gradients = [
    "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  ];
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[index % gradients.length];
}

function LogoItem({
  logo,
  index,
  isVisible,
}: {
  logo: typeof defaultLogos[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="t1-logo-cloud-item"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
      }}
    >
      {logo.image ? (
        <img
          src={logo.image}
          alt={logo.name}
          className="t1-logo-cloud-image"
        />
      ) : (
        <div 
          className="t1-logo-cloud-placeholder"
          style={{ background: getLogoGradient(logo.name) }}
        >
          <span className="t1-logo-cloud-name">{logo.name}</span>
        </div>
      )}
    </div>
  );
}

export default function LogoCloudSection({ section }: LogoCloudSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const logos =
    section.logos && section.logos.length > 0 && section.logos[0].name
      ? section.logos
      : defaultLogos;

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
    <section ref={sectionRef} className="t1-logo-cloud-section">
      <div className="t1-container">
        {section.title && (
          <p className="t1-logo-cloud-title">{section.title}</p>
        )}

        <div className="t1-logo-cloud-grid">
          {logos.map((logo, index) => (
            <LogoItem
              key={index}
              logo={logo}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
