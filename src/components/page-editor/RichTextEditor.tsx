"use client";

import type { RichTextSection } from "@/lib/pageSchema";

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: RichTextSection;
  onChange: (next: RichTextSection) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium text-gray-800">Title</span>
        <input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-800">Body</span>
        <textarea
          value={value.body}
          onChange={(e) => onChange({ ...value, body: e.target.value })}
          rows={6}
          className="mt-1 w-full resize-y rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
        />
      </label>
    </div>
  );
}

