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

/**
 * Ensures a valid session exists and is properly attached to the client before making database operations.
 * This prevents RLS errors caused by requests made before the session is loaded or attached.
 * 
 * @returns The session if valid, throws an error if not
 */
export async function ensureSession() {
  const supabase = supabaseBrowser();
  
  // Use getUser() instead of getSession() as it's more reliable and ensures the client is initialized
  // getUser() also validates the session server-side
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    throw new Error(`Authentication error: ${userError.message}. Please log out and log back in.`);
  }
  
  if (!user) {
    throw new Error("No authenticated user. Please log in to continue.");
  }
  
  // Now get the session to ensure it's attached to the client
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  
  if (sessionError) {
    throw new Error(`Session error: ${sessionError.message}. Please log out and log back in.`);
  }
  
  if (!session) {
    throw new Error("No active session. Please log in to continue.");
  }
  
  // Check if session is expired or about to expire (within 5 minutes)
  const now = Date.now();
  const expiresAt = session.expires_at ? session.expires_at * 1000 : 0;
  const fiveMinutesFromNow = now + 5 * 60 * 1000;
  
  if (expiresAt < fiveMinutesFromNow) {
    // Try to refresh the session proactively
    const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession();
    
    if (refreshError) {
      // If refresh fails but session isn't expired yet, continue with current session
      if (expiresAt > now) {
        return session;
      }
      throw new Error("Session expired and could not be refreshed. Please log out and log back in.");
    }
    
    if (!refreshedSession) {
      throw new Error("Session expired. Please log out and log back in.");
    }
    
    return refreshedSession;
  }
  
  // Verify the session has an access token
  if (!session.access_token) {
    throw new Error("Session missing access token. Please log out and log back in.");
  }
  
  return session;
}

/**
 * Gets the current user ID, ensuring session is valid first.
 * 
 * @returns The user ID if valid, throws an error if not
 */
export async function getCurrentUserId(): Promise<string> {
  const session = await ensureSession();
  
  if (!session.user?.id) {
    throw new Error("User ID not found in session. Please log out and log back in.");
  }
  
  return session.user.id;
}

/**
 * Ensures the Supabase client is fully initialized with a valid session.
 * This function waits for the client to be ready and verifies the session is attached.
 * 
 * @returns The Supabase client instance with a verified session
 */
export async function getAuthenticatedClient(): Promise<SupabaseClient> {
  const supabase = supabaseBrowser();
  
  // First, ensure we have a valid session
  const session = await ensureSession();
  
  // Verify the session is actually attached to the client by checking the internal state
  // We do this by making a lightweight auth call that requires the session
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("Failed to verify authentication. Please log out and log back in.");
  }
  
  // Ensure the user ID matches the session user ID
  if (user.id !== session.user?.id) {
    throw new Error("Session user mismatch. Please log out and log back in.");
  }
  
  // Small delay to ensure the client has fully processed the session
  // This helps with race conditions where the session exists but isn't fully attached yet
  await new Promise(resolve => setTimeout(resolve, 50));
  
  return supabase;
}

/**
 * Diagnostic function to check authentication status.
 * Useful for debugging RLS issues.
 */
export async function checkAuthStatus() {
  const supabase = supabaseBrowser();
  
  const sessionResult = await supabase.auth.getSession();
  const userResult = await supabase.auth.getUser();
  
  return {
    hasSession: !!sessionResult.data.session,
    hasUser: !!userResult.data.user,
    userId: userResult.data.user?.id || null,
    sessionExpiresAt: sessionResult.data.session?.expires_at 
      ? new Date(sessionResult.data.session.expires_at * 1000).toISOString()
      : null,
    hasAccessToken: !!sessionResult.data.session?.access_token,
    errors: {
      session: sessionResult.error?.message || null,
      user: userResult.error?.message || null,
    },
  };
}

declare global {
  // eslint-disable-next-line no-var
  var __soothecontrolsSupabase: SupabaseClient | undefined;
}

