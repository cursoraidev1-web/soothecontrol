"use client";

import Link from "next/link";
import { notFound } from "next/navigation";

const allowedKeys = ["home", "about", "contact"] as const;

export default function PageEditorPlaceholder({
  params,
}: {
  params: { siteId: string; key: string };
}) {
  const { siteId, key } = params;

  if (!allowedKeys.includes(key as (typeof allowedKeys)[number])) {
    notFound();
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Edit page: {key}</h1>
        <Link
          href={`/admin/sites/${siteId}`}
          className="rounded bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Back to overview
        </Link>
      </div>

      <p className="text-sm text-gray-700">
        Coming in Phase 4 (JSON editor + save draft + publish).
      </p>
    </div>
  );
}

