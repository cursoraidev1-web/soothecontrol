"use client";

import type { ServicesSection } from "@/lib/pageSchema";

export default function ServicesEditor({
  value,
  onChange,
}: {
  value: ServicesSection;
  onChange: (next: ServicesSection) => void;
}) {
  const items = value.items ?? [];

  function updateItem(idx: number, patch: Partial<(typeof items)[number]>) {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange({ ...value, items: next });
  }

  function addItem() {
    onChange({ ...value, items: [...items, { title: "", desc: "" }] });
  }

  function removeItem(idx: number) {
    onChange({ ...value, items: items.filter((_, i) => i !== idx) });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-700">
          Service items ({items.length})
        </div>
        <button
          type="button"
          onClick={addItem}
          className="rounded bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Add item
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-gray-600">No items.</div>
        ) : (
          items.map((it, idx) => (
            <div
              key={idx}
              className="rounded border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-gray-900">
                  Item {idx + 1}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="text-sm font-medium text-red-700 hover:underline"
                >
                  Remove
                </button>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Title
                  </span>
                  <input
                    value={it.title}
                    onChange={(e) => updateItem(idx, { title: e.target.value })}
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Description
                  </span>
                  <input
                    value={it.desc}
                    onChange={(e) => updateItem(idx, { desc: e.target.value })}
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
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

