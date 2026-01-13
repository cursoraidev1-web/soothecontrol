"use client";

import type { BackedBySection } from "@/lib/pageSchema";

export default function BackedByEditor({
  value,
  onChange,
}: {
  value: BackedBySection;
  onChange: (next: BackedBySection) => void;
}) {
  const logos = value.logos ?? [];

  function updateLogo(idx: number, patch: Partial<(typeof logos)[number]>) {
    const next = logos.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange({ ...value, logos: next });
  }

  function addLogo() {
    onChange({ ...value, logos: [...logos, { name: "", url: null }] });
  }

  function removeLogo(idx: number) {
    onChange({ ...value, logos: logos.filter((_, i) => i !== idx) });
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium text-gray-800">Title</span>
        <input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          placeholder="Backed by the best companies..."
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-700">
          Logos ({logos.length})
        </div>
        <button
          type="button"
          onClick={addLogo}
          className="rounded bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Add logo
        </button>
      </div>

      <div className="space-y-3">
        {logos.length === 0 ? (
          <div className="text-sm text-gray-600">No logos.</div>
        ) : (
          logos.map((it, idx) => (
            <div
              key={idx}
              className="rounded border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-gray-900">
                  Logo {idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeLogo(idx)}
                  className="text-sm font-medium text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Company Name
                  </span>
                  <input
                    value={it.name}
                    onChange={(e) => updateLogo(idx, { name: e.target.value })}
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    placeholder="Company Name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Logo URL (Optional)
                  </span>
                  <input
                    value={it.url || ""}
                    onChange={(e) =>
                      updateLogo(idx, { url: e.target.value || null })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    placeholder="https://..."
                    type="url"
                  />
                </label>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
