"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { getDefaultTrustHighlights } from "../utils";

interface T2HeroProps {
  section: HeroSectionType;
  businessName: string;
  logoUrl: string | null;
  isHomePage?: boolean;
  pageLabel?: string;
}

export default function T2Hero({
  section,
  businessName,
  logoUrl,
  isHomePage = false,
  pageLabel,
}: T2HeroProps) {
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get Started";
  const ctaHref = section.ctaHref || "#";
  const trustHighlights = getDefaultTrustHighlights();

  if (isHomePage) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={businessName}
                  className="h-12 w-auto mb-6"
                />
              )}
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-6xl">
                {headline}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
                {subtext}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <a
                  href={ctaHref}
                  className="rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl"
                >
                  {ctaText}
                </a>
                <a
                  href="#contact"
                  className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50"
                >
                  Contact Us
                </a>
              </div>
              {/* Trust Highlights */}
              <div className="mt-12 flex flex-wrap gap-6">
                {trustHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Feature Card Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:-translate-y-1 border border-gray-100"
                >
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 mb-4 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Feature {i}
                  </h3>
                  <p className="text-xs text-gray-600">
                    Premium service quality
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // About/Contact page hero (smaller)
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 border-b border-gray-200">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative text-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 block">
            {pageLabel || ""}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {headline || `About ${businessName}`}
          </h1>
          {subtext && (
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
