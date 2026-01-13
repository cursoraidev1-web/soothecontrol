"use client";

import type { ValuesSection as ValuesSectionType } from "@/lib/pageSchema";
import {
  getLoremValueTitle,
  getLoremValueDesc,
} from "@/lib/loremIpsum";

interface ValuesSectionProps {
  section: ValuesSectionType;
}

export default function ValuesSection({ section }: ValuesSectionProps) {
  // Ensure at least 3 values for display
  const values = section.items && section.items.length > 0
    ? section.items
    : [
        { title: "", desc: "" },
        { title: "", desc: "" },
        { title: "", desc: "" },
      ];

  // Fill empty values with lorem ipsum
  const filledValues = values.map((value) => ({
    title: value.title || getLoremValueTitle(),
    desc: value.desc || getLoremValueDesc(),
  }));

  return (
    <section className="t1-section">
      <div className="t1-container">
        <span className="t1-label">Values</span>
        <h2 className="t1-section-heading">Our Core Values</h2>
        <div className="t1-values-grid">
          {filledValues.map((value, index) => (
            <div key={index} className="t1-value-card">
              <div className="t1-value-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="t1-value-title">{value.title}</h3>
              <p className="t1-value-desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
