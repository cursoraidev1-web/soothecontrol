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

function toDefaultPages(keys: PageKey[]) {
  const pagesMap = new Map<PageKey, PageData>();
  for (const k of keys) pagesMap.set(k, defaultPageData(k));
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
    // Use "*" for forward/backward-compatible selects across DB migrations.
    // Some deployments may not have all optional columns yet (e.g. whatsapp).
    .select("*")
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

  const keys: PageKey[] = ["home", "about", "contact"];

  // Public render needs `pages.data`, but some Supabase setups restrict column access.
  // If we can’t read data, we fall back to defaults instead of 404’ing the whole site.
  const { data: pagesRows, error: pagesError } = await supabase
    .from("pages")
    .select("key, data, status")
    .eq("site_id", (site as { id: string }).id)
    .eq("status", "published")
    .in("key", keys);

  let pagesMap: Map<PageKey, PageData>;
  if (pagesError) {
    // Try a minimal select; if this succeeds, we can still render with defaults.
    const { data: minimalRows, error: minimalError } = await supabase
      .from("pages")
      .select("key, status")
      .eq("site_id", (site as { id: string }).id)
      .eq("status", "published")
      .in("key", keys);

    if (minimalError || !(minimalRows && minimalRows.length > 0)) return null;
    pagesMap = toDefaultPages(keys);
  } else {
    pagesMap = toPageDataMap((pagesRows ?? []) as Array<{ key: string; data: unknown }>);
  }

  const homePage = pagesMap.get("home") || defaultPageData("home");
  const aboutPage = pagesMap.get("about") || defaultPageData("about");
  const contactPage = pagesMap.get("contact") || defaultPageData("contact");

  return {
    site: site as SiteData["site"],
    profile: {
      business_name: (profile as any).business_name ?? "Business",
      tagline: (profile as any).tagline ?? null,
      description: (profile as any).description ?? null,
      address: (profile as any).address ?? null,
      phone: (profile as any).phone ?? null,
      email: (profile as any).email ?? null,
      whatsapp: (profile as any).whatsapp ?? null,
      socials: (profile as any).socials ?? null,
      logo_asset_id: (profile as any).logo_asset_id ?? null,
      logo_path: logoPath,
    },
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
    // Use "*" for forward/backward-compatible selects across DB migrations.
    .select("*")
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

  const keys: PageKey[] = ["home", "about", "contact"];

  const { data: pagesRows, error: pagesError } = await supabase
    .from("pages")
    .select("key, data, status")
    .eq("site_id", (site as { id: string }).id)
    .eq("status", "published")
    .in("key", keys);

  let pagesMap: Map<PageKey, PageData>;
  if (pagesError) {
    const { data: minimalRows, error: minimalError } = await supabase
      .from("pages")
      .select("key, status")
      .eq("site_id", (site as { id: string }).id)
      .eq("status", "published")
      .in("key", keys);

    if (minimalError || !(minimalRows && minimalRows.length > 0)) return null;
    pagesMap = toDefaultPages(keys);
  } else {
    pagesMap = toPageDataMap((pagesRows ?? []) as Array<{ key: string; data: unknown }>);
  }

  const homePage = pagesMap.get("home") || defaultPageData("home");
  const aboutPage = pagesMap.get("about") || defaultPageData("about");
  const contactPage = pagesMap.get("contact") || defaultPageData("contact");

  return {
    site: site as SiteData["site"],
    profile: {
      business_name: (profile as any).business_name ?? "Business",
      tagline: (profile as any).tagline ?? null,
      description: (profile as any).description ?? null,
      address: (profile as any).address ?? null,
      phone: (profile as any).phone ?? null,
      email: (profile as any).email ?? null,
      whatsapp: (profile as any).whatsapp ?? null,
      socials: (profile as any).socials ?? null,
      logo_asset_id: (profile as any).logo_asset_id ?? null,
      logo_path: logoPath,
    },
    pages: { home: homePage, about: aboutPage, contact: contactPage },
  };
}

