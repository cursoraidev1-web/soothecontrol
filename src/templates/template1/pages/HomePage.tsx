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
import StatsSection from "../components/StatsSection";
import ProcessSection from "../components/ProcessSection";
import FeaturesSection from "../components/FeaturesSection";
import CTABannerSection from "../components/CTABannerSection";
import LogoCloudSection from "../components/LogoCloudSection";

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
            return <HeroSection key={`${section.type}-${index}`} section={section} />;
          case "services":
            return <ServicesSection key={`${section.type}-${index}`} section={section} />;
          case "richtext":
            return <RichTextSection key={`${section.type}-${index}`} section={section} />;
          case "values":
            return <ValuesSection key={`${section.type}-${index}`} section={section} />;
          case "contact_card":
            return (
              <ContactCardSection
                key={`${section.type}-${index}`}
                section={section}
                profile={profile}
              />
            );
          case "backed_by":
            return <BackedBySection key={`${section.type}-${index}`} section={section} />;
          case "use_cases":
            return <UseCasesSection key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <GallerySection key={`${section.type}-${index}`} section={section} />;
          case "testimonials":
            return <TestimonialsSection key={`${section.type}-${index}`} section={section} />;
          case "faq":
            return <FAQSection key={`${section.type}-${index}`} section={section} />;
          case "stats":
            return <StatsSection key={`${section.type}-${index}`} section={section} />;
          case "process":
            return <ProcessSection key={`${section.type}-${index}`} section={section} />;
          case "features":
            return <FeaturesSection key={`${section.type}-${index}`} section={section} />;
          case "cta_banner":
            return <CTABannerSection key={`${section.type}-${index}`} section={section} />;
          case "logo_cloud":
            return <LogoCloudSection key={`${section.type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
