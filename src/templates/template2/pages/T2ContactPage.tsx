"use client";

import type { PageData } from "@/lib/pageSchema";
import T2Hero from "../components/T2Hero";
import T2RichText from "../components/T2RichText";
import T2FAQ from "../components/T2FAQ";
import T2ContactCard from "../components/T2ContactCard";
import { getPublicAssetUrl } from "@/lib/assets";

interface T2ContactPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
    logo_asset_id: string | null;
    logo_path?: string | null;
  };
}

export default function T2ContactPage({ pageData, profile }: T2ContactPageProps) {
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
                sectionIndex={index}
                businessName={profile.business_name}
                logoUrl={logoUrl}
                isHomePage={false}
                pageLabel="Contact"
              />
            );
          case "richtext":
            return (
              <T2RichText
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
                label="Contact"
              />
            );
          case "faq":
            return (
              <T2FAQ
                key={`${section.type}-${index}`}
                section={section}
                sectionIndex={index}
              />
            );
          case "contact_card":
            return (
              <T2ContactCard
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
