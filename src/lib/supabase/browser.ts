import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  // Important: keep a single client instance so auth/session stays consistent
  // across renders and pages. Creating many clients can cause races where requests
  // are made before the session is fully loaded from storage.
  if (!globalThis.__soothecontrolsSupabase) {
    globalThis.__soothecontrolsSupabase = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "soothecontrols-auth",
      },
    });
  }
  return globalThis.__soothecontrolsSupabase;
}

declare global {
  // eslint-disable-next-line no-var
  var __soothecontrolsSupabase: SupabaseClient | undefined;
}

