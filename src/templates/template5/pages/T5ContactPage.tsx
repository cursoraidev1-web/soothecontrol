"use client";

import type { PageData } from "@/lib/pageSchema";
import T5Hero from "../sections/T5Hero";
import T5RichText from "../sections/T5RichText";
import T5ContactCard from "../sections/T5ContactCard";
import T5FAQ from "../sections/T5FAQ";

export default function T5ContactPage({
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
              <T5Hero
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                businessName={profile.business_name}
              />
            );
          case "richtext":
            return <T5RichText key={`${section.type}-${index}`} section={section} sectionIndex={index} label="Contact" />;
          case "contact_card":
            return (
              <T5ContactCard
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                profile={profile}
              />
            );
          case "faq":
            return <T5FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

