"use client";

import type { CSSProperties } from "react";
import type { PageData, PageKey } from "@/lib/pageSchema";
import { getPublicAssetUrl } from "@/lib/assets";
import "./template3.css";
import { toCssVarMap } from "@/lib/templateTheme";
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
    theme_colors?: Record<string, unknown> | null;
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

  const themeStyle = (() => {
    const raw = profile.theme_colors;
    if (!raw || typeof raw !== "object") return undefined;
    const per = (raw as Record<string, unknown>)[site.template_key];
    if (!per || typeof per !== "object") return undefined;
    const colors: Record<string, string> = {};
    for (const [k, v] of Object.entries(per as Record<string, unknown>)) {
      if (typeof v === "string") colors[k] = v;
    }
    const cssVars = toCssVarMap(site.template_key, colors);
    if (Object.keys(cssVars).length === 0) return undefined;
    return cssVars as unknown as CSSProperties;
  })();

  return (
    <div className="template3" style={themeStyle}>
      <T3Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={navPage}
        baseUrl={baseUrl}
        profile={profile}
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

