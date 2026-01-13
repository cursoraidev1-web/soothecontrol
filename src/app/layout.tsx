import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import TailwindChecker from "@/components/debug/TailwindChecker";

export const metadata: Metadata = {
  title: "YourFree Admin",
  description: "Admin dashboard for YourFree sites",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <TailwindChecker />
        {children}
      </body>
    </html>
  );
}

