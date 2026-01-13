"use client";

import type { PageData } from "@/lib/pageSchema";
import T2Hero from "../components/T2Hero";
import T2Services from "../components/T2Services";
import T2Gallery from "../components/T2Gallery";
import T2Team from "../components/T2Team";
import { getPublicAssetUrl } from "@/lib/assets";

interface T2AboutPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    logo_asset_id: string | null;
    logo_path?: string | null;
    description: string | null;
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
                <div key={`${section.type}-${index}`}>
                    <T2Hero
                        section={section}
                        businessName={profile.business_name}
                        logoUrl={logoUrl}
                        isHomePage={false}
                    />
                    {/* Intro text block */}
                    <section className="py-16 bg-white">
                        <div className="mx-auto max-w-3xl px-6 text-center">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {profile.description || "We are a team of dedicated professionals committed to delivering excellence. Our journey began with a simple mission: to help businesses grow and succeed in an ever-evolving digital landscape."}
                            </p>
                        </div>
                    </section>
                    <T2Team />
                </div>
            );
          case "services":
            return <T2Services key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <T2Gallery key={`${section.type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}
      
      {/* Fallback if no sections rendered */}
      {!validSections.some(s => s?.type === 'hero') && <T2Team />}
    </main>
  );
}
