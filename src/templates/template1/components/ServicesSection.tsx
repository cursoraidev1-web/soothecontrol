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
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Our Expertise
          </span>
          <h2 className="t1-section-heading">What We Offer</h2>
          <p className="t1-section-subheading mt-4">
            Comprehensive solutions tailored to your specific needs and challenges.
          </p>
        </div>
        
        <div className="t1-services-grid">
          {filledServices.map((service, index) => (
            <div key={index} className="t1-service-card group">
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
              <h3 className="t1-service-title group-hover:text-indigo-600 transition-colors">
                {service.title}
              </h3>
              <p className="t1-service-desc">{service.desc}</p>
              
              <div className="mt-6 flex items-center text-sm font-medium text-indigo-600 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Learn more
                <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
