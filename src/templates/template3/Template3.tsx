"use client";

import type { PageData, PageKey } from "@/lib/pageSchema";
import { getPublicAssetUrl } from "@/lib/assets";
import "./template3.css";
import T3Header from "./components/T3Header";
import T3Footer from "./components/T3Footer";
import T3HomePage from "./pages/T3HomePage";
import T3AboutPage from "./pages/T3AboutPage";
import T3ContactPage from "./pages/T3ContactPage";

interface Template3Props {
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

export default function Template3({
  site,
  profile,
  pages,
  currentPage = "home",
  baseUrl = "",
  pageOverride,
}: Template3Props) {
  const logoUrl = profile.logo_path ? getPublicAssetUrl(profile.logo_path) : null;
  const socials = (profile.socials || {}) as Record<string, string>;
  const effectivePage: PageKey = (pageOverride ? "home" : (currentPage ?? "home"));
  const navPage: PageKey | null = pageOverride ? null : (currentPage ?? "home");
  const currentPageData = pageOverride ?? pages[effectivePage];

  return (
    <div className="template3">
      <T3Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={navPage}
        baseUrl={baseUrl}
      />

      {effectivePage === "home" && (
        <T3HomePage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "about" && (
        <T3AboutPage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "contact" && (
        <T3ContactPage pageData={currentPageData} profile={profile} />
      )}

      <T3Footer
        businessName={profile.business_name}
        tagline={profile.tagline}
        address={profile.address}
        phone={profile.phone}
        email={profile.email}
        socials={socials}
        baseUrl={baseUrl}
      />
    </div>
  );
}

