"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseBrowser } from "@/lib/supabase/browser";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const supabase = supabaseBrowser();
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error || !data.session) {
          router.replace("/login");
          return;
        }
        setIsChecking(false);
      })
      .catch(() => {
        if (!isMounted) return;
        router.replace("/login");
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (isChecking) {
    return <div className="p-6 text-sm text-gray-600">Loading…</div>;
  }

  return <>{children}</>;
}

