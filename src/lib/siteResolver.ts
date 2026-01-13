import { supabaseBrowser } from "@/lib/supabase/browser";
import type { PageData, PageKey } from "@/lib/pageSchema";
import { defaultPageData, validatePageData } from "@/lib/pageSchema";

export interface SiteData {
  site: {
    id: string;
    slug: string;
    template_key: string;
    status: string;
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
}

export async function resolveSiteBySlug(slug: string): Promise<SiteData | null> {
  const supabase = supabaseBrowser();

  // Load site
  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id, slug, template_key, status")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (siteError || !site) {
    return null;
  }

  // Load profile
  const { data: profile, error: profileError } = await supabase
    .from("business_profiles")
    .select(
      "business_name, tagline, description, address, phone, email, whatsapp, socials, logo_asset_id",
    )
    .eq("site_id", site.id)
    .single();

  if (profileError || !profile) {
    return null;
  }

  // Load logo path if logo_asset_id exists
  let logoPath: string | null = null;
  if (profile.logo_asset_id) {
    const { data: asset } = await supabase
      .from("assets")
      .select("path")
      .eq("id", profile.logo_asset_id)
      .single();
    if (asset) {
      logoPath = asset.path;
    }
  }

  // Load pages
  const { data: pagesData, error: pagesError } = await supabase
    .from("pages")
    .select("key, data, status")
    .eq("site_id", site.id)
    .eq("status", "published")
    .in("key", ["home", "about", "contact"]);

  if (pagesError || !pagesData) {
    return null;
  }

  // Organize pages by key with validation
  const pagesMap = new Map<PageKey, PageData>();
  for (const page of pagesData) {
    if (page.data && typeof page.data === "object") {
      const pageKey = page.key as PageKey;
      const validation = validatePageData(page.data);
      if (validation.ok) {
        const pageData = page.data as PageData;
        // Filter out any invalid sections (undefined, null, or missing type)
        const validSections = (pageData.sections || []).filter(
          (section): section is NonNullable<typeof section> =>
            section != null && typeof section === "object" && "type" in section
        );
        pagesMap.set(pageKey, { ...pageData, sections: validSections });
      } else {
        pagesMap.set(pageKey, defaultPageData(pageKey));
      }
    }
  }

  // Ensure all pages exist, use defaults if missing
  const homePage = pagesMap.get("home") || defaultPageData("home");
  const aboutPage = pagesMap.get("about") || defaultPageData("about");
  const contactPage = pagesMap.get("contact") || defaultPageData("contact");

  return {
    site,
    profile: {
      ...profile,
      logo_path: logoPath,
    },
    pages: {
      home: homePage,
      about: aboutPage,
      contact: contactPage,
    },
  };
}

export async function resolveSiteById(siteId: string): Promise<SiteData | null> {
  const supabase = supabaseBrowser();

  // Load site
  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id, slug, template_key, status")
    .eq("id", siteId)
    .single();

  if (siteError || !site) {
    return null;
  }

  // Load profile
  const { data: profile, error: profileError } = await supabase
    .from("business_profiles")
    .select(
      "business_name, tagline, description, address, phone, email, whatsapp, socials, logo_asset_id",
    )
    .eq("site_id", site.id)
    .single();

  if (profileError || !profile) {
    return null;
  }

  // Load logo path if logo_asset_id exists
  let logoPath: string | null = null;
  if (profile.logo_asset_id) {
    const { data: asset } = await supabase
      .from("assets")
      .select("path")
      .eq("id", profile.logo_asset_id)
      .single();
    if (asset) {
      logoPath = asset.path;
    }
  }

  // Load pages (both draft and published for admin preview)
  const { data: pagesData, error: pagesError } = await supabase
    .from("pages")
    .select("key, data, status")
    .eq("site_id", site.id)
    .in("key", ["home", "about", "contact"]);

  if (pagesError || !pagesData) {
    return null;
  }

  // Organize pages by key (prefer published, fallback to draft)
  const pagesMap = new Map<PageKey, PageData>();
  for (const page of pagesData) {
    if (page.data && typeof page.data === "object") {
      const existing = pagesMap.get(page.key as PageKey);
      // Prefer published over draft
      if (!existing || page.status === "published") {
        const pageKey = page.key as PageKey;
        // Validate page data structure
        const validation = validatePageData(page.data);
        if (validation.ok) {
          const pageData = page.data as PageData;
          // Filter out any invalid sections (undefined, null, or missing type)
          const validSections = (pageData.sections || []).filter(
            (section): section is NonNullable<typeof section> =>
              section != null && typeof section === "object" && "type" in section
          );
          pagesMap.set(pageKey, { ...pageData, sections: validSections });
        } else {
          // Use default page data if validation fails
          pagesMap.set(pageKey, defaultPageData(pageKey));
        }
      }
    }
  }

  // Ensure all pages exist, use defaults if missing
  const homePage = pagesMap.get("home") || defaultPageData("home");
  const aboutPage = pagesMap.get("about") || defaultPageData("about");
  const contactPage = pagesMap.get("contact") || defaultPageData("contact");

  return {
    site,
    profile: {
      ...profile,
      logo_path: logoPath,
    },
    pages: {
      home: homePage,
      about: aboutPage,
      contact: contactPage,
    },
  };
}
