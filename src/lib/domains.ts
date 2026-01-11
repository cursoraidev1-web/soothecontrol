import { supabaseBrowser } from "@/lib/supabase/browser";

export type DomainStatus = "pending" | "active" | "blocked";

export function normalizeHostname(hostname: string) {
  return hostname.trim().toLowerCase();
}

export async function addDomain(siteId: string, hostname: string) {
  const normalized = normalizeHostname(hostname);
  if (!normalized) throw new Error("Hostname is required.");

  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from("domains")
    .insert({ site_id: siteId, hostname: normalized, status: "pending" })
    .select("id, site_id, hostname, status, created_at")
    .single();

  if (error) throw error;
  return data as {
    id: string;
    site_id: string;
    hostname: string;
    status: DomainStatus;
    created_at: string;
  };
}

export async function setDomainStatus(domainId: string, status: DomainStatus) {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase
    .from("domains")
    .update({ status })
    .eq("id", domainId)
    .select("id, hostname, status, created_at")
    .single();

  if (error) throw error;
  return data as {
    id: string;
    hostname: string;
    status: DomainStatus;
    created_at: string;
  };
}

