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
    <section className="t1-section relative overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-indigo-100/50 blur-[80px]" />
        <div className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-purple-100/50 blur-[80px]" />
      </div>

      <div className="t1-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Testimonials
          </span>
          <h2 className="t1-section-heading">
            {title}
          </h2>
        </div>
        
        <div className="t1-testimonials-grid">
          {filledTestimonials.map((testimonial, index) => (
            <div key={index} className="t1-testimonial-card group bg-white/80 backdrop-blur-sm border border-slate-100 hover:border-indigo-100">
              <div className="absolute -top-6 -left-4 text-8xl text-indigo-100 font-serif leading-none select-none group-hover:text-indigo-200 transition-colors duration-300">
                &ldquo;
              </div>
              
              <div className="relative z-10">
                <p className="text-lg text-slate-700 italic mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">
                      {testimonial.name}
                    </span>
                    <span className="text-sm text-slate-500">
                      {testimonial.role}
                      {testimonial.company && <span className="text-indigo-500"> @ {testimonial.company}</span>}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
