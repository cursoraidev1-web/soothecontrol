"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { supabaseBrowser } from "@/lib/supabase/browser";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onLogout() {
    setIsLoading(true);
    setError(null);

    const supabase = supabaseBrowser();
    const { error: signOutError } = await supabase.auth.signOut();

    setIsLoading(false);

    if (signOutError) {
      setError(signOutError.message);
      return;
    }

    router.replace("/login");
  }

  return (
    <div className="flex items-center gap-3">
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
      <button
        type="button"
        onClick={onLogout}
        disabled={isLoading}
        className="rounded bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 disabled:opacity-60"
      >
        {isLoading ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}

