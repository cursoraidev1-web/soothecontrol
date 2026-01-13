"use client";

import type { PageData } from "@/lib/pageSchema";
import HeroSection from "../components/HeroSection";
import RichTextSection from "../components/RichTextSection";
import ValuesSection from "../components/ValuesSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";

interface AboutUsPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    description: string | null;
  };
}

export default function AboutUsPage({ pageData, profile }: AboutUsPageProps) {
  // Filter out any undefined/null sections
  const validSections = (pageData.sections || []).filter(
    (section): section is NonNullable<typeof section> => section != null && section.type != null
  );

  return (
    <main>
      {validSections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return <HeroSection key={`${section.type}-${index}`} section={section} />;
          case "richtext":
            return <RichTextSection key={`${section.type}-${index}`} section={section} />;
          case "values":
            return <ValuesSection key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <GallerySection key={`${section.type}-${index}`} section={section} />;
          case "testimonials":
            return <TestimonialsSection key={`${section.type}-${index}`} section={section} />;
          case "faq":
            return <FAQSection key={`${section.type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
