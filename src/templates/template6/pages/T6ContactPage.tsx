"use client";

import type { GallerySection, PageData } from "@/lib/pageSchema";
import T6HeroSlider from "../sections/T6HeroSlider";
import T4RichText from "@/templates/template4/sections/T4RichText";
import T4ContactCard from "@/templates/template4/sections/T4ContactCard";
import T4FAQ from "@/templates/template4/sections/T4FAQ";

export default function T6ContactPage({
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
          case "richtext":
            return <T4RichText key={`${section.type}-${index}`} section={section} sectionIndex={index} label="Contact" />;
          case "contact_card":
            return (
              <T4ContactCard
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                profile={profile}
              />
            );
          case "faq":
            return <T4FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

