"use client";

import type { BackedBySection as BackedBySectionType } from "@/lib/pageSchema";

interface T2BackedByProps {
  section: BackedBySectionType;
}

export default function T2BackedBy({ section }: T2BackedByProps) {
  const title =
    section.title || "Trusted by teams who care about quality";

  const logos =
    section.logos && section.logos.length > 0
      ? section.logos
      : [
          { name: "Northwind", url: null },
          { name: "Acme Co.", url: null },
          { name: "Globex", url: null },
          { name: "Umbrella", url: null },
          { name: "Initech", url: null },
          { name: "Soylent", url: null },
        ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
            Social proof
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-gray-900 sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="group flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-5 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {logo.url ? (
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-8 w-auto opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-700">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

