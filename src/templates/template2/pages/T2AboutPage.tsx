"use client";

import type { PageData } from "@/lib/pageSchema";
import T2Hero from "../components/T2Hero";
import T2Services from "../components/T2Services";
import T2Gallery from "../components/T2Gallery";
import T2RichText from "../components/T2RichText";
import T2Values from "../components/T2Values";
import T2BackedBy from "../components/T2BackedBy";
import T2UseCases from "../components/T2UseCases";
import T2Testimonials from "../components/T2Testimonials";
import T2FAQ from "../components/T2FAQ";
import T2ContactCard from "../components/T2ContactCard";
import T2Team from "../components/T2Team";
import { getPublicAssetUrl } from "@/lib/assets";

interface T2AboutPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    whatsapp?: string | null;
    logo_asset_id: string | null;
    logo_path?: string | null;
  };
}

export default function T2AboutPage({ pageData, profile }: T2AboutPageProps) {
  const logoUrl = profile.logo_path
    ? getPublicAssetUrl(profile.logo_path)
    : null;

  const validSections = (pageData.sections || []).filter(
    (section): section is NonNullable<typeof section> => section != null && section.type != null
  );

  return (
    <main>
      {validSections.map((section, index) => {
        if (!section || !section.type) {
          return null;
        }
        switch (section.type) {
          case "hero":
            return (
              <T2Hero
                key={`${section.type}-${index}`}
                section={section}
                businessName={profile.business_name}
                logoUrl={logoUrl}
                isHomePage={false}
                pageLabel="About"
              />
            );
          case "services":
            return <T2Services key={`${section.type}-${index}`} section={section} />;
          case "richtext":
            return <T2RichText key={`${section.type}-${index}`} section={section} label="Our story" />;
          case "values":
            return <T2Values key={`${section.type}-${index}`} section={section} />;
          case "team":
            return <T2Team key={`${section.type}-${index}`} section={section} />;
          case "backed_by":
            return <T2BackedBy key={`${section.type}-${index}`} section={section} />;
          case "use_cases":
            return <T2UseCases key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <T2Gallery key={`${section.type}-${index}`} section={section} />;
          case "testimonials":
            return <T2Testimonials key={`${section.type}-${index}`} section={section} />;
          case "faq":
            return <T2FAQ key={`${section.type}-${index}`} section={section} />;
          case "contact_card":
            return (
              <T2ContactCard
                key={`${section.type}-${index}`}
                section={section}
                profile={{
                  business_name: profile.business_name,
                  address: profile.address ?? null,
                  phone: profile.phone ?? null,
                  email: profile.email ?? null,
                  whatsapp: profile.whatsapp ?? null,
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
