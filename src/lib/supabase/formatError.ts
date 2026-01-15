import type { PostgrestError } from "@supabase/supabase-js";

export function formatSupabaseError(error: unknown) {
  if (!error) return null;

  const e = error as Partial<PostgrestError> & { message?: string; code?: string };
  const message = e.message || "Something went wrong.";

  const looksLikeRls =
    message.toLowerCase().includes("row-level security") ||
    message.toLowerCase().includes("rls") ||
    message.toLowerCase().includes("permission denied") ||
    message.toLowerCase().includes("not authorized");

  if (looksLikeRls) {
    return `${message} (Not authorized — ensure your user is in the admin_users table.)`;
  }

  return message;
}

