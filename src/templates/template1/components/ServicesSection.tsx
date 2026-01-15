"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import {
  getLoremServiceTitle,
  getLoremServiceDesc,
} from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface ServicesSectionProps {
  section: ServicesSectionType;
  sectionIndex?: number;
}

export default function ServicesSection({ section, sectionIndex }: ServicesSectionProps) {
  const editor = useInlineEditor();
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
              <EditableText
                as="h3"
                className="t1-service-title"
                value={service.title}
                placeholder="Service title"
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = [...services].map((it) => ({ ...it }));
                  nextItems[index] = { ...nextItems[index], title: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              <EditableText
                as="p"
                className="t1-service-desc"
                value={service.desc}
                placeholder="Service description"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = [...services].map((it) => ({ ...it }));
                  nextItems[index] = { ...nextItems[index], desc: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
