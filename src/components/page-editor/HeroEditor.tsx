"use client";

import type { HeroSection } from "@/lib/pageSchema";

export default function HeroEditor({
  value,
  onChange,
}: {
  value: HeroSection;
  onChange: (next: HeroSection) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-800">Headline</span>
          <input
            value={value.headline}
            onChange={(e) => onChange({ ...value, headline: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">Subtext</span>
          <input
            value={value.subtext}
            onChange={(e) => onChange({ ...value, subtext: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-800">CTA text</span>
          <input
            value={value.ctaText}
            onChange={(e) => onChange({ ...value, ctaText: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-800">CTA href</span>
          <input
            value={value.ctaHref}
            onChange={(e) => onChange({ ...value, ctaHref: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
            placeholder="/contact"
          />
        </label>
      </div>
    </div>
  );
}

