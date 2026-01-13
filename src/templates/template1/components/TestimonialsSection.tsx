"use client";

import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph, getLoremSentence } from "@/lib/loremIpsum";

interface TestimonialsSectionProps {
  section: TestimonialsSectionType;
}

export default function TestimonialsSection({ section }: TestimonialsSectionProps) {
  const title = section.title || getLoremHeadline();
  
  // Ensure at least 3 testimonials for display
  const testimonials = section.items && section.items.length > 0
    ? section.items
    : [
        {
          name: "John Doe",
          role: "CEO",
          quote: getLoremParagraph(),
          company: "Company Inc.",
        },
        {
          name: "Jane Smith",
          role: "Director",
          quote: getLoremParagraph(),
          company: "Business Corp.",
        },
        {
          name: "Mike Johnson",
          role: "Founder",
          quote: getLoremParagraph(),
          company: "Startup Ltd.",
        },
      ];

  // Fill empty testimonials with lorem ipsum
  const filledTestimonials = testimonials.map((testimonial) => ({
    name: testimonial.name || "Customer Name",
    role: testimonial.role || "Role",
    quote: testimonial.quote || getLoremSentence(),
    company: testimonial.company || "Company",
  }));

  return (
    <section className="t1-section" style={{ backgroundColor: "var(--color-bg-light)" }}>
      <div className="t1-container">
        <span className="t1-label" style={{ display: "block", textAlign: "center", marginBottom: "var(--spacing-sm)" }}>
          Testimonials
        </span>
        <h2 className="t1-section-title" style={{ textAlign: "center", marginBottom: "var(--spacing-2xl)" }}>
          {title}
        </h2>
        <div className="t1-testimonials-grid">
          {filledTestimonials.map((testimonial, index) => (
            <div key={index} className="t1-testimonial-card">
              <div className="t1-testimonial-quote">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginBottom: "var(--spacing-md)", opacity: 0.3 }}
                >
                  <path
                    d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.433.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z"
                    fill="currentColor"
                  />
                </svg>
                <p style={{ 
                  fontSize: "var(--font-size-base)", 
                  lineHeight: 1.7,
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--spacing-md)",
                  fontStyle: "italic"
                }}>
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="t1-testimonial-author">
                <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                  {testimonial.name}
                </div>
                <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)" }}>
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
