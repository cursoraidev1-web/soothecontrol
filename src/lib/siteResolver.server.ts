import type { PageData, PageKey } from "@/lib/pageSchema";
import { defaultPageData, validatePageData } from "@/lib/pageSchema";
import { normalizeHostname } from "@/lib/domains";
import { supabaseServer } from "@/lib/supabase/server";

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

function toPageDataMap(rows: Array<{ key: string; data: unknown }>) {
  const pagesMap = new Map<PageKey, PageData>();
  for (const row of rows) {
    if (!row.data || typeof row.data !== "object") continue;
    const pageKey = row.key as PageKey;
    const validation = validatePageData(row.data);
    if (validation.ok) {
      const pageData = row.data as PageData;
      const validSections = (pageData.sections || []).filter(
        (section): section is NonNullable<typeof section> =>
          section != null && typeof section === "object" && "type" in section,
      );
      pagesMap.set(pageKey, { ...pageData, sections: validSections });
    } else {
      pagesMap.set(pageKey, defaultPageData(pageKey));
    }
  }
  return pagesMap;
}

export async function resolveSiteBySlug(slug: string): Promise<SiteData | null> {
  const supabase = supabaseServer();

  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id, slug, template_key, status")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (siteError || !site) return null;

  const { data: profile, error: profileError } = await supabase
    .from("business_profiles")
    .select(
      "business_name, tagline, description, address, phone, email, whatsapp, socials, logo_asset_id",
    )
    .eq("site_id", site.id)
    .single();

  if (profileError || !profile) return null;

  // Load logo path if logo_asset_id exists
  let logoPath: string | null = null;
  if (profile.logo_asset_id) {
    const { data: asset } = await supabase
      .from("assets")
      .select("path")
      .eq("id", profile.logo_asset_id)
      .single();
    if (asset) logoPath = (asset as { path: string }).path;
  }

  const { data: pagesRows, error: pagesError } = await supabase
    .from("pages")
    .select("key, data, status")
    .eq("site_id", site.id)
    .eq("status", "published")
    .in("key", ["home", "about", "contact"]);

  if (pagesError) return null;

  const pagesMap = toPageDataMap((pagesRows ?? []) as Array<{ key: string; data: unknown }>);
  const homePage = pagesMap.get("home") || defaultPageData("home");
  const aboutPage = pagesMap.get("about") || defaultPageData("about");
  const contactPage = pagesMap.get("contact") || defaultPageData("contact");

  return {
    site: site as SiteData["site"],
    profile: { ...(profile as SiteData["profile"]), logo_path: logoPath },
    pages: { home: homePage, about: aboutPage, contact: contactPage },
  };
}

export async function resolveSiteByHostname(hostname: string): Promise<SiteData | null> {
  const supabase = supabaseServer();
  const normalized = normalizeHostname(hostname);
  if (!normalized) return null;

  const { data: domain, error: domainError } = await supabase
    .from("domains")
    .select("site_id, status")
    .eq("hostname", normalized)
    .eq("status", "active")
    .single();

  if (domainError || !domain) return null;

  const { data: site, error: siteError } = await supabase
    .from("sites")
    .select("id, slug, template_key, status")
    .eq("id", (domain as { site_id: string }).site_id)
    .eq("status", "published")
    .single();

  if (siteError || !site) return null;

  const { data: profile, error: profileError } = await supabase
    .from("business_profiles")
    .select(
      "business_name, tagline, description, address, phone, email, whatsapp, socials, logo_asset_id",
    )
    .eq("site_id", (site as { id: string }).id)
    .single();

  if (profileError || !profile) return null;

  let logoPath: string | null = null;
  if ((profile as { logo_asset_id: string | null }).logo_asset_id) {
    const { data: asset } = await supabase
      .from("assets")
      .select("path")
      .eq("id", (profile as { logo_asset_id: string }).logo_asset_id)
      .single();
    if (asset) logoPath = (asset as { path: string }).path;
  }

  const { data: pagesRows, error: pagesError } = await supabase
    .from("pages")
    .select("key, data, status")
    .eq("site_id", (site as { id: string }).id)
    .eq("status", "published")
    .in("key", ["home", "about", "contact"]);

  if (pagesError) return null;

  const pagesMap = toPageDataMap((pagesRows ?? []) as Array<{ key: string; data: unknown }>);
  const homePage = pagesMap.get("home") || defaultPageData("home");
  const aboutPage = pagesMap.get("about") || defaultPageData("about");
  const contactPage = pagesMap.get("contact") || defaultPageData("contact");

  return {
    site: site as SiteData["site"],
    profile: { ...(profile as SiteData["profile"]), logo_path: logoPath },
    pages: { home: homePage, about: aboutPage, contact: contactPage },
  };
}

