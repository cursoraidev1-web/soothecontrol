"use client";

import { useEffect, useState, useRef } from "react";
import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import Icon from "@/lib/icons";

interface TestimonialsSectionProps {
  section: TestimonialsSectionType;
}

// Default testimonials with avatars and ratings
const defaultTestimonials = [
  {
    name: "Sarah Mitchell",
    role: "CEO",
    quote: "Absolutely incredible service! They exceeded all our expectations and delivered results that transformed our business. Highly recommend to anyone looking for excellence.",
    company: "TechVentures Inc.",
    avatar: "",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Marketing Director",
    quote: "Working with this team has been a game-changer. Their attention to detail and creative solutions helped us achieve our goals faster than we imagined.",
    company: "Global Solutions",
    avatar: "",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder",
    quote: "Professional, responsive, and incredibly talented. They took our vision and brought it to life in ways we never thought possible. A truly exceptional experience.",
    company: "StartupHub",
    avatar: "",
    rating: 5,
  },
];

// Generate avatar color from name
function getAvatarColor(name: string): string {
  const colors = [
    "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  ];
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
}

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="t1-testimonial-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={star <= rating ? "t1-star-filled" : "t1-star-empty"}
        >
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
  isVisible,
}: {
  testimonial: typeof defaultTestimonials[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="t1-testimonial-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
      }}
    >
      {/* Quote Icon */}
      <div className="t1-testimonial-quote-icon">
        <Icon name="quote" size={24} />
      </div>

      {/* Rating */}
      <StarRating rating={testimonial.rating || 5} />

      {/* Quote */}
      <p className="t1-testimonial-text">"{testimonial.quote}"</p>

      {/* Author */}
      <div className="t1-testimonial-author">
        {/* Avatar */}
        <div className="t1-testimonial-avatar-wrapper">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="t1-testimonial-avatar"
            />
          ) : (
            <div
              className="t1-testimonial-avatar t1-testimonial-avatar-placeholder"
              style={{ background: getAvatarColor(testimonial.name) }}
            >
              {getInitials(testimonial.name)}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="t1-testimonial-author-info">
          <div className="t1-testimonial-name">{testimonial.name}</div>
          <div className="t1-testimonial-role">
            {testimonial.role}
            {testimonial.company && <span> at {testimonial.company}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection({ section }: TestimonialsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const title = section.title || getLoremHeadline();
  const subtitle = section.subtitle || "What our clients say";

  const testimonials =
    section.items && section.items.length > 0 && section.items[0].name
      ? section.items.map((t) => ({
          ...t,
          quote: t.quote || getLoremParagraph(),
          rating: t.rating || 5,
        }))
      : defaultTestimonials;

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
    <section ref={sectionRef} className="t1-section t1-testimonials-section">
      <div className="t1-container">
        <div className="t1-testimonials-header">
          <span className="t1-label">{subtitle}</span>
          <h2 className="t1-section-title">{title}</h2>
        </div>

        <div className="t1-testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
