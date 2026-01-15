"use client";

import type { FAQSection } from "@/lib/pageSchema";

export default function FAQEditor({
  value,
  onChange,
}: {
  value: FAQSection;
  onChange: (next: FAQSection) => void;
}) {
  const items = value.items ?? [];

  function updateItem(idx: number, patch: Partial<(typeof items)[number]>) {
    const next = items.map((it, i) => (i === idx ? { ...it, ...patch } : it));
    onChange({ ...value, items: next });
  }

  function addItem() {
    onChange({
      ...value,
      items: [...items, { question: "", answer: "" }],
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
          placeholder="Frequently Asked Questions"
        />
      </label>

      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-gray-700">
          Questions ({items.length})
        </div>
        <button
          type="button"
          onClick={addItem}
          className="rounded bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Add question
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-gray-600">No questions.</div>
        ) : (
          items.map((it, idx) => (
            <div
              key={idx}
              className="rounded border border-gray-200 bg-gray-50 p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-gray-900">
                  Question {idx + 1}
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
                    Question
                  </span>
                  <input
                    value={it.question}
                    onChange={(e) =>
                      updateItem(idx, { question: e.target.value })
                    }
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    placeholder="What is your question?"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-800">
                    Answer
                  </span>
                  <textarea
                    value={it.answer}
                    onChange={(e) => updateItem(idx, { answer: e.target.value })}
                    className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                    placeholder="Answer to the question..."
                    rows={3}
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
