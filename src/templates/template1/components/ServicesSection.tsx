"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import {
  getLoremServiceTitle,
  getLoremServiceDesc,
} from "@/lib/loremIpsum";

interface ServicesSectionProps {
  section: ServicesSectionType;
}

export default function ServicesSection({ section }: ServicesSectionProps) {
  // Ensure at least 3 services for display
  const services = section.items && section.items.length > 0
    ? section.items
    : [
        { title: "", desc: "" },
        { title: "", desc: "" },
        { title: "", desc: "" },
      ];

  // Fill empty services with lorem ipsum
  const filledServices = services.map((service) => ({
    title: service.title || getLoremServiceTitle(),
    desc: service.desc || getLoremServiceDesc(),
  }));

  const icons = [
    <path key="0" d="M12 2L2 7l10 5 10-5-10-5z" />,
    <path key="1" d="M2 17l10 5 10-5" />,
    <path key="2" d="M2 12l10 5 10-5" />,
  ];

  return (
    <section className="t1-section t1-bg-light">
      <div className="t1-container">
        <span className="t1-label">Services</span>
        <h2 className="t1-section-heading">What We Offer</h2>
        <div className="t1-services-grid">
          {filledServices.map((service, index) => (
            <div key={index} className="t1-service-card">
              <div className="t1-service-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {icons[index % icons.length]}
                </svg>
              </div>
              <h3 className="t1-service-title">{service.title}</h3>
              <p className="t1-service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
