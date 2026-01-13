"use client";

import type { PageData, PageKey } from "@/lib/pageSchema";
import { getPublicAssetUrl } from "@/lib/assets";
import "./template5.css";

import T5Header from "./components/T5Header";
import T5Footer from "./components/T5Footer";
import T5HomePage from "./pages/T5HomePage";
import T5AboutPage from "./pages/T5AboutPage";
import T5ContactPage from "./pages/T5ContactPage";

interface Template5Props {
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

export default function Template5({
  site,
  profile,
  pages,
  currentPage = "home",
  baseUrl = "",
}: Template5Props) {
  const logoUrl = profile.logo_path ? getPublicAssetUrl(profile.logo_path) : null;
  const socials = (profile.socials || {}) as Record<string, string>;
  const currentPageData = pages[currentPage];

  return (
    <div className="template5" data-site-slug={site.slug} data-template-key={site.template_key}>
      <T5Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={currentPage}
        baseUrl={baseUrl}
      />

      {currentPage === "home" && (
        <T5HomePage pageData={currentPageData} profile={profile} />
      )}
      {currentPage === "about" && (
        <T5AboutPage pageData={currentPageData} profile={profile} />
      )}
      {currentPage === "contact" && (
        <T5ContactPage pageData={currentPageData} profile={profile} />
      )}

      <T5Footer
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

