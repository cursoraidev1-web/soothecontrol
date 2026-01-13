"use client";

import type { PageKey, PageData } from "@/lib/pageSchema";
import { useEffect } from "react";
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

  // #region agent log
  useEffect(() => {
    // Check Tailwind CSS availability when Template2 mounts
    const stylesheets = Array.from(document.styleSheets);
    let tailwindRulesCount = 0;
    let template1CSSFound = false;
    
    stylesheets.forEach((sheet) => {
      try {
        const href = (sheet as CSSStyleSheet).href || '';
        if (href.includes('template1.css')) {
          template1CSSFound = true;
        }
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule) => {
          const cssText = rule.cssText || '';
          if (cssText.includes('.bg-') || cssText.includes('.text-') || 
              cssText.includes('.flex') || cssText.includes('.sticky')) {
            tailwindRulesCount++;
          }
        });
      } catch (e) {
        // CORS or other errors
      }
    });

    // Test if Tailwind classes work
    const testEl = document.createElement('div');
    testEl.className = 'bg-white text-gray-900';
    testEl.style.display = 'none';
    document.body.appendChild(testEl);
    const computed = window.getComputedStyle(testEl);
    const bgWorks = computed.backgroundColor === 'rgb(255, 255, 255)';
    document.body.removeChild(testEl);

    fetch('http://127.0.0.1:7242/ingest/964fc30c-b698-4731-8f08-53848077e169',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Template2.tsx:55',message:'Template2 mounted - checking Tailwind CSS',data:{tailwindRulesCount,template1CSSFound,stylesheetsCount:stylesheets.length,bgWorks,templateKey:'t2'},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
  }, []);
  // #endregion

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
