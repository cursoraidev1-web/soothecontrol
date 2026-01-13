"use client";

import type { PageData } from "@/lib/pageSchema";
import HeroSection from "../components/HeroSection";
import ContactCardSection from "../components/ContactCardSection";
import RichTextSection from "../components/RichTextSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";
import ContactBannerSection from "../components/ContactBannerSection";
import MapSection from "../components/MapSection";
import HoursSection from "../components/HoursSection";

interface ContactUsPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}

export default function ContactUsPage({ pageData, profile }: ContactUsPageProps) {
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
          case "contact_card":
            return (
              <ContactCardSection
                key={`${section.type}-${index}`}
                section={section}
                profile={profile}
              />
            );
          case "richtext":
            return <RichTextSection key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <GallerySection key={`${section.type}-${index}`} section={section} />;
          case "testimonials":
            return <TestimonialsSection key={`${section.type}-${index}`} section={section} />;
          case "faq":
            return <FAQSection key={`${section.type}-${index}`} section={section} />;
          case "contact_banner":
            return <ContactBannerSection key={`${section.type}-${index}`} section={section} />;
          case "map":
            return <MapSection key={`${section.type}-${index}`} section={section} address={profile.address} />;
          case "hours":
            return <HoursSection key={`${section.type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
