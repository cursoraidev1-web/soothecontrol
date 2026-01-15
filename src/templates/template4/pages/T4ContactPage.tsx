"use client";

import type { PageData } from "@/lib/pageSchema";
import T4Hero from "../sections/T4Hero";
import T4RichText from "../sections/T4RichText";
import T4ContactCard from "../sections/T4ContactCard";
import T4FAQ from "../sections/T4FAQ";

export default function T4ContactPage({
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

  return (
    <main>
      {validSections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return (
              <T4Hero
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                businessName={profile.business_name}
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

