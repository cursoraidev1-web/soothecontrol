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
      {validSections.map((section, index) => {
        if (!section || !section.type) {
          return null;
        }
        switch (section.type) {
          case "hero":
            return (
              <T2Hero
                key={`${section.type}-${index}`}
                section={section}
                businessName={profile.business_name}
                logoUrl={logoUrl}
                isHomePage={false}
              />
            );
          default:
            return null;
        }
      })}
      
      {/* Contact Form Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  {profile.address && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">{profile.address}</p>
                    </div>
                  )}
                  {profile.phone && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Phone</h3>
                      <a href={`tel:${profile.phone}`} className="text-gray-600 hover:text-gray-900">
                        {profile.phone}
                      </a>
                    </div>
                  )}
                  {profile.email && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Email</h3>
                      <a href={`mailto:${profile.email}`} className="text-gray-600 hover:text-gray-900">
                        {profile.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-gray-900 focus:ring-gray-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl"
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
