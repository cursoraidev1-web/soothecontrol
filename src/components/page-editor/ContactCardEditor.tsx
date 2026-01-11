"use client";

import type { ContactCardSection } from "@/lib/pageSchema";

export default function ContactCardEditor({
  value,
  onChange,
}: {
  value: ContactCardSection;
  onChange: (next: ContactCardSection) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value.showForm}
          onChange={(e) => onChange({ ...value, showForm: e.target.checked })}
          className="h-4 w-4"
        />
        <span className="text-sm font-medium text-gray-800">Show contact form</span>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-800">Map link</span>
        <input
          value={value.mapLink}
          onChange={(e) => onChange({ ...value, mapLink: e.target.value })}
          placeholder="https://maps.google.com/?q=..."
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
        />
      </label>
    </div>
  );
}

