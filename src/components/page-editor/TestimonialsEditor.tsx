"use client";

import type { TestimonialsSection } from "@/lib/pageSchema";

export default function TestimonialsEditor({
  value,
  onChange,
}: {
  value: TestimonialsSection;
  onChange: (next: TestimonialsSection) => void;
}) {
  const items = value.items ?? [];

  function updateItem(idx: number, patch: Partial<(typeof items)[number]>) {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange({ ...value, items: next });
  }

  function addItem() {
    onChange({
      ...value,
      items: [...items, { name: "", role: "", quote: "", company: "" }],
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
          placeholder="What Our Clients Say"
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-700">
          Testimonials ({items.length})
        </div>
        <button
          type="button"
          onClick={addItem}
          className="rounded bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Add testimonial
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-gray-600">No testimonials.</div>
        ) : (
          items.map((it, idx) => (
            <div
              key={idx}
              className="rounded border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-gray-900">
                  Testimonial {idx + 1}
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
                    Quote
                  </span>
                  <textarea
                    value={it.quote}
                    onChange={(e) => updateItem(idx, { quote: e.target.value })}
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    placeholder="Customer testimonial quote..."
                    rows={3}
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">
                      Name
                    </span>
                    <input
                      value={it.name}
                      onChange={(e) => updateItem(idx, { name: e.target.value })}
                      className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                      placeholder="John Doe"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-800">
                      Role
                    </span>
                    <input
                      value={it.role}
                      onChange={(e) => updateItem(idx, { role: e.target.value })}
                      className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                      placeholder="CEO"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Company (Optional)
                  </span>
                  <input
                    value={it.company || ""}
                    onChange={(e) =>
                      updateItem(idx, { company: e.target.value || undefined })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    placeholder="Company Inc."
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
