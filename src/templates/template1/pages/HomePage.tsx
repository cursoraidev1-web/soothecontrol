"use client";

import type { PageData } from "@/lib/pageSchema";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import RichTextSection from "../components/RichTextSection";
import ValuesSection from "../components/ValuesSection";
import ContactCardSection from "../components/ContactCardSection";
import BackedBySection from "../components/BackedBySection";
import UseCasesSection from "../components/UseCasesSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";

interface HomePageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}

export default function HomePage({ pageData, profile }: HomePageProps) {
  // Filter out any undefined/null sections
  const validSections = (pageData.sections || []).filter(
    (section): section is NonNullable<typeof section> => section != null
  );

  return (
    <main>
      {validSections.map((section, index) => {
        if (!section || !section.type) {
          return null;
        }
        switch (section.type) {
          case "hero":
            return (
              <HeroSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "services":
            return (
              <ServicesSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "richtext":
            return (
              <RichTextSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "values":
            return (
              <ValuesSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "contact_card":
            return (
              <ContactCardSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                profile={profile}
              />
            );
          case "backed_by":
            return (
              <BackedBySection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "use_cases":
            return (
              <UseCasesSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "gallery":
            return (
              <GallerySection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "testimonials":
            return (
              <TestimonialsSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "faq":
            return (
              <FAQSection
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          default:
            return null;
        }
      })}
      
      {/* Final CTA Section */}
      <section className="t1-cta-section">
        <div className="t1-container">
          <h2 className="t1-cta-heading">Ready to Get Started?</h2>
          <p className="t1-cta-subtext">
            Let's work together to achieve your goals. Contact us today to learn more about our services.
          </p>
          <a href="#contact" className="t1-cta-button">
            Contact Us Now
          </a>
        </div>
      </section>
    </main>
  );
}
