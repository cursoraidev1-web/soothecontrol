"use client";

import type { PageData } from "@/lib/pageSchema";
import T3Hero from "../sections/T3Hero";
import T3FAQ from "../sections/T3FAQ";
import T3RichText from "../sections/T3RichText";
import T3ContactCard from "../sections/T3ContactCard";

export default function T3ContactPage({
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
              <T3Hero
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                businessName={profile.business_name}
              />
            );
          case "contact_card":
            return (
              <T3ContactCard
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                profile={{
                  business_name: profile.business_name,
                  address: profile.address,
                  phone: profile.phone,
                  email: profile.email,
                  whatsapp: profile.whatsapp,
                }}
              />
            );
          case "faq":
            return <T3FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "richtext":
            return <T3RichText key={`${section.type}-${index}`} section={section} sectionIndex={index} label="More" />;
          default:
            return null;
        }
      })}
    </main>
  );
}

