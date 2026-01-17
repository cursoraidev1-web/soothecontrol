"use client";

import type { CSSProperties } from "react";
import type { PageData, PageKey } from "@/lib/pageSchema";
import { getPublicAssetUrl } from "@/lib/assets";
import "./template6.css";
import { buildTemplateThemeStyle } from "@/lib/themeVars";

import T6Header from "./components/T6Header";
import T6Footer from "./components/T6Footer";
import T6HomePage from "./pages/T6HomePage";
import T6AboutPage from "./pages/T6AboutPage";
import T6ContactPage from "./pages/T6ContactPage";

interface Template6Props {
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
    brand_colors?: Record<string, unknown> | null;
    theme_colors?: Record<string, unknown> | null;
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

export default function Template6({
  site,
  profile,
  pages,
  currentPage = "home",
  baseUrl = "",
  pageOverride,
}: Template6Props) {
  const logoUrl = profile.logo_path ? getPublicAssetUrl(profile.logo_path) : null;
  const socials = (profile.socials || {}) as Record<string, string>;

  const effectivePage: PageKey = pageOverride ? "home" : (currentPage ?? "home");
  const navPage: PageKey | null = pageOverride ? null : (currentPage ?? "home");
  const currentPageData = pageOverride ?? pages[effectivePage];
  const themeStyle = buildTemplateThemeStyle(site.template_key, profile) as CSSProperties | undefined;

  return (
    <div className="template6" data-site-slug={site.slug} data-template-key={site.template_key} style={themeStyle}>
      <T6Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={navPage}
        baseUrl={baseUrl}
      />

      {effectivePage === "home" && (
        <T6HomePage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "about" && (
        <T6AboutPage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "contact" && (
        <T6ContactPage pageData={currentPageData} profile={profile} />
      )}

      <T6Footer
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

