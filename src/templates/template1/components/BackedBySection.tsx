"use client";

import type { BackedBySection as BackedBySectionType } from "@/lib/pageSchema";
import { getLoremSentence } from "@/lib/loremIpsum";

interface BackedBySectionProps {
  section: BackedBySectionType;
}

export default function BackedBySection({ section }: BackedBySectionProps) {
  const title = section.title || "Backed by the best companies and visionary angels";
  
  // Ensure at least 3 logos for display
  const logos = section.logos && section.logos.length > 0
    ? section.logos
    : [
        { name: "Company One", url: null },
        { name: "Company Two", url: null },
        { name: "Company Three", url: null },
      ];

  // Fill empty logos with lorem ipsum
  const filledLogos = logos.map((logo) => ({
    name: logo.name || "Partner Company",
    url: logo.url,
  }));

  return (
    <section className="t1-section">
      <div className="t1-container">
        <div style={{ 
          textAlign: "center", 
          marginBottom: "var(--spacing-2xl)",
          paddingTop: "var(--spacing-xl)",
          borderTop: "1px solid var(--color-border)"
        }}>
          <span className="t1-label" style={{ display: "block", marginBottom: "var(--spacing-md)" }}>
            Partners
          </span>
          <h2 className="t1-section-title" style={{ marginBottom: 0 }}>
            {title}
          </h2>
        </div>
        <div className="t1-backed-by-grid">
          {filledLogos.map((logo, index) => (
            <div key={index} className="t1-backed-by-logo">
              {logo.url ? (
                <img
                  src={logo.url}
                  alt={logo.name}
                  style={{ maxWidth: "100%", height: "auto", opacity: 0.7 }}
                />
              ) : (
                <div style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-text-secondary)",
                  textAlign: "center",
                  padding: "var(--spacing-md)",
                  opacity: 0.6
                }}>
                  {logo.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
