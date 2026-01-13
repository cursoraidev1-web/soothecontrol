"use client";

import type { PageData } from "@/lib/pageSchema";
import T2Hero from "../components/T2Hero";
import { getPublicAssetUrl } from "@/lib/assets";

interface T2ContactPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
    logo_asset_id: string | null;
    logo_path?: string | null;
  };
}

export default function T2ContactPage({ pageData, profile }: T2ContactPageProps) {
  const logoUrl = profile.logo_path
    ? getPublicAssetUrl(profile.logo_path)
    : null;

  const validSections = (pageData.sections || []).filter(
    (section): section is NonNullable<typeof section> => section != null && section.type != null
  );

  return (
    <main>
      {/* Custom Contact Banner */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-slate-900/40 to-slate-900"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl mb-6">Get in Touch</h1>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Have questions? We're here to help. Reach out to our team for support, inquiries, or just to say hello.
              </p>
          </div>
      </section>

      {/* Map Section */}
      {profile.address && (
        <div className="w-full h-96 bg-slate-100 relative z-0">
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(profile.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="filter grayscale contrast-125 opacity-90"
            ></iframe>
        </div>
      )}

      {/* Contact Form Section */}
      <section className="py-24 sm:py-32 bg-white relative -mt-20 z-10 rounded-t-[3rem]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Info Side */}
              <div className="bg-slate-50 p-10 lg:p-12 border-r border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h2>
                <div className="space-y-8">
                  {profile.address && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-teal-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Address</h3>
                        <p className="mt-1 text-slate-600">{profile.address}</p>
                      </div>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-teal-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Phone</h3>
                        <a href={`tel:${profile.phone}`} className="mt-1 block text-slate-600 hover:text-teal-600 transition-colors">
                          {profile.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-teal-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Email</h3>
                        <a href={`mailto:${profile.email}`} className="mt-1 block text-slate-600 hover:text-teal-600 transition-colors">
                          {profile.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Side */}
              <div className="p-10 lg:p-12">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-teal-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-teal-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-teal-500 focus:bg-white focus:ring-teal-500 transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-900 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-teal-600 hover:shadow-xl hover:-translate-y-1"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
