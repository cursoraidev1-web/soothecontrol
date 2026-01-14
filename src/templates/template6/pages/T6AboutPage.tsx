"use client";

import type { GallerySection, PageData } from "@/lib/pageSchema";
import T6HeroSlider from "../sections/T6HeroSlider";
import T4Services from "@/templates/template4/sections/T4Services";
import T4Values from "@/templates/template4/sections/T4Values";
import T4BackedBy from "@/templates/template4/sections/T4BackedBy";
import T4UseCases from "@/templates/template4/sections/T4UseCases";
import T4Testimonials from "@/templates/template4/sections/T4Testimonials";
import T4FAQ from "@/templates/template4/sections/T4FAQ";
import T4Team from "@/templates/template4/sections/T4Team";
import T4Gallery from "@/templates/template4/sections/T4Gallery";
import T4RichText from "@/templates/template4/sections/T4RichText";
import T4ContactCard from "@/templates/template4/sections/T4ContactCard";

export default function T6AboutPage({
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
            return <T4Services key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "richtext":
            return <T4RichText key={`${section.type}-${index}`} section={section} sectionIndex={index} label="About" />;
          case "values":
            return <T4Values key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "team":
            return <T4Team key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "gallery":
            return <T4Gallery key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "backed_by":
            return <T4BackedBy key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "use_cases":
            return <T4UseCases key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "testimonials":
            return <T4Testimonials key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "faq":
            return <T4FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "contact_card":
            return (
              <T4ContactCard
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

