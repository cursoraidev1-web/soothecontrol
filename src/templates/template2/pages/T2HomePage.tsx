"use client";

import type { PageData } from "@/lib/pageSchema";
import T2Hero from "../components/T2Hero";
import T2Services from "../components/T2Services";
import T2Gallery from "../components/T2Gallery";
import { getPublicAssetUrl } from "@/lib/assets";

interface T2HomePageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    logo_asset_id: string | null;
    logo_path?: string | null;
  };
}

export default function T2HomePage({ pageData, profile }: T2HomePageProps) {
  const logoUrl = profile.logo_path
    ? getPublicAssetUrl(profile.logo_path)
    : null;

  const validSections = (pageData.sections || []).filter(
    (section): section is NonNullable<typeof section> => section != null && section.type != null
  );

  return (
    <main>
      {validSections.map((section, index) => {
        if (!section || !section.type) {
          return null;
        }
        switch (section.type) {
          case "hero":
            return (
                <div key={`${section.type}-${index}`}>
                    <T2Hero
                        section={section}
                        businessName={profile.business_name}
                        logoUrl={logoUrl}
                        isHomePage={true}
                    />
                    
                    {/* Brand Logos / Trust Strip */}
                    <div className="border-y border-slate-100 bg-white py-10">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <p className="text-center text-sm font-semibold text-slate-500 mb-6">TRUSTED BY INNOVATIVE COMPANIES</p>
                            <div className="flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-8 w-24 bg-slate-300 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
          case "services":
            return <T2Services key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <T2Gallery key={`${section.type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}

      {/* Features / Why Choose Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32 z-0"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Why Choose Us</span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        We deliver results that matter
                    </h2>
                    <p className="mt-6 text-lg text-slate-600">
                        Our proven methodology ensures that every project we undertake is executed with precision and excellence.
                    </p>
                    <ul className="mt-8 space-y-4">
                        {[
                            "Expert team with years of experience",
                            "Tailored solutions for your specific needs",
                            "Transparent communication every step of the way",
                            "Ongoing support and maintenance"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                                </div>
                                <span className="text-slate-700 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1574&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
                        <h3 className="text-5xl font-extrabold mb-2 relative z-10">98%</h3>
                        <p className="text-slate-300 mb-8 relative z-10">Client Satisfaction Rate</p>
                        <div className="w-full h-px bg-white/20 mb-8 relative z-10"></div>
                        <h3 className="text-5xl font-extrabold mb-2 relative z-10">24/7</h3>
                        <p className="text-slate-300 relative z-10">Support Availability</p>
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500 rounded-full blur-3xl opacity-20"></div>
                </div>
            </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
         <div className="absolute inset-0">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-900"></div>
         </div>
         <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
             <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
                 Ready to get started?
             </h2>
             <p className="text-xl text-slate-300 mb-10">
                 Join us today and experience the difference of working with a team that truly cares about your success.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <a href="/contact" className="rounded-full bg-teal-500 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-teal-400 hover:shadow-teal-500/25 transition-all hover:-translate-y-1">
                     Start Your Project
                 </a>
                 <a href="/about" className="rounded-full bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all">
                     Read Our Story
                 </a>
             </div>
         </div>
      </section>
    </main>
  );
}
