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
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-violet-600 uppercase bg-violet-50 rounded-full">
            Our Culture
          </span>
          <h2 className="t1-section-heading">Our Core Values</h2>
          <p className="t1-section-subheading mt-4">
            The principles that guide every decision we make.
          </p>
        </div>

        <div className="t1-values-grid">
          {filledValues.map((value, index) => (
            <div key={index} className="t1-value-card group hover:bg-white hover:border-violet-100 border border-transparent">
              <div className="t1-value-icon mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-200 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative z-10"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
              <h3 className="t1-value-title mb-3">{value.title}</h3>
              <p className="t1-value-desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
