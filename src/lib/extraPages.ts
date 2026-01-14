import { supabaseBrowser, getAuthenticatedClient } from "@/lib/supabase/browser";
import type { PageData } from "@/lib/pageSchema";
import { validatePageData } from "@/lib/pageSchema";

export type ExtraPageRow = {
  id: string;
  site_id: string;
  key: string;
  status: "draft" | "published";
  data: PageData;
  updated_at: string;
  published_at: string | null;
};

export async function listExtraPages(siteId: string): Promise<ExtraPageRow[]> {
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("extra_pages")
    .select("id, site_id, key, status, data, updated_at, published_at")
    .eq("site_id", siteId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as ExtraPageRow[];
}

export async function getExtraPageByKey(
  siteId: string,
  key: string,
): Promise<ExtraPageRow | null> {
  const supabase = await getAuthenticatedClient();
  const { data, error } = await supabase
    .from("extra_pages")
    .select("id, site_id, key, status, data, updated_at, published_at")
    .eq("site_id", siteId)
    .eq("key", key)
    .single();
  if (error) {
    // PostgREST "No rows found"
    const msg = (error as any)?.message ?? "";
    if ((error as any)?.code === "PGRST116" || msg.toLowerCase().includes("0 rows")) return null;
    throw error;
  }
  return data as unknown as ExtraPageRow;
}

export async function createExtraPage(siteId: string, key: string, data: PageData) {
  const valid = validatePageData(data);
  if (!valid.ok) throw new Error(valid.error ?? "Invalid page data.");

  const supabase = await getAuthenticatedClient();
  const { data: created, error } = await supabase
    .from("extra_pages")
    .insert({ site_id: siteId, key, data, status: "draft" })
    .select("id, site_id, key, status, data, updated_at, published_at")
    .single();
  if (error) throw error;
  return created as unknown as ExtraPageRow;
}

export async function saveExtraPageDraft(pageId: string, data: PageData) {
  const valid = validatePageData(data);
  if (!valid.ok) throw new Error(valid.error ?? "Invalid page data.");

  const supabase = await getAuthenticatedClient();
  const { error } = await supabase
    .from("extra_pages")
    .update({ data, status: "draft" })
    .eq("id", pageId);
  if (error) throw error;
}

export async function publishExtraPage(pageId: string, data: PageData) {
  const valid = validatePageData(data);
  if (!valid.ok) throw new Error(valid.error ?? "Invalid page data.");

  const supabase = await getAuthenticatedClient();
  const now = new Date().toISOString();
  const { data: updated, error } = await supabase
    .from("extra_pages")
    .update({ data, status: "published", published_at: now })
    .eq("id", pageId)
    .select("id, site_id, key, status, data, updated_at, published_at")
    .single();
  if (error) throw error;
  return updated as unknown as ExtraPageRow;
}

export async function unpublishExtraPage(pageId: string) {
  const supabase = await getAuthenticatedClient();
  const { data: updated, error } = await supabase
    .from("extra_pages")
    .update({ status: "draft", published_at: null })
    .eq("id", pageId)
    .select("id, site_id, key, status, data, updated_at, published_at")
    .single();
  if (error) throw error;
  return updated as unknown as ExtraPageRow;
}

// Public resolver (no auth): published extra pages only.
export async function getPublishedExtraPageBySiteSlug(
  siteId: string,
  key: string,
): Promise<PageData | null> {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from("extra_pages")
    .select("data")
    .eq("site_id", siteId)
    .eq("key", key)
    .eq("status", "published")
    .single();
  if (error) return null;
  const pageData = (data as any)?.data as unknown;
  const v = validatePageData(pageData);
  if (!v.ok) return null;
  return pageData as PageData;
}

