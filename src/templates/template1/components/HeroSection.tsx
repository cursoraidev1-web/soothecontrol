"use client";

import type { HeroSection as HeroSectionType } from "@/lib/pageSchema";
import {
  getLoremHeadline,
  getLoremParagraph,
} from "@/lib/loremIpsum";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  section: HeroSectionType;
}

export default function HeroSection({ section }: HeroSectionProps) {
  const headline = section.headline || getLoremHeadline();
  const subtext = section.subtext || getLoremParagraph();
  const ctaText = section.ctaText || "Get Started";
  const ctaHref = section.ctaHref || "#";
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="t1-hero">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className={`t1-hero-content ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}>
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-semibold tracking-wide uppercase">
          New Version 2.0 Available
        </div>
        
        <h1 className="t1-hero-headline">
          {headline}
        </h1>
        
        <p className="t1-hero-subtext">
          {subtext}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {ctaText && ctaHref && (
            <a href={ctaHref} className="t1-hero-cta group">
              {ctaText}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 group-hover:translate-x-1 transition-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
          
          <a href="#demo" className="px-8 py-4 rounded-full text-slate-600 font-semibold hover:text-slate-900 transition-colors flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Demo
          </a>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500 mb-4">Trusted by industry leaders</p>
          <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple placeholder logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
