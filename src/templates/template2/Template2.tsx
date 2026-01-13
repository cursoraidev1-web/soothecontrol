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
  currentPage?: PageKey;
  baseUrl?: string;
}

export default function Template2({
  site,
  profile,
  pages,
  currentPage = "home",
  baseUrl = "",
}: Template2Props) {
  const logoUrl = profile.logo_path
    ? getPublicAssetUrl(profile.logo_path)
    : null;

  const socials = (profile.socials || {}) as Record<string, string>;

  const currentPageData = pages[currentPage];

  return (
    <div className="min-h-screen bg-white">
      <T2Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={currentPage}
        baseUrl={baseUrl}
      />

      {currentPage === "home" && (
        <T2HomePage pageData={currentPageData} profile={profile} />
      )}
      {currentPage === "about" && (
        <T2AboutPage pageData={currentPageData} profile={profile} />
      )}
      {currentPage === "contact" && (
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
