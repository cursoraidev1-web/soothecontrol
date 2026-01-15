"use client";

import type { UseCasesSection } from "@/lib/pageSchema";

export default function UseCasesEditor({
  value,
  onChange,
}: {
  value: UseCasesSection;
  onChange: (next: UseCasesSection) => void;
}) {
  const items = value.items ?? [];

  function updateItem(idx: number, patch: Partial<(typeof items)[number]>) {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange({ ...value, items: next });
  }

  function addItem() {
    onChange({
      ...value,
      items: [
        ...items,
        { title: "", description: "", linkText: "", linkHref: "" },
      ],
    });
  }

  function removeItem(idx: number) {
    onChange({ ...value, items: items.filter((_, i) => i !== idx) });
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium text-gray-800">Title</span>
        <input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          placeholder="Use cases"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-800">Description</span>
        <textarea
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
          className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
          rows={3}
          placeholder="Description of use cases..."
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-700">
          Use Case Items ({items.length})
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

              <div className="mt-3 space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Title
                  </span>
                  <input
                    value={it.title}
                    onChange={(e) =>
                      updateItem(idx, { title: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Description
                  </span>
                  <textarea
                    value={it.description}
                    onChange={(e) =>
                      updateItem(idx, { description: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    rows={2}
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">
                      Link Text (Optional)
                    </span>
                    <input
                      value={it.linkText || ""}
                      onChange={(e) =>
                        updateItem(idx, { linkText: e.target.value || undefined })
                      }
                      className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                      placeholder="Learn more"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">
                      Link URL (Optional)
                    </span>
                    <input
                      value={it.linkHref || ""}
                      onChange={(e) =>
                        updateItem(idx, { linkHref: e.target.value || undefined })
                      }
                      className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                      placeholder="https://..."
                      type="url"
                    />
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
