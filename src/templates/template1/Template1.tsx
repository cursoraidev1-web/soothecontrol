"use client";

import type { PageKey, PageData } from "@/lib/pageSchema";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import { getPublicAssetUrl } from "@/lib/assets";
import "./template1.css";

interface Template1Props {
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

export default function Template1({
  site,
  profile,
  pages,
  currentPage = "home",
  baseUrl = "",
  pageOverride,
}: Template1Props) {
  const logoUrl = profile.logo_path
    ? getPublicAssetUrl(profile.logo_path)
    : null;

  const socials = (profile.socials || {}) as Record<string, string>;

  const effectivePage: PageKey = (pageOverride ? "home" : (currentPage ?? "home"));
  const navPage: PageKey | null = pageOverride ? null : (currentPage ?? "home");
  const currentPageData = pageOverride ?? pages[effectivePage];

  return (
    <div className="template1-container">
      <Header
        businessName={profile.business_name}
        logoUrl={logoUrl}
        currentPage={navPage}
        baseUrl={baseUrl}
        profile={profile}
      />

      {effectivePage === "home" && (
        <HomePage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "about" && (
        <AboutUsPage pageData={currentPageData} profile={profile} />
      )}
      {effectivePage === "contact" && (
        <ContactUsPage pageData={currentPageData} profile={profile} />
      )}

      <Footer
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
