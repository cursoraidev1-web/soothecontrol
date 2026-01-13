"use client";

import type { PageData, PageKey } from "@/lib/pageSchema";
import { getPublicAssetUrl } from "@/lib/assets";
import "./template4.css";

import T4Header from "./components/T4Header";
import T4Footer from "./components/T4Footer";
import T4HomePage from "./pages/T4HomePage";
import T4AboutPage from "./pages/T4AboutPage";
import T4ContactPage from "./pages/T4ContactPage";

interface Template4Props {
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

export default function Template4({
  site,
  profile,
  pages,
  currentPage = "home",
  baseUrl = "",
}: Template4Props) {
  const logoUrl = profile.logo_path ? getPublicAssetUrl(profile.logo_path) : null;
  const socials = (profile.socials || {}) as Record<string, string>;
  const currentPageData = pages[currentPage];

  return (
    <div className="template4" data-site-slug={site.slug} data-template-key={site.template_key}>
      <T4Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={currentPage}
        baseUrl={baseUrl}
      />

      {currentPage === "home" && (
        <T4HomePage pageData={currentPageData} profile={profile} />
      )}
      {currentPage === "about" && (
        <T4AboutPage pageData={currentPageData} profile={profile} />
      )}
      {currentPage === "contact" && (
        <T4ContactPage pageData={currentPageData} profile={profile} />
      )}

      <T4Footer
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

