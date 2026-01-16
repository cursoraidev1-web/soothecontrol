"use client";

import type { GallerySection, PageData } from "@/lib/pageSchema";
import T6HeroSlider from "../sections/T6HeroSlider";
import T6Services from "../sections/T6Services";
import T6Values from "../sections/T6Values";
import T6BackedBy from "../sections/T6BackedBy";
import T6UseCases from "../sections/T6UseCases";
import T6Testimonials from "../sections/T6Testimonials";
import T6FAQ from "../sections/T6FAQ";
import T6Team from "../sections/T6Team";
import T6Gallery from "../sections/T6Gallery";
import T6RichText from "../sections/T6RichText";
import T6ContactCard from "../sections/T6ContactCard";

export default function T6HomePage({
  pageData,
  profile,
}: {
  pageData: PageData;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}) {
  const validSections = (pageData.sections || []).filter(
    (s): s is NonNullable<typeof s> => s != null && s.type != null,
  );

  const galleryForHero =
    (validSections.find((s) => s.type === "gallery") as GallerySection | undefined) ?? null;

  return (
    <main>
      {validSections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return (
              <T6HeroSlider
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                businessName={profile.business_name}
                gallery={galleryForHero}
              />
            );
          case "services":
            return <T6Services key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "richtext":
            return (
              <T6RichText
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                label="Story"
              />
            );
          case "values":
            return <T6Values key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "backed_by":
            return <T6BackedBy key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "use_cases":
            return <T6UseCases key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "testimonials":
            return <T6Testimonials key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "faq":
            return <T6FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "team":
            return <T6Team key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "gallery":
            return <T6Gallery key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "contact_card":
            return (
              <T6ContactCard
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                profile={profile}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}

