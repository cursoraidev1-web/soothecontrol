"use client";

import type { PageData } from "@/lib/pageSchema";
import T5Hero from "../sections/T5Hero";
import T5Services from "../sections/T5Services";
import T5Values from "../sections/T5Values";
import T5BackedBy from "../sections/T5BackedBy";
import T5UseCases from "../sections/T5UseCases";
import T5Testimonials from "../sections/T5Testimonials";
import T5FAQ from "../sections/T5FAQ";
import T5Team from "../sections/T5Team";
import T5Gallery from "../sections/T5Gallery";
import T5RichText from "../sections/T5RichText";
import T5ContactCard from "../sections/T5ContactCard";

export default function T5HomePage({
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
          case "services":
            return <T5Services key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "richtext":
            return (
              <T5RichText
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                label="Story"
              />
            );
          case "values":
            return <T5Values key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "backed_by":
            return <T5BackedBy key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "use_cases":
            return <T5UseCases key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "testimonials":
            return <T5Testimonials key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "faq":
            return <T5FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "team":
            return <T5Team key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "gallery":
            return <T5Gallery key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "contact_card":
            return (
              <T5ContactCard
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

