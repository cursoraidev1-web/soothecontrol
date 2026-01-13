"use client";

import type { UseCasesSection as UseCasesSectionType } from "@/lib/pageSchema";
import {
  getLoremHeadline,
  getLoremParagraph,
  getLoremShortText,
} from "@/lib/loremIpsum";

interface UseCasesSectionProps {
  section: UseCasesSectionType;
}

export default function UseCasesSection({ section }: UseCasesSectionProps) {
  const title = section.title || "Use cases";
  const description = section.description || getLoremParagraph();
  
  // Ensure at least 1 use case item
  const items = section.items && section.items.length > 0
    ? section.items
    : [
        {
          title: "",
          description: "",
          linkText: "Learn more",
          linkHref: "#",
        },
      ];

  // Fill empty items with lorem ipsum
  const filledItems = items.map((item) => ({
    title: item.title || getLoremHeadline(),
    description: item.description || getLoremShortText(),
    linkText: item.linkText || "Learn more",
    linkHref: item.linkHref || "#",
  }));

  return (
    <section className="t1-section t1-bg-light">
      <div className="t1-container">
        {filledItems.map((item, index) => (
          <div key={index} className="t1-use-cases-grid" style={{ 
            marginBottom: index < filledItems.length - 1 ? "var(--spacing-6xl)" : 0 
          }}>
            <div className="t1-use-cases-text">
              <span className="t1-label">Use Cases</span>
              <h2 className="t1-section-heading" style={{ textAlign: "left", marginBottom: "var(--spacing-md)" }}>
                {title}
              </h2>
              <p style={{ 
                fontSize: "var(--font-size-lg)", 
                color: "var(--color-text-secondary)",
                lineHeight: 1.7,
                marginBottom: "var(--spacing-lg)"
              }}>
                {description}
              </p>
            </div>
            <div className="t1-use-case-card">
              <h3 style={{ 
                fontSize: "var(--font-size-2xl)", 
                fontWeight: "bold",
                color: "var(--color-text-primary)",
                marginBottom: "var(--spacing-md)"
              }}>
                {item.title}
              </h3>
              <p style={{ 
                fontSize: "var(--font-size-base)", 
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
                marginBottom: "var(--spacing-md)"
              }}>
                {item.description}
              </p>
              {item.linkText && item.linkHref && (
                <a 
                  href={item.linkHref} 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--spacing-xs)",
                    color: "var(--color-primary)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "600",
                    textDecoration: "none",
                    marginTop: "var(--spacing-md)"
                  }}
                >
                  {item.linkText}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              )}
              {/* Illustration placeholder */}
              <div style={{
                marginTop: "var(--spacing-xl)",
                width: "100%",
                height: "200px",
                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                borderRadius: "var(--radius-lg)",
                opacity: 0.1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.3, color: "var(--color-primary)" }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
