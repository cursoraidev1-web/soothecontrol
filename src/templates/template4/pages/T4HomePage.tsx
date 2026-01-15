"use client";

import type { PageData } from "@/lib/pageSchema";
import T4Hero from "../sections/T4Hero";
import T4Services from "../sections/T4Services";
import T4Values from "../sections/T4Values";
import T4BackedBy from "../sections/T4BackedBy";
import T4UseCases from "../sections/T4UseCases";
import T4Testimonials from "../sections/T4Testimonials";
import T4FAQ from "../sections/T4FAQ";
import T4Team from "../sections/T4Team";
import T4Gallery from "../sections/T4Gallery";
import T4RichText from "../sections/T4RichText";
import T4ContactCard from "../sections/T4ContactCard";

export default function T4HomePage({
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
          case "services":
            return <T4Services key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "richtext":
            return (
              <T4RichText
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                label="Story"
              />
            );
          case "values":
            return <T4Values key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "backed_by":
            return <T4BackedBy key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "use_cases":
            return <T4UseCases key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "testimonials":
            return <T4Testimonials key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "faq":
            return <T4FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "team":
            return <T4Team key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "gallery":
            return <T4Gallery key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
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

