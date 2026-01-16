"use client";

import type { GallerySection, PageData } from "@/lib/pageSchema";
import T6HeroSlider from "../sections/T6HeroSlider";
import T6RichText from "../sections/T6RichText";
import T6ContactCard from "../sections/T6ContactCard";
import T6FAQ from "../sections/T6FAQ";

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
            return <T6RichText key={`${section.type}-${index}`} section={section} sectionIndex={index} label="Contact" />;
          case "contact_card":
            return (
              <T6ContactCard
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                profile={profile}
              />
            );
          case "faq":
            return <T6FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

