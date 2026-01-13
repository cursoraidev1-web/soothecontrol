"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { getDefaultTrustHighlights } from "../utils";

interface T2HeroProps {
  section: HeroSectionType;
  businessName: string;
  logoUrl: string | null;
  isHomePage?: boolean;
}

export default function T2Hero({
  section,
  businessName,
  logoUrl,
  isHomePage = false,
}: T2HeroProps) {
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get Started";
  const ctaHref = section.ctaHref || "#";
  const trustHighlights = getDefaultTrustHighlights();

  if (isHomePage) {
    return (
      <section className="relative overflow-hidden bg-white">
        {/* Organic Background Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full bg-teal-50 blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-60 pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="z-10">
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt={businessName}
                  className="h-12 w-auto mb-8"
                />
              )}
              
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-teal-700 bg-teal-50 border border-teal-100 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
                Now available globally
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl mb-6 leading-tight">
                {headline}
              </h1>
              
              <p className="mt-6 text-xl leading-8 text-slate-600 max-w-lg">
                {subtext}
              </p>
              
              <div className="mt-10 flex items-center gap-4">
                <a
                  href={ctaHref}
                  className="rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all transform hover:-translate-y-1"
                >
                  {ctaText}
                </a>
                <a
                  href="#contact"
                  className="rounded-full px-8 py-4 text-base font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all"
                >
                  Contact Sales
                </a>
              </div>
              
              {/* Trust Highlights */}
              <div className="mt-16 pt-8 border-t border-slate-100">
                <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Trusted by modern teams</p>
                <div className="flex flex-wrap gap-8">
                  {trustHighlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Modern Floating Card Grid */}
            <div className="relative lg:h-[600px] flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-blue-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />
               
               <div className="grid grid-cols-2 gap-6 w-full max-w-lg relative z-10 rotate-[-5deg] hover:rotate-0 transition-transform duration-700 ease-out">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`
                        p-6 rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50
                        transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]
                        ${i % 2 === 0 ? 'translate-y-12' : ''}
                      `}
                    >
                      <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center ${
                        i === 1 ? 'bg-blue-50 text-blue-600' : 
                        i === 2 ? 'bg-teal-50 text-teal-600' : 
                        i === 3 ? 'bg-purple-50 text-purple-600' : 
                        'bg-orange-50 text-orange-600'
                      }`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">Benefit {i}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">Experience the difference with our premium features.</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // About/Contact page hero (smaller)
  return (
    <section className="bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-6 block">
            {section.headline ? "" : "About Our Company"}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
            {headline || `About ${businessName}`}
          </h1>
          {subtext && (
            <p className="mt-6 text-xl text-slate-600 leading-relaxed">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
