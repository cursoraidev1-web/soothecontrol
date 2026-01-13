"use client";

import type { PageData } from "@/lib/pageSchema";
import T2Hero from "../components/T2Hero";
import T2Services from "../components/T2Services";
import T2Gallery from "../components/T2Gallery";
import { getPublicAssetUrl } from "@/lib/assets";

interface T2AboutPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
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
              />
            );
          case "services":
            return <T2Services key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <T2Gallery key={`${section.type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
