"use client";

import type { PageKey, PageData } from "@/lib/pageSchema";
import T2Header from "./components/T2Header";
import T2Footer from "./components/T2Footer";
import T2HomePage from "./pages/T2HomePage";
import T2AboutPage from "./pages/T2AboutPage";
import T2ContactPage from "./pages/T2ContactPage";
import { getPublicAssetUrl } from "@/lib/assets";

interface Template2Props {
  site: {
    id: string;
    slug: string;
    template_key: string;
  };
  profile: {
    business_name: string;
    tagline: string | null;
    description: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
    socials: Record<string, unknown> | null;
    logo_asset_id: string | null;
    logo_path?: string | null;
  };
  pages: {
    home: PageData;
    about: PageData;
    contact: PageData;
  };
  currentPage?: PageKey | null;
  baseUrl?: string;
  pageOverride?: PageData;
}

export default function Template2({
  site,
  profile,
  pages,
  currentPage = "home",
  baseUrl = "",
  pageOverride,
}: Template2Props) {
  const logoUrl = profile.logo_path
    ? getPublicAssetUrl(profile.logo_path)
    : null;

  const socials = (profile.socials || {}) as Record<string, string>;

  const effectivePage: PageKey = (pageOverride ? "home" : (currentPage ?? "home"));
  const navPage: PageKey | null = pageOverride ? null : (currentPage ?? "home");
  const currentPageData = pageOverride ?? pages[effectivePage];

  return (
    <div className="min-h-screen bg-white">
      <T2Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={navPage}
        baseUrl={baseUrl}
        profile={profile}
      />

      {effectivePage === "home" && (
        <T2HomePage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "about" && (
        <T2AboutPage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "contact" && (
        <T2ContactPage pageData={currentPageData} profile={profile} />
      )}

      <T2Footer
        businessName={profile.business_name}
        tagline={profile.tagline}
        address={profile.address}
        phone={profile.phone}
        email={profile.email}
        socials={socials}
        logoUrl={logoUrl}
        baseUrl={baseUrl}
      />
    </div>
  );
}
