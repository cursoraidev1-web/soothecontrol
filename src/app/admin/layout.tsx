import type { ReactNode } from "react";

import LogoutButton from "@/components/LogoutButton";
import RequireAuth from "@/components/RequireAuth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <div className="min-h-screen">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="text-sm font-semibold tracking-tight">
              YourFree Admin
            </div>
            <LogoutButton />
          </div>
        </header>

        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </div>
    </RequireAuth>
  );
}

