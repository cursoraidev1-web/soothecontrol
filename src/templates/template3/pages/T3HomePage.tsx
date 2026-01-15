"use client";

import type { PageData } from "@/lib/pageSchema";
import T3Hero from "../sections/T3Hero";
import T3Services from "../sections/T3Services";
import T3RichText from "../sections/T3RichText";
import T3Values from "../sections/T3Values";
import T3BackedBy from "../sections/T3BackedBy";
import T3UseCases from "../sections/T3UseCases";
import T3Testimonials from "../sections/T3Testimonials";
import T3FAQ from "../sections/T3FAQ";
import T3Gallery from "../sections/T3Gallery";
import T3ContactCard from "../sections/T3ContactCard";

export default function T3HomePage({
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
          case "services":
            return <T3Services key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "richtext":
            return <T3RichText key={`${section.type}-${index}`} section={section} sectionIndex={index} label="About" />;
          case "values":
            return <T3Values key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "backed_by":
            return <T3BackedBy key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "use_cases":
            return <T3UseCases key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "testimonials":
            return <T3Testimonials key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "faq":
            return <T3FAQ key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
          case "gallery":
            return <T3Gallery key={`${section.type}-${index}`} section={section} sectionIndex={index} />;
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
          default:
            return null;
        }
      })}
    </main>
  );
}

